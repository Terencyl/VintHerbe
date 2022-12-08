import React from "react";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import HeroSection from "../HeroSection";
import Footer from "../Footer";

function Home() {
    const { items: data, status } = useSelector((state) => state.products);
    //const { data, error, isLoading } = useGetAllProductsQuery();

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <>
            <HeroSection />
            <div className="home-container">
                {status === "success" ? (
                    <>
                        <h2>Our products</h2>
                        <div className="products">
                            {data &&
                                data?.map((product) => (
                                    <div key={product._id} className="product">
                                        <h3>{product.name}</h3>
                                        <img
                                            src={product.image.url}
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
                    <p>Loading, please wait...</p>
                ) : (
                    <p>An error occured</p>
                )}
            </div>
            <Footer />
        </>
    );
}

export default Home;
