import Note from "@/db/models/Notes";
import { requestSync } from "../services/sync";
import { database } from "../db";

const notesCollection = database.get<Note>("notes");

/** Every mutation writes to SQLite first (instant UI), then queues a push. */
export async function createNote(title: string, body: string) {
  const note = await database.write(() =>
    notesCollection.create((record) => {
      record.title = title.trim();
      record.body = body;
      record.updatedAt = Date.now();
      record.deletedAt = null;
    }),
  );
  void requestSync();
  return note;
}

export async function updateNote(id: string, title: string, body: string) {
  // update() must run inside database.write — it is not a writer itself.
  const result = await database.write(async () => {
    const note = await notesCollection.find(id);
    return note.update((record) => {
      record.title = title.trim();
      record.body = body;
      record.updatedAt = Date.now();
    });
  });
  void requestSync();
  return result;
}

export async function getNotebyId(id: string) {
  return notesCollection.find(id);
}

export async function deleteNote(id: string) {
  // Tombstone: keep the row with deletedAt set so sync can propagate it.
  const result = await database.write(async () => {
    const note = await notesCollection.find(id);
    return note.update((record) => {
      record.deletedAt = Date.now();
      record.updatedAt = Date.now();
    });
  });
  void requestSync();
  return result;
}
