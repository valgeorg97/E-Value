import React from 'react';
import './SubNavigation.css';
import Sort from '../../components/Sort/Sort';
import Search from '../../components/Search/Search';
import Filter from '../../components/Filter/Filter';
import { SubNavigationProps } from '../../interfaces/index';

/**
 * SubNavigation component renders a sub-navigation bar for sorting, searching, and filtering products.
 * It integrates Sort, Search, and Filter components, passing down handler functions for each action.
 *
 */


const SubNavigation: React.FC<SubNavigationProps> = ({ onSortChange, onSearchChange, onColorFilterChange, onRatingFilterChange, onPriceFilterChange}) => {
  return (
    <div className="subnavbar-container">
      <div className='left-side'>
      <Sort onSortChange={onSortChange} />
      <Search onSearchChange={onSearchChange} />
      </div>
      <div className='right-side'>
      <Filter onColorFilterChange={onColorFilterChange} onRatingFilterChange={onRatingFilterChange} onPriceFilterChange={onPriceFilterChange}/>
      </div>
    </div>
  );
};

export default SubNavigation;
