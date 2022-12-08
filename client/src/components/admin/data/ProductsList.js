import * as React from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProductsList() {
    const navigate = useNavigate();
    const { items } = useSelector((state) => state.products);

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
            width: 600,
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
            width: 170,
            renderCell: (params) => {
                return (
                    <Actions>
                        <Delete>Delete</Delete>
                        <View
                            onClick={() =>
                                navigate(`/product/${params.row.id}`)
                            }
                        >
                            View
                        </View>
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

const Delete = styled.button`
    background-color: rgb(255, 77, 73);
`;

const View = styled.button`
    background-color: rgb(114, 225, 40);
`;
