import React, {useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';
import Logo from '../../assets/images/logo.png';
import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineUser, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import SubNavigation from '../SubNavigation/SubNavigation';
import Profile from '../../components/Profile/Profile';
import Banner from '../../components/Banner/Banner';
import { useAuth } from '../../Context/AuthContext';
import { NavigationProps } from '../../interfaces/index';

/**
 * Navigation component renders the main navigation bar, including category links, a logo, user actions like favorites and cart,
 * and a profile or login option. It conditionally displays a sub-navigation component based on the current route, allowing for
 * further filtering and searching of products. The component also handles mobile view with a toggleable menu for better user experience.
 */


const Navigation: React.FC<NavigationProps> = ({ onCategoryChange, onSubcategoryChange, onSortChange, onSearchChange, onColorFilterChange, onRatingFilterChange, onPriceFilterChange }) => {
  const location = useLocation();
  const { user } = useAuth();
  const isSubNavigationVisible = !['/favorites', '/cart', '/login', '/register'].includes(location.pathname);
  const showBanner = !['/cart', '/favorites', '/login', '/register'].includes(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleCategoryClick = (category: string | null) => {
    onCategoryChange(category);
    setIsMenuOpen(false); 
  };

  return (
    <div>
      <div className="navigation">
        <div className="categories">
          <ul>
            <li className="category">
              <Link to="/women" onClick={() => handleCategoryClick('women')} >
                Women
              </Link>
              <div className="subcategories">
                <ul>
                  <li><Link to="/women/clothes" onClick={() => onSubcategoryChange('clothes')}>Clothes</Link></li>
                  <li><Link to="/women/shoes" onClick={() => onSubcategoryChange('shoes')}>Shoes</Link></li>
                  <li><Link to="/women/accessories" onClick={() => onSubcategoryChange('accessories')}>Accessories</Link></li>
                </ul>
              </div>
            </li>
            <li className="category">
              <Link to="/men" onClick={() => handleCategoryClick('men')}>Men</Link>
              <div className="subcategories">
                <ul>
                  <li><Link to="/men/clothes" onClick={() => onSubcategoryChange('clothes')}>Clothes</Link></li>
                  <li><Link to="/men/shoes" onClick={() => onSubcategoryChange('shoes')}>Shoes</Link></li>
                  <li><Link to="/men/accessories" onClick={() => onSubcategoryChange('accessories')}>Accessories</Link></li>
                </ul>
              </div>
            </li>
            <li className="category">
              <Link to="/kids" onClick={() => handleCategoryClick('kids')}>Kids</Link>
              <div className="subcategories">
                <ul>
                  <li><Link to="/kids/clothes" onClick={() => onSubcategoryChange('clothes')}>Clothes</Link></li>
                  <li><Link to="/kids/shoes" onClick={() => onSubcategoryChange('shoes')}>Shoes</Link></li>
                  <li><Link to="/kids/accessories" onClick={() => onSubcategoryChange('accessories')}>Accessories</Link></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <div className={`user-actions ${isMenuOpen ? 'menu-open' : ''}`}>
          <ul>
            <li>
              <Link to="/favorites">
                <AiOutlineHeart size={30} />
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <AiOutlineShoppingCart size={30} />
              </Link>
            </li>
            {user ? (
              <li>
                <Profile user={user} />
              </li>
            ) : (
              <li>
                <Link to="/login">
                  <AiOutlineUser />Login
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="hamburger-menu" onClick={toggleMenu}>
          {!isMenuOpen ?
          <AiOutlineMenu size={30} color={"white"} />
          :
          <AiOutlineClose size={30} color={"white"}/>
        }
        </div>
      </div>
      {isSubNavigationVisible && (
        <SubNavigation
          onSortChange={onSortChange}
          onSearchChange={onSearchChange}
          onColorFilterChange={onColorFilterChange}
          onRatingFilterChange={onRatingFilterChange}
          onPriceFilterChange={onPriceFilterChange}
        />
      )}
      {showBanner && <Banner />}
    </div>
  );
}

export default Navigation;