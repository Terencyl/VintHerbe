import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <div className="footer-container">
            <section className="footer-subscription">
                <p className="footer-subscription-heading">
                    Join our newsletter so you never miss out on any offers !
                </p>
                <p className="footer-subscription-text">
                    It is possible to unsubscribe at any time.
                </p>
                <div className="input-areas">
                    <form>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your Email"
                            className="footer-input"
                        />
                        <a href="/" class="btn btn-light" role="button">
                            Subscribe
                        </a>
                    </form>
                </div>
            </section>
            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>About Us</h2>
                        <Link to="/">Terms of Service</Link>
                    </div>
                </div>
            </div>
            <section className="socials">
                <div className="socials-wrapper">
                    <div className="footer-logo">
                        <Link to="/" className="logo">
                            VintHerbe<i class="fa-solid fa-leaf"></i>
                        </Link>
                    </div>
                    <small className="website-rights">VintHerbe © 2022</small>
                    <div className="social-icons">
                        <Link
                            className="social-icon-link facebook"
                            to="/"
                            target="_blank"
                            aria-label="Facebook"
                        >
                            <i class="fa-brands fa-facebook"></i>
                        </Link>
                        <Link
                            className="social-icon-link instagram"
                            to="/"
                            target="_blank"
                            aria-label="instagram"
                        >
                            <i class="fa-brands fa-instagram"></i>
                        </Link>
                        <Link
                            className="social-icon-link twitter"
                            to="/"
                            target="_blank"
                            aria-label="twitter"
                        >
                            <i class="fa-brands fa-twitter"></i>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Footer;
