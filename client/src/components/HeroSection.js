import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";

function HeroSection() {
    return (
        <div className="hero-container">
            <h1>Welcome to VintHerbe</h1>
            <p>The place where your ideas florish</p>
            <div className="hero-btns">
                <Button
                    className="btns"
                    buttonStyle="btn--outline"
                    buttonSize="btn--large"
                    buttonLink="sign-up"
                >
                    GET STARTED
                </Button>
            </div>
        </div>
    );
}

export default HeroSection;
