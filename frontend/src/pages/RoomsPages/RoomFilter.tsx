import { useState, ChangeEvent } from 'react';
import { ExactRoom } from 'pages/RoomsPages/types';

export const RoomFilter = ({
  onFilterSuccess
}: {
  onFilterSuccess: (data: ExactRoom[]) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const searchPhrase = async (term: string) => {
    const response = await fetch(`/api/rooms?search=${term}`);
    const data = await response.json();
    onFilterSuccess(data);
  };

  return (
    <div>
      <div className="flex justify-center">
        <input
          type="search"
          className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Search Rooms"
          aria-label="Search"
          aria-describedby="button-addon2"
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn inline-block px-2 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
          onClick={() => searchPhrase(searchTerm)}
          type="button"
          id="button-addon3">
          Search
        </button>
      </div>
    </div>
  );
};
