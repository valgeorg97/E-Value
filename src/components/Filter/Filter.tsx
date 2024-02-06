import React, { ChangeEvent } from 'react';
import {FilterProps} from '../../interfaces/index'
import './Filter.css';

/**
 * Filter component allows users to filter products by color, price, or rating.
 * It accepts `onColorFilterChange`, `onRatingFilterChange`, and `onPriceFilterChange` callbacks as props,
 * which are called whenever the user selects a new filter option. The component is designed to be flexible
 * and easily integrated into pages where product filtering is required. Each select element triggers its
 * respective handler function on change, updating the parent component's state with the selected filter criteria.
 *
 */

const Filter: React.FC<FilterProps> = ({ onColorFilterChange, onRatingFilterChange, onPriceFilterChange }) => {
  const handleSelectColor = (e: ChangeEvent<HTMLSelectElement>) => {
    onColorFilterChange(e.target.value);
  };
  const handleSelectPrice = (e: ChangeEvent<HTMLSelectElement>) => {
    onPriceFilterChange(e.target.value);
  };
  const handleSelectRating = (e: ChangeEvent<HTMLSelectElement>) => {
    onRatingFilterChange(e.target.value);
  };

  return (
    <div className="filter-container">
      <div className="filter-options">
        <select id="color" onChange={handleSelectColor}>
          <option value="">All Colors</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="black">Black</option>
          <option value="white">White</option>
          <option value="yellow">Yellow</option>
        </select>

        <select id="price" onChange={handleSelectPrice}>
          <option value="">All Prices</option>
          <option value="0-50">0 - 50</option>
          <option value="50-100">50 - 100</option>
          <option value="100-150">100 - 150</option>
          <option value="150-200">150 - 200</option>
          <option value="200+">200 and above</option>
        </select>

        <select id="rating" onChange={handleSelectRating}>
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
