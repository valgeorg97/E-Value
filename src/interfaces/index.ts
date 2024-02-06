import { User } from "firebase/auth";

export interface Product {
  id: string;
  title: string;
  category: string;
  subCategory: string;
  price: string;
  rating: number;
  image1: string;
  image2: string;
  images: [];
  color: string;
}

  export interface FilterProps {
    onColorFilterChange: (filterOption: string) => void;
    onRatingFilterChange: (ratingOption: string) => void;
    onPriceFilterChange: (priceOption: string) => void;
  }

  export interface LoginProps {
    email: string;
    password: string;
    onEmailChange: (email: string) => void;
    onPasswordChange: (password: string) => void;
    onLogin: () => void;
  }
 
  export interface StarRatingProps {
    rating: number;
  }

  export interface ProductListProps {
    selectedCategory: string | null;
    selectedSubcategory: string | null;
    colorOption: string;
    sortOption: string;
    searchTerm: string;
    ratingOption: string;
    priceOption: string;
  };

export interface SearchProps {
    onSearchChange: (searchTerm: string) => void;
  }

export interface SortProps {
    onSortChange: (sortOption: string) => void;
  }

export interface AuthContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  signout: () => void; 
};

export interface NavigationProps {
  onCategoryChange: (category: string | null) => void;
  onSubcategoryChange: (category: string | null) => void;
  onSortChange: (sortOption: string) => void;
  onSearchChange: (searchTerm: string) => void;
  onColorFilterChange: (colorOption: string) => void;
  onRatingFilterChange: (ratingOption: string) => void;
  onPriceFilterChange: (priceOption: string) => void;
};

export interface SubNavigationProps {
  onSortChange: (sortOption: string) => void;
  onSearchChange: (searchTerm: string) => void;
  onColorFilterChange: (colorOption: string) => void; 
  onRatingFilterChange: (ratingOption: string) => void; 
  onPriceFilterChange: (priceOption: string) => void; 
};

export interface CartState {
  cartProducts: Product[];
  setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  loading: boolean; 
};

export interface FavoritesState {
  favoriteProducts: Product[];
  loading: boolean;
  setFavoriteProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};
