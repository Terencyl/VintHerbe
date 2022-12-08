import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        //Add a product to the cart
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );

            if (itemIndex >= 0) {
                state.cartItems[itemIndex] = {
                    ...state.cartItems[itemIndex],
                    cartQuantity: state.cartItems[itemIndex].cartQuantity + 1,
                };
                toast.info(
                    `Increased ${state.cartItems[itemIndex].name} cart quantity`,
                    {
                        position: "bottom-left",
                    }
                );
            } else {
                let tempProductItem = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProductItem);
                toast.success(`Added ${action.payload.name} to cart`, {
                    position: "bottom-left",
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        //Remove product from cart
        removeFromCart(state, action) {
            const newCartItems = state.cartItems.filter(
                (cartItem) => cartItem._id !== action.payload._id
            );
            state.cartItems = newCartItems;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            toast.error(`Removed ${action.payload.name} from cart`, {
                position: "bottom-left",
            });
        },
        //Decrease cart quantity
        decreaseCartQuantity(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (cartItem) => cartItem._id === action.payload._id
            );

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;

                toast.info(`Removed 1 ${action.payload.name} from cart`, {
                    position: "bottom-left",
                });
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const newCartItems = state.cartItems.filter(
                    (cartItem) => cartItem._id !== action.payload._id
                );
                state.cartItems = newCartItems;
                localStorage.setItem(
                    "cartItems",
                    JSON.stringify(state.cartItems)
                );
                toast.error(`Removed ${action.payload.name} from cart`, {
                    position: "bottom-left",
                });
            }
        },
        //Clear cart
        clearCart(state, action) {
            state.cartItems = [];
            toast.error(`Cleared cart`, {
                position: "bottom-left",
            });
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        //Get subtotal
        getSubtotal(state, action) {
            let { subtotal, quantity } = state.cartItems.reduce(
                (cartSubtotal, cartItem) => {
                    const { price, cartQuantity } = cartItem;
                    const itemTotalPrice = price * cartQuantity;

                    cartSubtotal.subtotal += itemTotalPrice;
                    cartSubtotal.quantity += cartQuantity;

                    return cartSubtotal;
                },
                {
                    subtotal: 0,
                    quantity: 0,
                }
            );
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = subtotal;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    decreaseCartQuantity,
    clearCart,
    getSubtotal,
} = cartSlice.actions;
export default cartSlice.reducer;
