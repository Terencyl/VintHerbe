import React from "react";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllProductsQuery } from "../../slices/productsApi";
import { addToCart } from "../../slices/cartSlice";
import HeroSection from "../HeroSection";
import Footer from "../Footer";

function Home() {
    const { data, error, isLoading } = useGetAllProductsQuery();
    const auth = useSelector((state) => state.auth);

    console.log(auth);

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <>
            <HeroSection />
            <div className="home-container">
                <h2>Featured</h2>
                {isLoading ? (
                    <p>Loading</p>
                ) : error ? (
                    <p>Error</p>
                ) : (
                    <>
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
                )}
            </div>
            <Footer />
        </>
    );
}

export default Home;
