
import { useState } from 'react';
import { CuisineFilter as CuisineFilterType } from '@/types';

interface CuisineFilterProps {
  filters: CuisineFilterType[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

const CuisineFilter = ({ filters, activeFilter, onFilterChange }: CuisineFilterProps) => {
  const [showAll, setShowAll] = useState(false);

  const displayedFilters = showAll ? filters : filters.slice(0, 5);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Filter by Cuisine</h3>
      <div className="flex flex-wrap gap-2">
        {displayedFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeFilter === filter.id
                ? 'bg-restaurant-orange text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.name}
          </button>
        ))}
        {filters.length > 5 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 rounded-full text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            {showAll ? 'Show Less' : 'More...'}
          </button>
        )}
      </div>
    </div>
  );
};

export default CuisineFilter;
