import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { setHeaders, url } from "../../../slices/api";
import axios from "axios";

function Product() {
    const params = useParams();

    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            try {
                const res = await axios.get(
                    `${url}/products/find/${params.id}`,
                    setHeaders()
                );
                setProduct(res.data);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    return <>Product: {params.id}</>;
}

export default Product;

const StyledProduct = styled.div`
    margin: 3rem;
    display: flex;
    justify-content: center;
`;

const ProductContainer = styled.div`
    max-width: 500px;
    width: 100%,
    height: auto,
    display: flex;
    box-shadow: rgba(100,100,111,0.2) 0px 7px 29px 0px;
    border-radius: 5px;
    padding: 2rem;
`;

const ImageContainer = styled.div`
    flex: 1;
`;
