import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import useFavorites from '../../services/fetchUserFavorites';
import { useAuth } from '../../Context/AuthContext';
import { PuffLoader } from 'react-spinners';
import { Product } from '../../interfaces';
import './Favorites.css';

/**
 * Favorites component displays a list of favorite products for a logged-in user.
 * It utilizes the `useFavorites` hook to fetch and manage the user's favorite products,
 * showing a loading state when the data is being fetched. If the user is not logged in,
 * it prompts them to log in to view their favorites. The component renders `ProductCard` components
 * for each favorite product, handling the scenario when no products are favorited with a message.
 * It relies on React Router's `Link` for navigation, and `PuffLoader` from `react-spinners` for loading indicators.
 *
 */

const Favorites: React.FC = () => {
  const { user } = useAuth();
  const { favoriteProducts, loading, setFavoriteProducts } = useFavorites();

  if (!user) {
    return (
      <div className="favorites-container">
        <p>To add an item to Favorites, please <Link to="/login">LOGIN</Link>.</p>
      </div>
    );
  }

  return (
    <div className='favorites-container'>
      <div className="product-list">
        <h2>Favorites</h2>
        {loading ? (
          <div className="loading-container">
            <PuffLoader color="grey" loading={loading} size={100} />
          </div>
        ) : (
          <div className="product-cards">
            {favoriteProducts.length > 0 ? (
              favoriteProducts.map((product: Product) => (
                <div key={product.id} className="product-card">
                  <ProductCard product={product} setProducts={setFavoriteProducts} />
                </div>
              ))
            ) : (
              <p className='fav-empty'>No favorite products added.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
