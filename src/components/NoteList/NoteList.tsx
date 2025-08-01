import { deleteNote } from "../../services/noteService";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface NoteListProps {
  notes: Note[];
}
export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              type="button"
              className={css.button}
              onClick={() => deleteNoteMutation.mutate(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
