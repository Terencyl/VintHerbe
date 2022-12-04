import { useGetAllProductsQuery } from "../../slices/productsApi";

function Products() {
    const { data, error, isLoading } = useGetAllProductsQuery;
    return <h2>Products</h2>;
}

export default Products;
