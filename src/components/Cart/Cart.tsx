import { Link } from 'react-router-dom';
import useUserCart from '../../services/fetchUserCart';
import { PuffLoader } from 'react-spinners';
import { useAuth } from '../../Context/AuthContext';
import { emptyCart } from '../../functions/cartFunctions';
import { toast } from 'react-toastify';
import './Cart.css';
import { Product } from '../../interfaces';
import { removeFromCart } from '../../functions/cartFunctions';
import { FaTrash } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';

/**
 * The Cart component provides a user interface for displaying the shopping cart items,
 * managing them, and proceeding with the checkout process. It leverages the `useAuth` hook
 * to identify the current user and the `useUserCart` hook to fetch and manipulate the cart's state,
 * including loading states and cart products data. It integrates functionality for removing items
 * from the cart and clearing the cart upon order submission. Additionally, it uses the `toast`
 * library for user-friendly notifications upon actions like item removal or cart clearance.
 * The component also calculates the total price of items in the cart and conditionally renders
 * delivery charges based on the total price. It showcases the use of React Router's `Link` for
 * navigation, React Icons for visually appealing UI elements, and conditional rendering based on
 * user authentication and cart contents.
 *
 */

const Cart = () => {
    const { user } = useAuth();
    const { cartProducts, loading, setCartProducts } = useUserCart();

    const handleOrderClick = async () => {
        const result = await emptyCart(user, setCartProducts);
        toast.success(result, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleRemoveFromCart = async (productId: string) => {
        setCartProducts((prevCartProducts) =>
            prevCartProducts.filter((cartProduct) => cartProduct.id !== productId)
        );
        await removeFromCart(user, productId, setCartProducts);
        toast.success('Product removed from cart!', {
            position: "top-center",
            autoClose: 1700,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined
        });
    };
    const calculateTotalPrice = () => {
        return cartProducts.reduce((total, product) => total + +product.price, 0);
    };

    const deliveryPrice = calculateTotalPrice() > 100 ? 0 : 10;

    if (!user) {
        return (
            <div className="favorites-container">
                <p>To add an item to your Cart, please <Link to="/login">LOGIN</Link>.</p>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <div className="cart-items">
                <h2>Your Cart</h2>
                {loading ? (
                    <div className="loading-container">
                        <PuffLoader color="grey" loading={loading} size={100} />
                    </div>
                ) : cartProducts.length > 0 ? (
                    cartProducts.map((product: Product) => (
                        <div key={product.id} className="cart-item">
                            <img src={product.image1} alt={product.title} className="cart-item-image" />
                            <div className="cart-item-details">
                                <span className='cart-item-title'>{product.title}</span>
                                <span>{`Price: $${product.price}`}</span>
                                <div className='cart-item-rating'>
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <FaStar key={index} color={index < product.rating ? '#ffc107' : '#e4e5e9'} />
                                    ))}
                                </div>
                                <FaTrash
                                    onClick={() => handleRemoveFromCart(product.id)}
                                    style={{
                                        margin: '10px 5px',
                                        cursor: 'pointer',
                                    }}
                                />
                            </div>


                        </div>
                    ))
                ) : (
                    <p className='cart-empty'>Your Cart is empty.</p>
                )}
            </div>
            {cartProducts.length > 0 ? (
            <div className="order-summary">
                <h1>Order Summary</h1>
                <p>Items Price: ${calculateTotalPrice().toFixed(2)}</p>
                <p>Delivery Price: ${deliveryPrice.toFixed(2)}</p>
                <p>Total Price: ${(calculateTotalPrice() + deliveryPrice).toFixed(2)}</p>
                <button onClick={handleOrderClick} className="order-button">Order</button>
            </div>) : null}           
        </div>
    );
};

export default Cart;
