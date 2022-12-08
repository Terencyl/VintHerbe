import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import "../../App.css";
import "./SignUpLogin.css";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = useSelector((state) => state.auth);

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(user));
    };

    /*Redirect user to cart once logged in*/
    useEffect(() => {
        if (auth._id) {
            navigate("/cart");
        }
    }, [auth._id, navigate]);

    return (
        <>
            <div className="Login">
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form onSubmit={handleSubmit}>
                            <h3>Login</h3>
                            {/*Email field*/}
                            <div className="form-items">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email"
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            {/*Password field*/}
                            <div className="form-items">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter password"
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            {/*Submit button*/}
                            <div className="button-container">
                                <button type="submit" className="submit-btn">
                                    {auth.loginStatus === "pending"
                                        ? "Submitting"
                                        : "Login"}
                                </button>
                            </div>
                            {auth.loginStatus === "rejected" ? (
                                <p>{auth.loginError}</p>
                            ) : null}
                            {/*Redirect to signup if needed*/}
                            <p className="no-account">
                                Don't have an account ?{" "}
                                <a href="/sign-up">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Login;
