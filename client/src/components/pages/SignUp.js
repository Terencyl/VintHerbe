import React, { Component } from "react";
import "../../App.css";
import Footer from "../Footer";
import "./RegisterLogin.css";

export default class SignUp extends Component {
    render() {
        return (
            <>
                <div className="Register">
                    <div className="auth-wrapper">
                        <div className="auth-inner">
                            <form>
                                <h3>Sign Up</h3>
                                <div className="form-items">
                                    <label>First name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your First name"
                                    />
                                </div>

                                <div className="form-items">
                                    <label>Last name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your Last name"
                                    />
                                </div>

                                <div className="form-items">
                                    <label>Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                    />
                                </div>

                                <div className="form-items">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                    />
                                </div>

                                <div className="button-container">
                                    <button
                                        type="submit"
                                        className="submit-btn"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                                <p className="already-registered">
                                    Already registered?
                                    <a href="/login">Login</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}
