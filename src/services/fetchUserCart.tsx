import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../Context/AuthContext';
import { Product, CartState } from '../interfaces';

/**
 * Custom hook to fetch the current user's cart products from Firebase Firestore. It uses the authenticated user's ID
 * to fetch the user's cart document from the 'cart' collection. Each product in the cart is then fetched from the
 * 'products' collection, compiling an array of Product objects.
 *
 */


const useUserCart = (): CartState => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchUserCart = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userCartRef = doc(db, 'cart', user.uid);
        const userCartSnap = await getDoc(userCartRef);

        if (!userCartSnap.exists()) {
          setLoading(false);
          return;
        }

        const cartData = userCartSnap.data()?.cart;
        if (!cartData) {
          setLoading(false);
          return;
        }

        const productIds = Object.keys(cartData);
        const cartProductsPromises = productIds.map(async (productId) => {
          const productRef = doc(db, 'products', productId);
          const productSnap = await getDoc(productRef);

          if (!productSnap.exists()) {
            console.error(`Product with ID ${productId} not found`);
            return null; 
          }

          return { id: productId, ...productSnap.data() } as Product;
        });

        const cartProductsArray = (await Promise.all(cartProductsPromises)).filter(Boolean); 
        setCartProducts(cartProductsArray as Product[]);
      } catch (error) {
        console.error('Error fetching user cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCart();
  }, [user]);

  return { cartProducts, loading, setCartProducts };
};

export default useUserCart;
