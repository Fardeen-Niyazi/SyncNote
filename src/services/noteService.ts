import { Note } from '../types/note';

class NoteService {
  private notes: Note[] = [
    {
      id: '1',
      title: 'Welcome to SyncNote',
      body: 'This is your first note. You can create, edit, and delete notes here. Everything is synced across your devices.',
      updatedAt: Date.now(),
    },
    {
      id: '2',
      title: 'Project Ideas',
      body: '1. Build a mobile app with Expo\n2. Integrate WatermelonDB\n3. Add real-time sync with Socket.IO',
      updatedAt: Date.now() - 10000,
    },
  ];

  async getNotes(searchQuery?: string): Promise<Note[]> {
    if (!searchQuery) {
      return [...this.notes].sort((a, b) => b.updatedAt - a.updatedAt);
    }

    const query = searchQuery.toLowerCase();
    return this.notes
      .filter(note =>
        note.title.toLowerCase().includes(query) ||
        note.body.toLowerCase().includes(query)
      )
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }

  async getNoteById(id: string): Promise<Note | undefined> {
    // Ensure id is treated as a string for comparison
    const normalizedId = String(id);
    return this.notes.find(note => note.id === normalizedId);
  }

  async saveNote(noteData: Partial<Note> & { id?: string }): Promise<Note> {
    if (noteData.id) {
      // Ensure id is treated as a string for comparison
      const normalizedId = String(noteData.id);
      const index = this.notes.findIndex(n => n.id === normalizedId);
      if (index !== -1) {
        this.notes[index] = { ...this.notes[index], ...noteData, updatedAt: Date.now() };
        return this.notes[index];
      }
    }

    const newNote: Note = {
      id: Math.random().toString(36).substring(2, 9),
      title: noteData.title || '',
      body: noteData.body || '',
      updatedAt: Date.now(),
    };
    this.notes.push(newNote);
    return newNote;
  }

  async deleteNote(id: string): Promise<void> {
    // Ensure id is treated as a string for comparison
    const normalizedId = String(id);
    this.notes = this.notes.filter(note => note.id !== normalizedId);
  }
}

export const noteService = new NoteService();
