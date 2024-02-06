import './ProductList.css';
import ProductCard from '../ProductCard/ProductCard';
import fetchProducts from '../../services/fetchProducts';
import {Product} from '../../interfaces/index';
import { useState, useMemo } from 'react';
import { PuffLoader } from 'react-spinners';
import {ProductListProps} from '../../interfaces/index'

/**
 * ProductList component fetches products using `fetchProducts` service and displays them according to user-selected
 * categories, subcategories, color, price, rating, and search terms. It supports sorting by price
 * and rating, and a "Load More" functionality to incrementally display products. The component uses
 * `ProductCard` to render each product and `PuffLoader` for indicating loading state. Filters and sorting
 * are memoized for performance optimization. 
 *
 */

const ProductList = ({ selectedCategory, selectedSubcategory, colorOption, sortOption, searchTerm, ratingOption, priceOption }: ProductListProps) => {
  const { products, loading} = fetchProducts();
  const [displayedProducts, setDisplayedProducts] = useState(12);

  const loadMore = () => {
    setDisplayedProducts(prevCount => prevCount + 6);
  };
  

  const categoryAndSubcategoryFilter = (product: Product) => {
    const result =
      (!selectedCategory || product.category.toLowerCase() === selectedCategory.toLowerCase()) &&
      (!selectedSubcategory || product.subCategory.toLowerCase() === selectedSubcategory.toLowerCase());

    console.log('Category and Subcategory Filter Result:', result);
    return result;
  };

  const colorFilter = (product: Product) => {
    return !colorOption || product.color.toLowerCase() === colorOption.toLowerCase();
  };

  const priceFilter = (product: Product) => {
    const parsePrice = parseFloat(product.price);
    return !priceOption || isPriceInRange(priceOption, parsePrice);
  };

  const ratingFilter = (product: Product) => {
    return !ratingOption || product.rating.toString().toLowerCase() === ratingOption.toLowerCase();
  };

  const applySearch = (product: Product) => {
    return !searchTerm || (product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const isPriceInRange = (selectedRange: string, price: number) => {
    const [min, max] = selectedRange.split('-').map(parseFloat);

    if (isNaN(min) && isNaN(max)) return true;
    if (!isNaN(min) && isNaN(max)) return price >= min;
    if (isNaN(min) && !isNaN(max)) return price <= max;
    return price >= min && price <= max;
  };


 const filteredProducts = useMemo(() => {
  return products
    .filter(categoryAndSubcategoryFilter)
    .filter(applySearch)
    .filter(colorFilter)
    .filter(priceFilter)
    .filter(ratingFilter);
}, [products, selectedCategory, selectedSubcategory, colorOption, searchTerm, ratingOption, priceOption]);

const sortedProducts = useMemo(() => {
  const shouldClearSorting = sortOption === 'default-sort';
  const productsToSort = shouldClearSorting ? filteredProducts : filteredProducts.slice(0, displayedProducts);
  return productsToSort.sort((a, b) => {
    if (sortOption === 'priceAsc') {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (sortOption === 'priceDesc') {
      return parseFloat(b.price) - parseFloat(a.price);
    } else if (sortOption === 'ratingDesc') {
      return b.rating - a.rating;
    } else {
      return 0;
    }
  });
}, [filteredProducts, sortOption, displayedProducts]);

const allProductsLoaded = displayedProducts >= filteredProducts.length;


  return (
    <div className="products-container">
      <div className="product-list">
        <h2>{selectedCategory ? `${selectedCategory}` : 'All Products'} {selectedSubcategory ? `> ${selectedSubcategory}` : ''}</h2>
        {loading ? (
          <div className="loading-container">
            <PuffLoader color="grey" loading={loading} size={100} />
          </div>
        ) : (
          <div className="product-cards">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} setProducts={() => {}} />
            ))}
          </div>
        )}
      </div>
      <div className='load-more-btn'>
      {!allProductsLoaded && (
              <div className='load-more-btn'>
                <button onClick={loadMore}> Load More </button>
              </div>
            )}
      </div>     
    </div>
    
  );
  
};

export default ProductList;

