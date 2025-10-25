import React, { useState } from 'react';
import { Cafe } from '../../../types';
import { debounce } from '../../../utils/helpers';

interface SearchAndFiltersProps {
  cafes: Cafe[];
  onFilterChange: (filteredCafes: Cafe[]) => void;
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({ cafes, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const handleSearch = debounce((query: string) => {
    setSearchQuery(query);
    applyFilters(query, activeFilter);
  }, 300);

  const applyFilters = (query: string, filter: string) => {
    let filtered = [...cafes];

    // Apply search filter
    if (query) {
      filtered = filtered.filter(cafe => 
        cafe.cafe_name.toLowerCase().includes(query.toLowerCase()) ||
        cafe.address.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply category filter
    switch (filter) {
      case 'top':
        filtered = filtered.filter(cafe => cafe.nomination_count > 0)
                          .sort((a, b) => b.nomination_count - a.nomination_count);
        break;
      case 'new':
        filtered = [...filtered].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      default:
        // 'all' - no additional filtering
        break;
    }

    onFilterChange(filtered);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    applyFilters(searchQuery, filter);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            className="form-input"
            placeholder="Search cafés by name or address..."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleFilterChange('all')}
            className={`btn-cafe-outline ${activeFilter === 'all' ? 'active' : ''}`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange('top')}
            className={`btn-cafe-outline ${activeFilter === 'top' ? 'active' : ''}`}
          >
            Top Rated
          </button>
          <button
            onClick={() => handleFilterChange('new')}
            className={`btn-cafe-outline ${activeFilter === 'new' ? 'active' : ''}`}
          >
            Recently Added
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilters;
