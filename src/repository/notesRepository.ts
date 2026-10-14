import Note from "@/db/models/Notes";
import { database } from "../db";

const notesCollection = database.get<Note>("notes");

export async function createNote(title: string, body: string) {
  return database.write(async () => {
    return notesCollection.create((note) => {
      note.title = title.trim();
      note.body = body;
      note.updatedAt = Date.now();
      note.deletedAt = null;
    });
  });
}

export async function updateNote(id: string, title: string, body: string) {
  return database.write(async () => {
    const note = await notesCollection.find(id);

    return note.update((record) => {
      record.title = title.trim();
      record.body = body;
      record.updatedAt = Date.now();
    });
  });
}
export async function getNotebyId(id: string) {
  const note = await notesCollection.find(id);
  return note;
}

export async function deleteNote(id: string) {
  return database.write(async () => {
    const note = await notesCollection.find(id);

    // Keep a tombstone so a future sync can propagate deletion.
    await note.update((record) => {
      record.deletedAt = Date.now();
      record.updatedAt = Date.now();
    });
  });
}
