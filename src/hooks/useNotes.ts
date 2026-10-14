import { Q } from "@nozbe/watermelondb";
import { useEffect, useState } from "react";

import Note from "@/db/models/Notes";
import { database } from "../db";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const subscription = database
      .get<Note>("notes")
      .query(Q.where("deleted_at", null), Q.sortBy("updated_at", Q.desc))
      .observe()
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
