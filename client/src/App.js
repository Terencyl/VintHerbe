import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import Cart from "./components/pages/Cart";
import Dashboard from "./components/admin/Dashboard";
import Products from "./components/admin/Products";
import CreateProduct from "./components/admin/CreateProduct";
import ProductDetail from "./components/admin/details/Product";

function App() {
    return (
        <>
            <BrowserRouter>
                <ToastContainer />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/register" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/admin" element={<Dashboard />}>
                        <Route path="products" element={<Products />}>
                            <Route
                                path="create-product"
                                element={<CreateProduct />}
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
