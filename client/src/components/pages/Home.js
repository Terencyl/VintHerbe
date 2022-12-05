import React from "react";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllProductsQuery } from "../../slices/productsApi";
import { useNavigate } from "react-router";
import { addToCart } from "../../slices/cartSlice";
import HeroSection from "../HeroSection";

function Home() {
    const { data, error, isLoading } = useGetAllProductsQuery();

    const { items: products, status } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        navigate.push("/cart");
    };

    return (
        <>
            <HeroSection />
            <div className="home-container">
                {status === "success" ? (
                    <>
                        <h2>Featured</h2>
                        <div className="products">
                            {data &&
                                data?.map((product) => (
                                    <div key={product.id} className="product">
                                        <h3>{product.name}</h3>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                        />
                                        <div className="details">
                                            <span>{product.desc}</span>
                                            <span className="price">
                                                ${product.price}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleAddToCart(product)
                                            }
                                        >
                                            Add To Cart
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </>
                ) : status === "pending" ? (
                    <p>Loading...</p>
                ) : (
                    <p>Unexpected error occured...</p>
                )}
            </div>
        </>
    );
}

export default Home;
