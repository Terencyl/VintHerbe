import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    addToCart,
    clearCart,
    decreaseCartQuantity,
    getSubtotal,
    removeFromCart,
} from "../../slices/cartSlice";
import "./Cart.css";

function Cart() {
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getSubtotal());
    }, [cart, dispatch]);

    const handleRemoveFromCart = (cartItem) => {
        dispatch(removeFromCart(cartItem));
    };

    const handleDecreaseCartQuantity = (cartItem) => {
        dispatch(decreaseCartQuantity(cartItem));
    };

    const handleIncreaseCartQuantity = (cartItem) => {
        dispatch(addToCart(cartItem));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cart.cartItems.length === 0 ? (
                <div className="cart-is-empty">
                    <p>Your cart is empty</p>
                    <div className="shop-redirect-start">
                        <Link to="/">
                            <span>Start shopping !</span>
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="titles">
                        <h3 className="product-title">Product</h3>
                        <h3 className="product-price">Price</h3>
                        <h3 className="product-quantity">Quantity</h3>
                        <h3 className="product-total">Total</h3>
                    </div>
                    <div className="cart-items">
                        {cart.cartItems?.map((cartItem) => (
                            <div className="cart-item" key={cartItem.id}>
                                <div className="cart-product">
                                    <img
                                        src={cartItem.image}
                                        alt={cartItem.name}
                                    />
                                    <div>
                                        <h3>{cartItem.name}</h3>
                                        <button
                                            onClick={() =>
                                                handleRemoveFromCart(cartItem)
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-product-price">
                                    ${cartItem.price}
                                </div>
                                <div className="cart-product-quantity">
                                    <button
                                        onClick={() =>
                                            handleDecreaseCartQuantity(cartItem)
                                        }
                                    >
                                        -
                                    </button>
                                    <div className="cart-product-count">
                                        {cartItem.cartQuantity}
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleIncreaseCartQuantity(cartItem)
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="cart-product-total-price">
                                    ${cartItem.price * cartItem.cartQuantity}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <button
                            className="btn btn-danger clear-cart"
                            onClick={() => handleClearCart()}
                        >
                            Clear Cart
                        </button>
                        <div className="cart-checkout">
                            <div className="cart-subtotal">
                                <span>Subtotal</span>
                                <span className="amount">
                                    ${cart.cartTotalAmount}
                                </span>
                            </div>
                            {auth._id ? (
                                <button>Checkout</button>
                            ) : (
                                <button
                                    className="cart-login"
                                    onClick={() => navigate("/login")}
                                >
                                    Login to Checkout
                                </button>
                            )}
                            <div className="shop-redirect-continue">
                                <Link to="/">
                                    <span>Continue shopping !</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
