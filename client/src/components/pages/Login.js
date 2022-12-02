import React from "react";
import "../../App.css";
import "./SignUpLogin.css";

function Login() {
    return (
        <div className="Login">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Login</h3>

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
                            <button type="submit" className="submit-btn">
                                Submit
                            </button>
                        </div>
                        <p className="no-account">
                            Don't have an account ?{" "}
                            <a href="/sign-up">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
