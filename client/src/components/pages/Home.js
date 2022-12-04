import React from "react";
import "../../App.css";
import { useGetAllProductsQuery } from "../../slices/productsApi";
import Cards from "../Cards";
import HeroSection from "../HeroSection";

function Home() {
    const { data, error, isLoading } = useGetAllProductsQuery();
    console.log("Api", isLoading);

    return (
        <>
            <HeroSection />
            <Cards />
        </>
    );
}

export default Home;
