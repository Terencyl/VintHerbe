import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser } from "../slices/authSlice";
import "./Navbar.css";

function Navbar() {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [click, setClick] = useState(false);
    //eslint-disable-next-line
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    //To display number of items in cart in the Navbar
    const { cartTotalQuantity } = useSelector((state) => state.cart);

    window.addEventListener("resize", showButton);

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link
                        to="/"
                        className="navbar-logo"
                        onClick={closeMobileMenu}
                    >
                        VintHerbe<i class="fa-solid fa-leaf"></i>
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? "fas fa-times" : "fas fa-bars"} />
                    </div>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <Link
                                to="/"
                                className="nav-links"
                                onClick={closeMobileMenu}
                            >
                                Home
                            </Link>
                        </li>
                        {auth._id ? (
                            <>
                                {auth.isAdmin ? (
                                    <li className="nav-item">
                                        <Link
                                            to="/admin/products"
                                            className="nav-links"
                                            onClick={closeMobileMenu}
                                        >
                                            Admin
                                        </Link>
                                    </li>
                                ) : null}

                                <li className="nav-item">
                                    <Link
                                        className="nav-links"
                                        onClick={() => {
                                            closeMobileMenu();
                                            dispatch(logoutUser(null));
                                            toast.warning("Logged out", {
                                                position: "bottom-left",
                                            });
                                        }}
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link
                                        to="/login"
                                        className="nav-links"
                                        onClick={closeMobileMenu}
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        className="nav-links"
                                        onClick={closeMobileMenu}
                                    >
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link
                                to="/cart"
                                className="nav-links-bag"
                                onClick={closeMobileMenu}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    fill="currentColor"
                                    class="bi bi-cart"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />{" "}
                                </svg>
                                <span className="bag-quantity">
                                    <span>{cartTotalQuantity}</span>
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
