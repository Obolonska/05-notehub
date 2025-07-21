import { useState } from "react";
import css from "./App.module.css";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import ReactPaginate from "react-paginate";
// import { useDebouncedCallback } from "use-debounce";
import SearchBox from "../SearchBox/SearchBox";
import { Toaster } from "react-hot-toast";
import { getNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import { useQuery } from "@tanstack/react-query";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  // const [page, setPage] = useState(1);
  const updateSearchQuery = setSearchQuery;

  const { data, isLoading } = useQuery({
    queryKey: ["notes", searchQuery],
    queryFn: () => getNotes(searchQuery),
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={updateSearchQuery} />
        {/* Пагінація */}
        <button className={css.button}>Create note +</button>
        {isLoading && <strong className={css.loading}>Loading tasks...</strong>}
        {data && !isLoading && <NoteList notes={data.notes} />}
      </header>
      <Toaster />
    </div>
  );
}
