import axios from "axios";
import type { Note, NewNote } from "../types/note";

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${myKey}`;

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const getNotes = async (
  search: string,
  page: number
): Promise<NotesResponse> => {
  const response = await axios.get<NotesResponse>(`/notes`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
    params: {
      ...(search !== "" ? { search } : {}),
      page,
    },
  });

  return response.data;
};

export const deleteNote = async (noteId: number): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

export const addNote = async (noteData: NewNote): Promise<Note> => {
  const res = await axios.post<Note>(`/notes/`, noteData);
  return res.data;
};
