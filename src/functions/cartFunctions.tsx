import { setDoc, doc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import {Product} from '../interfaces';

/**
 * Utility functions to manage cart operations in a Firebase Firestore database.
 * Includes functionality to add a product to a user's cart, remove a product from the cart,
 * and empty the cart entirely. These functions utilize Firebase Firestore's `setDoc`, `updateDoc`,
 * and `deleteField` methods to manipulate cart data.
 * 
 * @function addToCart - Adds a product to the user's cart. Merges the document to avoid overwriting existing data.
 * 
 * @function removeFromCart - Removes a specific product from the user's cart and updates the local cart state.
 * 
 * @function emptyCart - Clears all products from the user's cart and resets the local cart state.
 */


export const addToCart = async (currentUser: string, productId: string) => {
  try {
    if (!currentUser) {
      return;
    }

    const userCartCollectionRef = doc(db, 'cart', currentUser);
    await setDoc(userCartCollectionRef, {
      cart: {
        [productId]: {
          product: productId,
        },
      },
    }, { merge: true });

  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

export const removeFromCart = async (currentUser: any, productId: string, setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>) => {
  try {
    if (currentUser) {
      const userCartRef = doc(db, 'cart', currentUser.uid);


      await updateDoc(userCartRef, {
        [`cart.${productId}`]: deleteField(),
      });


      console.log('Before:', setCartProducts);


      setCartProducts((prevCartProducts: Product[]) =>
        prevCartProducts.filter((product: Product) => product.id !== productId)
      );


      return 'Product removed from Cart!'
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
};

export const emptyCart = async (currentUser: any, setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>) => {
  if (!currentUser) {
    console.error('User not logged in');
    return;
  }

  try {
    const userCartRef = doc(db, 'cart', currentUser.uid);
    await updateDoc(userCartRef, {
      cart: {},
    });

    setCartProducts([]);

    return 'Order successful!';
  } catch (error) {
    console.error('Error clearing the cart:', error);
    return 'Error clearing the cart';
  }
};