import { doc, setDoc, deleteField } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import {Product} from '../interfaces';

/**
 * Provides functionality to toggle a product's favorite status for a user in Firebase Firestore.
 * It can add a product to the user's favorites or remove it, based on the current liked status.
 * Updates are made to the Firestore 'favorites' collection, and local state is updated accordingly
 * using a React state setter function.
 * 
 * @function toggleLike - Toggles a product's favorite status for the current user.
 */


export const toggleLike = async (currentUser: any, productId: string, isLiked: boolean, setFavoriteProducts: React.Dispatch<React.SetStateAction<Product[]>>) => {
  try {
    if (!currentUser) {
      return;
    }

    const userDocRef = doc(db, 'favorites', currentUser.uid);

    if (isLiked) {
      await setDoc(userDocRef, {
        favorites: {
          [productId]: deleteField(),
        },
      }, { merge: true });

      setFavoriteProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));

      return 'Product removed from favorites';
    } else {
      await setDoc(userDocRef, {
        favorites: {
          [productId]: {
            product: productId,
          },
        },
      }, { merge: true });

      return 'Product added to favorites';
    }
  } catch (error) {
    console.error('Error updating favorites:', error);
    return 'Error updating favorites';
  }
};