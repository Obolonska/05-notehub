import css from "./SearchBox.module.css";
// import { toast } from "react-hot-toast";
// import type { DebouncedState } from "use-debounce";

interface SearchBoxProps {
  value: string;
  onSearch: (newSearchQuery: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      defaultValue={value}
      onChange={handleChange}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
