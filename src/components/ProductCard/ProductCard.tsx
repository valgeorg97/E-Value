import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductCard.css';
import { useLocation } from 'react-router-dom';
import {Product} from '../../interfaces';
import { auth } from '../../firebase/firebase';
import { addToCart } from '../../functions/cartFunctions';
import { toggleLike } from '../../functions/favoriteFunctions';
import { fetchLikedProducts } from '../../services/fetchLikedProducts';
import StarRating from '../StarsRating/StarsRating';

/**
 * ProductCard component displays a single product's details including its images, title, price, and rating.
 * It allows users to like/unlike the product, which is indicated by heart icons, and add the product to their cart.
 * The component uses the `auth` object to check for a logged-in user and manages the liked state of the product.
 * It also includes functionality to switch between product images if more than one is available. Toast notifications
 * are used to provide feedback for actions like adding to favorites or cart. The component is designed to work within
 * different parts of the site, adapting its functionality based on the current route (e.g., hiding the add to cart button
 * on the cart page).
 *
 */


const ProductCard: React.FC<{ product: Product, setProducts: React.Dispatch<React.SetStateAction<Product[]>> }> = ({ product, setProducts }) => {
  const [isLiked, setIsLiked] = useState(false);
  const currentUser = auth.currentUser;
  const location = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getImageSrc = (product: Product, index: number): string => {
    const images = [product.image1, product.image2].filter(Boolean); 
    return images[index] || ''; 
  };

  useEffect(() => {
    const fetchLikedStatus = async () => {
      try {
        if (currentUser) {
          const liked = await fetchLikedProducts(currentUser, product.id);
          setIsLiked(liked);
        }
      } catch (error) {
        console.error('Error fetching liked status:', error);
      }
    };

    fetchLikedStatus();
  }, [currentUser, product.id]);

  const handleToggleLike = async () => {
    try {
      if (!currentUser) {
        toast.info('To add a photo to Favorites, please Login.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
  
      setIsLiked((prevIsLiked) => !prevIsLiked);
      
      const result = await toggleLike(currentUser, product.id, isLiked, setProducts);
  
      toast.success(result, {
        position: 'top-center',
        autoClose: 1700,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };
  const handleAddToCart = async () => {
    try {
      if (!currentUser) {
        toast.info('To add a product to your Cart, please Login.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }
  
      await addToCart(currentUser.uid, product.id);
      toast.success('Product added to cart!', {
        position: 'top-center',
        autoClose: 1700,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="product-card">
      <div className="image-container">
        {location.pathname !== '/cart' && (
          <div className="heart-icon">
            {isLiked ? (
              <FaHeart onClick={handleToggleLike} />
            ) : (
              <FaRegHeart onClick={handleToggleLike} />
            )}
          </div>
        )}
         <img src={getImageSrc(product, currentImageIndex)} alt={product.title} className="product-image" loading="lazy"/>
      {product.image2 && (
        <div className="dots-container">
          {[0, 1].map((index) => (
            <div
              key={index}
              className={`dot ${index === currentImageIndex ? 'active-dot' : ''}`}
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
        </div>
      )}
      </div>
      <span className='title'>{product.title}</span>
      <div>
        <span>{`Price: $${product.price}`}</span>
      </div>
      <div className='rating'>
        <StarRating rating={product.rating} />
      </div>
      {location.pathname !== '/cart' ? (
        <div className="add-to-cart" onClick={handleAddToCart}>
          Add to cart
        </div>
      ) : null}
      <ToastContainer />
    </div>
  );
};

export default ProductCard;