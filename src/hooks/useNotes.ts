import { Q } from "@nozbe/watermelondb";
import { useEffect, useState } from "react";

import Note from "@/db/models/Notes";
import { database } from "../db";

/** Reactive note list: re-renders on every local write and every sync pull. */
export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // observeWithColumns (not plain observe): plain observe only fires when
    // rows are added/removed, so title/body edits would look stale until
    // restart. Watching these columns makes updates re-render instantly.
    const subscription = database
      .get<Note>("notes")
      .query(Q.where("deleted_at", Q.eq(null)), Q.sortBy("updated_at", Q.desc))
      .observeWithColumns(["title", "body", "updated_at"])
      .subscribe({
        next: (records) => {
          setNotes(records);
          setLoading(false);
          setError(null);
        },
        error: (err: unknown) => {
          setError(err instanceof Error ? err.message : "Unable to load notes");
          setLoading(false);
        },
      });

    return () => subscription.unsubscribe();
  }, []);

  return { notes, loading, error };
}
