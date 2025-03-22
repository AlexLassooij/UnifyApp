import { useEffect, useRef } from 'react';
import { useSearchBox } from 'react-instantsearch';
import { SearchIcon, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface CustomSearchBoxProps {
  placeholder: string;
}

export function CustomSearchBox({ placeholder }: CustomSearchBoxProps) {
  const { query, refine, clear } = useSearchBox();
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset input value when the query is cleared externally
  useEffect(() => {
    if (query === '' && inputRef.current?.value) {
      inputRef.current.value = '';
    }
  }, [query]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    refine(e.target.value);
  };

  // Clear the search
  const handleClear = () => {
    clear();
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative mb-6">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        defaultValue={query}
        onChange={handleChange}
        className="pl-12 py-6 h-14 text-lg w-full bg-white border-gray-200 focus-visible:ring-purple-400"
      />
      {query && (
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <XCircle className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}