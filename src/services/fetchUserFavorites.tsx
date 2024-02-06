import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../Context/AuthContext';
import { db } from '../firebase/firebase';
import { Product, FavoritesState } from '../interfaces';

/**
 * Custom hook to fetch the favorite products of the current user from Firebase Firestore. It retrieves the user's favorite
 * products based on their user ID from the 'favorites' document. Each favorite product ID is used to fetch the detailed product
 * information from the 'products' collection. 
 *
 */


const useFavorites = (): FavoritesState => {
  const { user } = useAuth();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);

      if (!user) {
        setLoading(false);
        return;
      }

      const userFavoritesRef = doc(db, 'favorites', user.uid);
      const userFavoritesSnap = await getDoc(userFavoritesRef);

      if (!userFavoritesSnap.exists()) {
        setLoading(false);
        return;
      }

      const favoritesData = userFavoritesSnap.data()?.favorites;
      if (!favoritesData) {
        setLoading(false);
        return;
      }

      const productIds = Object.keys(favoritesData);
      const fetchProductDetails = async (productId: string): Promise<Product | null> => {
        const productRef = doc(db, 'products', productId);
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
          console.error(`Product with ID ${productId} not found`);
          return null;
        }

        return { id: productId, ...productSnap.data() } as Product;
      };

      const favoriteProductsPromises = productIds.map(fetchProductDetails);
      const fetchedProducts = await Promise.all(favoriteProductsPromises);

      setFavoriteProducts(fetchedProducts.filter((product): product is Product => product !== null));
      setLoading(false);
    };

    fetchFavorites();
  }, [user]);

  return { favoriteProducts, loading, setFavoriteProducts };
};

export default useFavorites;
