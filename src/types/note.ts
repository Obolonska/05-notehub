export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tag: NoteTag;
}

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}
