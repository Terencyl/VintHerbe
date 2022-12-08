import * as React from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productsDelete } from "../../../slices/productsSlice";
import EditProduct from "../EditProduct";

export default function ProductsList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.products);
    const handleDelete = (id) => {
        dispatch(productsDelete(id));
    };
    const rows =
        items &&
        items.map((item) => {
            return {
                id: item._id,
                imageUrl: item.image.url,
                name: item.name,
                desc: item.desc,
                price: item.price.toLocaleString(),
            };
        });

    const columns = [
        { field: "id", headerName: "ID", width: 220 },
        {
            field: "imageUrl",
            headerName: "Image",
            width: 90,
            renderCell: (params) => {
                return (
                    <ImageContainer>
                        <img src={params.row.imageUrl} alt="" />
                    </ImageContainer>
                );
            },
        },
        { field: "name", headerName: "Name", width: 130 },
        {
            field: "desc",
            headerName: "Description",
            width: 200,
        },
        {
            field: "price",
            headerName: "Price",
            width: 100,
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            width: 200,
            renderCell: (params) => {
                return (
                    <Actions>
                        <button
                            class="btn btn-danger"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </button>
                        <EditProduct productId={params.row.id} />
                        <button
                            class="btn btn-success"
                            onClick={() =>
                                navigate(`/product/${params.row.id}`)
                            }
                        >
                            View
                        </button>
                    </Actions>
                );
            },
        },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}

const ImageContainer = styled.div`
    img {
        height: 40px;
    }
`;

const Actions = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    button {
        border: none;
        outline: none;
        padding: 3px 5px;
        color: white;
        border-radius: 3px;
        cursor: pointer;
    }
`;
