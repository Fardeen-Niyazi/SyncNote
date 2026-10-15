import {
  synchronize,
  type SyncDatabaseChangeSet,
  type SyncPullArgs,
  type SyncPullResult,
  type SyncPushArgs,
} from "@nozbe/watermelondb/sync";
import { io, type Socket } from "socket.io-client";
import { database } from "../db";

export const SYNC_URL =
  process.env.EXPO_PUBLIC_SYNC_URL ?? "http://localhost:3000";

export type SyncStatus = "synced" | "syncing" | "offline";

// ---- status (single source of truth, tiny pub/sub) ----
let status: SyncStatus = "offline";
const listeners = new Set<(s: SyncStatus) => void>();

function setStatus(next: SyncStatus) {
  status = next;
  listeners.forEach((notify) => notify(next));
}

export const getStatus = () => status;

export function subscribeStatus(notify: (s: SyncStatus) => void) {
  listeners.add(notify);
  return () => {
    listeners.delete(notify);
  };
}

// ---- HTTP half: WatermelonDB diffs go over POST, socket is ping-only ----
async function pullChanges({
  lastPulledAt,
}: SyncPullArgs): Promise<SyncPullResult> {
  const res = await fetch(`${SYNC_URL}/sync/pull`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lastPulledAt: lastPulledAt ?? 0 }),
  });
  if (!res.ok) throw new Error(`Pull failed: HTTP ${res.status}`);
  const { changes, timestamp } = (await res.json()) as {
    changes: SyncDatabaseChangeSet;
    timestamp: number;
  };
  return { changes, timestamp };
}

async function pushChanges({ changes }: SyncPushArgs, socketId?: string) {
  const notes = (
    changes as unknown as Record<
      string,
      { created: unknown[]; updated: unknown[]; deleted: string[] } | undefined
    >
  ).notes ?? { created: [], updated: [], deleted: [] };
  if (
    notes.created.length === 0 &&
    notes.updated.length === 0 &&
    notes.deleted.length === 0
  ) {
    return;
  }
  console.log("Pushing changes:", changes);
  const res = await fetch(`${SYNC_URL}/sync/push`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ changes, socketId }),
  });
  if (!res.ok) throw new Error(`Push failed: HTTP ${res.status}`);
}

// ---- runner: never overlap synchronize(), queue one retry ----
let syncing = false;
let queued = false;

export async function requestSync(): Promise<void> {
  if (syncing) {
    queued = true;
    return;
  }
  syncing = true;
  setStatus("syncing");
  try {
    await synchronize({
      database,
      pullChanges,
      pushChanges: (args) => pushChanges(args, socket?.id),
    });
    setStatus("synced");
  } catch {
    setStatus("offline");
  } finally {
    syncing = false;
    if (queued) {
      queued = false;
      void requestSync();
    }
  }
}

// ---- socket: one connection per app launch, ping-only ----
let socket: Socket | null = null;
let started = false;

export function initLiveSync() {
  if (started) return;
  started = true;
  void requestSync(); // converge on launch
  socket = io(SYNC_URL, { transports: ["websocket", "polling"] });
  socket.on("notes-changed", () => void requestSync());
  socket.on("connect", () => void requestSync());
  socket.on("disconnect", () => setStatus("offline"));
  socket.on("connect_error", () => setStatus("offline"));
}
