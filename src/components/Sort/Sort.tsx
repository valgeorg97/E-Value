import React, { ChangeEvent } from 'react';
import './Sort.css';
import { SortProps } from '../../interfaces/index';

/**
 * Sort component provides a dropdown menu for users to sort products based on different criteria such as price or rating.
 * It accepts a callback function `onSortChange` as a prop, which is invoked with the selected sorting option whenever the
 * user selects a different sort method from the dropdown. This allows the parent component to reorder the displayed products
 * according to the selected sorting criteria.
 *
 */


const Sort: React.FC<SortProps> = ({ onSortChange }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="sort-container">
      <select id="sort" onChange={handleChange} defaultValue="default">
        <option value="default" hidden>
          Sort
        </option>
        <option value="no-sort">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="ratingDesc">Rating: High to Low</option>
      </select>
    </div>
  );
};

export default Sort;
