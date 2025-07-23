import { useState } from "react";
import css from "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "../SearchBox/SearchBox";
import { getNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import NoteForm from "../NoteForm/NoteForm";
import Modal from "../Modal/Modal";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import EmptyState from "../EmptyState/EmptyState";

const useToggle = (): [boolean, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return [isOpen, open, close];
};

export default function App() {
  const [isModalOpen, openModal, closeModal] = useToggle();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const updateSearchQuery = useDebouncedCallback((newQuery: string) => {
    setSearchQuery(newQuery);
    setPage(1);
  }, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", searchQuery, page],
    queryFn: () => getNotes(searchQuery, page),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={updateSearchQuery} />
        {totalPages > 1 && (
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <LoadingIndicator />}
      {isError && <ErrorMessage message="Something went wrong" />}
      {data && data.notes.length === 0 && (
        <EmptyState message="No notes found." />
      )}

      {data && !isLoading && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSuccess={closeModal} />
        </Modal>
      )}
    </div>
  );
}
