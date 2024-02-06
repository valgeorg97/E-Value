import React from 'react';
import {StarRatingProps} from '../../interfaces/index';
import { FaStar } from 'react-icons/fa';

/**
 * StarRating component displays a 5-star rating system where the number of filled stars corresponds to the `rating` prop.
 * It utilizes `FaStar` icons from `react-icons/fa` to visually represent the rating.
 *
 */


const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const stars = Array.from({ length: 5 }, (_, index) => (
        <FaStar key={index} color={index < rating ? '#ffc107' : '#e4e5e9'} />
    ));

    return <div style={{ display: 'flex' }}>{stars}</div>;
};


export default StarRating;
