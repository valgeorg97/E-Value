import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

/**
 * Fetches the liked (favorited) status of a specific product for a given user from Firebase Firestore.
 * It checks if the product ID exists within the user's 'favorites' collection document. Returns true if
 * the product is found in the favorites, indicating it is liked by the user, otherwise returns false.
 *
 * @function fetchLikedProducts - Checks if a product is liked by the current user.
 */


export const fetchLikedProducts = async (currentUser: any, productId: string) => {
  try {
    if (currentUser) {
      const userFavoritesRef = doc(db, 'favorites', currentUser.uid);
      const userFavoritesSnap = await getDoc(userFavoritesRef);

      if (userFavoritesSnap.exists()) {
        const favoritesData = userFavoritesSnap.data()?.favorites;

        if (favoritesData && favoritesData[productId]) {
          return true;
        }
      }
    }
    return false;
  } catch (error) {
    console.error('Error fetching liked products:', error);
    return false;
  }
};