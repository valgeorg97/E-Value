import React, { useState, Suspense} from 'react';
import { Routes, Route} from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { AuthProvider } from './Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
const LazyProductList = React.lazy(() => import('./components/ProductList/ProductList'))
import Footer from './components/Footer/Footer';
import Navigation from './layout/Navigation/Navigation';
import Favorites from './components/Favorites/Favorites';
import Cart from './components/Cart/Cart';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { useNavigate } from 'react-router-dom';
import './App.css';

/**
 * App component is the root of the application, managing the routing and global state management.
 * It utilizes React Router for navigation between pages and manages user authentication state with an AuthProvider context.
 * The application dynamically loads product lists and other components such as Favorites, Cart, Login, and Register using lazy loading for optimized performance.
 * It handles user actions like sorting, searching, and filtering products and provides a consistent layout structure with Navigation and Footer components.
 *
 */


function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [subCategory, setSubCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('default');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [colorOption, setColorOption] = useState<string>('');
  const [ratingOption, setRatingOption] = useState<string>('');
  const [priceOption, setPriceOption] = useState<string>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setSubCategory(null);
  };

  const handleSubcategoryChange = (subCategory: string | null) => {
    setSubCategory(subCategory);
  };
  const handleColorFilterChange = (colorOption: string) => {
    setColorOption(colorOption);
  };
  const handleRatingFilterChange = (ratingOption: string) => {
    setRatingOption(ratingOption);
  };
  const handlePriceFilterChange = (priceOption: string) => {
    setPriceOption(priceOption);
  };
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Successfully logged in', {
        position: "top-center",
        autoClose: 1700,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
      });
      navigate('/'); 
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Invalid email or password, please try again!', {
        position: "top-center",
        autoClose: 1700,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined
      });
    }
  };
  
  return (
    <AuthProvider>
        <div>
          <Navigation onCategoryChange={handleCategoryChange} onSubcategoryChange={handleSubcategoryChange} onSortChange={handleSortChange} onSearchChange={handleSearchChange} onColorFilterChange={handleColorFilterChange} onRatingFilterChange={handleRatingFilterChange} onPriceFilterChange={handlePriceFilterChange} />
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                <LazyProductList
                  selectedCategory={selectedCategory}
                  selectedSubcategory={subCategory}
                  sortOption={sortOption}
                  colorOption={colorOption}
                  searchTerm={searchTerm}
                  ratingOption={ratingOption}
                  priceOption={priceOption}
                />
                </Suspense>
              }
            />
            <Route path="/women" element={
            <Suspense fallback={<div>Loading...</div>}>
            <LazyProductList selectedCategory={selectedCategory}
              selectedSubcategory={subCategory}
              sortOption={sortOption}
              colorOption={colorOption}
              searchTerm={searchTerm}
              ratingOption={ratingOption}
              priceOption={priceOption}
              /> 
              </Suspense>
              } />
            <Route path="/women/clothes" element={<Suspense fallback={<div>Loading...</div>}><LazyProductList selectedCategory="women" selectedSubcategory="clothes" colorOption={colorOption} sortOption={sortOption} searchTerm={searchTerm} ratingOption={ratingOption} priceOption={priceOption}/></Suspense>} />
            <Route path="/women/shoes" element={<Suspense fallback={<div>Loading...</div>}><LazyProductList selectedCategory="women" selectedSubcategory="shoes" colorOption={colorOption} sortOption={sortOption} searchTerm={searchTerm} ratingOption={ratingOption} priceOption={priceOption}/></Suspense>} />
            <Route path="/women/accessories" element={<Suspense fallback={<div>Loading...</div>}><LazyProductList selectedCategory="women" selectedSubcategory="accessories" colorOption={colorOption} sortOption={sortOption} searchTerm={searchTerm} ratingOption={ratingOption} priceOption={priceOption}/></Suspense>} />
            <Route path="/men" element={<Suspense fallback={<div>Loading...</div>}><LazyProductList selectedCategory={selectedCategory}
              selectedSubcategory={subCategory}
              sortOption={sortOption}
              colorOption={colorOption}
              searchTerm={searchTerm}
              ratingOption={ratingOption}
              priceOption={priceOption}
           /> </Suspense>} />
            <Route path="/men/clothes" element={<Suspense fallback={<div>Loading...</div>}><LazyProductList selectedCategory="men" selectedSubcategory="clothes" colorOption={colorOption} sortOption={sortOption} searchTerm={searchTerm} ratingOption={ratingOption} priceOption={priceOption} /></Suspense>} />
            <Route path="/men/shoes" element={<Suspense fallback={<div>Loading...</div>}><LazyProductList selectedCategory="men" selectedSubcategory="shoes" colorOption={colorOption} sortOption={sortOption} searchTerm={searchTerm} ratingOption={ratingOption} priceOption={priceOption} /></Suspense>} />
            <Route path="/men/accessories" element={<Suspense fallback={<div>Loading...</div>}><LazyProductList selectedCategory="men" selectedSubcategory="accessories" colorOption={colorOption} sortOption={sortOption} searchTerm={searchTerm} ratingOption={ratingOption} priceOption={priceOption}/></Suspense>} />
            <Route path="/kids" element={<Suspense fallback={<div>Loading...</div>}><LazyProductList selectedCategory={selectedCategory}
              selectedSubcategory={subCategory}
              sortOption={sortOption}
              colorOption={colorOption}
              searchTerm={searchTerm}
              ratingOption={ratingOption}
              priceOption={priceOption}
        /></Suspense>} />
            <Route path="/kids/clothes" element={<Suspense fallback={<div>Loading...</div>}><LazyProductList selectedCategory="kids" selectedSubcategory="clothes" colorOption={colorOption} sortOption={sortOption} searchTerm={searchTerm} ratingOption={ratingOption} priceOption={priceOption}/></Suspense>} />
            <Route path="/kids/shoes" element={<Suspense fallback={<div>Loading...</div>}><LazyProductList selectedCategory="kids" selectedSubcategory="shoes" colorOption={colorOption} sortOption={sortOption} searchTerm={searchTerm} ratingOption={ratingOption} priceOption={priceOption}/></Suspense>} />
            <Route path="/kids/accessories" element={<Suspense fallback={<div>Loading...</div>}><LazyProductList selectedCategory="kids" selectedSubcategory="accessories" colorOption={colorOption} sortOption={sortOption} searchTerm={searchTerm} ratingOption={ratingOption} priceOption={priceOption}/></Suspense>} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login email={email} password={password} onEmailChange={setEmail} onPasswordChange={setPassword} onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
          <Footer />
          <ToastContainer />
        </div>
    </AuthProvider>
  );
}

export default App;