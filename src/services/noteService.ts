import axios from "axios";
import type { Note } from "../types/note";

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api";

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const getNotes = async (search?: string): Promise<NotesResponse> => {
  const params: Record<string, string> = {};

  if (search && search.trim()) {
    params.search = search;
  }

  const response = await axios.get<NotesResponse>(`${BASE_URL}/notes`, {
    headers: {
      Authorization: `Bearer ${myKey}`,
    },
    params,
  });

  return response.data;
};
