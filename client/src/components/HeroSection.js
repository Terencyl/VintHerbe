import React from "react";
import "../App.css";
import "./HeroSection.css";

function HeroSection() {
    return (
        <div className="hero-container">
            <h1>Welcome to VintHerbe</h1>
            <p>The place where your ideas florish</p>
            <a href="/sign-up" class="btn btn-light" role="button">
                GET STARTED
            </a>
        </div>
    );
}

export default HeroSection;
