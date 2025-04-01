import { useEffect, useRef, useState } from 'react';
import { useSearchBox, Hits } from 'react-instantsearch';
import { SearchIcon, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { it } from 'node:test';

interface ProgramSearchDropdownProps {
  onSelect: (program: { program_id: string, program_name: string, university_id: string, university_name: string }) => void;
  placeholder?: string;
}

export function ProgramSearchDropdown({ onSelect, placeholder }: ProgramSearchDropdownProps) {
  const { query, refine, clear } = useSearchBox();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  // Reset input value when the query is cleared externally
  useEffect(() => {
    if (query === '' && inputRef.current?.value) {
      inputRef.current.value = '';
    }
  }, [query]);

//   Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
//         setIsOpen(false);
//         console.debug('Clicked outside, closing dropdown');
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    refine(value);
    setIsOpen(value.length > 0);
  };

  // Handle program selection
  const handleSelectProgram = (hit: any) => {
    console.debug('Selected program:', hit.objectId);
    onSelect({
      program_id: hit.objectID,
      program_name: hit.program_name,
      university_id: hit.university_id,
      university_name: hit.university_name
    });
    
    // Set the input value to show the selected program
    if (inputRef.current) {
      inputRef.current.value = `${hit.program_name} - ${hit.university_name}`;
    }
    
    setIsOpen(false);
    clear();
  };

  // Clear the search
  const handleClear = () => {
    clear();
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
    setIsOpen(false);
  };

  return (
    <div className="space-y-2 relative">
      <Label htmlFor="program_search">Program</Label>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          ref={inputRef}
          id="program_search"
          type="text"
          placeholder={placeholder}
          defaultValue={query}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          className="pl-10 py-2 w-full bg-white border-gray-200 focus-visible:ring-purple-400"
        />
        {isOpen && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Hits hitComponent={({ hit }) => (
            <ProgramHitComponent hit={hit} handleSelectProgram={handleSelectProgram} />
          )} />
        </div>
      )}
    </div>
  );
}

function ProgramHitComponent({ hit, handleSelectProgram } : { hit: any, handleSelectProgram: (hit: any) => void }) {
    return (
        <div
            key={hit.objectID}
            className="px-4 py-2 text-gray-900 hover:bg-purple-100 cursor-pointer"
            onClick={() => handleSelectProgram(hit)}
        >
            <div className="font-medium">{hit.program_name}</div>
            <div className="text-sm text-gray-500">{hit.university_name}</div>
        </div>
    )
}