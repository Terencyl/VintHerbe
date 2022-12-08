import { Outlet, useNavigate } from "react-router-dom";
import { AdminHeaders, PrimaryButton } from "./CommonStyled";
import ProductsList from "./data/ProductsList";

function Products() {
    const navigate = useNavigate();
    return (
        <>
            <AdminHeaders>
                Products
                <PrimaryButton
                    onClick={() => navigate("/admin/products/create-product")}
                >
                    Create
                </PrimaryButton>
            </AdminHeaders>
            <ProductsList />
            <Outlet />
        </>
    );
}

export default Products;
