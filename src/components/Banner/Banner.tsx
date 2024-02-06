/**
 * Component for displaying a banner with rotating text.
 * The text rotates every 3 seconds to a random selection from BANNER_TEXT.
 *
 */
import './Banner.css';
import { BANNER_TEXT } from '../../constants/index';
import { useState, useEffect } from 'react';

const Banner = () => {
  const [bannerText, setBannerText] = useState(BANNER_TEXT[0]);

  useEffect(() => {
    const shuffleText = () => {
      const randomIndex = Math.floor(Math.random() * BANNER_TEXT.length);
      setBannerText(BANNER_TEXT[randomIndex]);
    };

    const intervalId = setInterval(shuffleText, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className='banner'>
        {bannerText}
      </div>
    </>
  );
};

export default Banner;