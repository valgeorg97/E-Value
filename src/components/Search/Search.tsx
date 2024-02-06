import React, { ChangeEvent } from 'react';
import './Search.css';
import {SearchProps} from '../../interfaces/index';

/**
 * Search component provides an input field for users to search products by name.
 * It takes a callback function `onSearchChange` as a prop, which is called with the input's
 * current value whenever the user types, allowing the parent component to filter products
 * based on the search query.
 *
 */


const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        id="search"
        placeholder="Search products..."
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;

