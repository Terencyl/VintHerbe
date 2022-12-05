import React from "react";
import "../App.css";
import "./HeroSection.css";

function HeroSection() {
    return (
        <div className="hero-container">
            <h1>Welcome to VintHerbe</h1>
            <p>The place where your ideas florish</p>
            <div class="d-grid gap-2 d-md-block">
                <a href="/sign-up" class="btn btn-light" role="button">
                    GET STARTED
                </a>
            </div>
        </div>
    );
}

export default HeroSection;
