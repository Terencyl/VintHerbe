import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../slices/authSlice";
import Footer from "../Footer";
import "../../App.css";
import "./SignUpLogin.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = useSelector((state) => state.auth);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(user));
    };

    //Redirect user to cart once registered
    useEffect(() => {
        if (auth._id) {
            navigate("/cart");
        }
    }, [auth._id, navigate]);

    return (
        <>
            <div className="SignUp">
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form onSubmit={handleSubmit}>
                            <h3>Sign Up</h3>
                            <div className="form-items">
                                <label>Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your username"
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>
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
                            <div className="button-container">
                                <button type="submit" className="submit-btn">
                                    {auth.registerStatus === "pending"
                                        ? "Submitting"
                                        : "Register"}
                                </button>
                            </div>
                            {auth.registerStatus === "rejected" ? (
                                <p>{auth.registerError}</p>
                            ) : null}
                            <p className="already-registered">
                                Already registered ? <a href="/login">Login</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SignUp;
