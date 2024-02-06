import { useEffect, useState } from 'react';
import { getDocs, collection, DocumentData } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Product } from '../interfaces';

/**
 * Custom hook to fetch product data from Firebase Firestore. It retrieves all products from the 'products'
 * collection, transforming the data into an array of Product objects. 
 *
 */


const fetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productsCollection = await getDocs(collection(db, 'products'));
        const productsData: Product[] = productsCollection.docs.map((doc) => {

          const data = doc.data() as DocumentData;
          return {
            id: doc.id,
            title: data.title || '', 
            category: data.category || '',
            subCategory: data.subCategory || '',
            price: data.price || '',
            rating: data.rating || 0,
            image1: data.image1 || '',
            image2: data.image2 || '',
            images: data.images || [],
            color: data.color || '',
          };
        });
        console.log('Fetched products:', productsData);
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, loading };
};

export default fetchProducts;
