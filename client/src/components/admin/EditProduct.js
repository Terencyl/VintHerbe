import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { productsEdit } from "../../slices/productsSlice";

export default function EditProduct({ productId }) {
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.products);

    const [currentProd, setCurrentProd] = useState({});
    const [previewImg, setPreviewImg] = useState("");

    const [name, setName] = useState("");
    const [productImg, setProductImg] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");

    const handleProductImageUpload = (e) => {
        const file = e.target.files[0];
        transformFile(file);
    };

    const transformFile = (file) => {
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setProductImg(reader.result);
                //Update the preview image while in the edit section
                setPreviewImg(reader.result);
            };
        } else {
            setProductImg("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            productsEdit({
                productImg, //Either empty string if the product is the same, or a new image if we input a new product
                product: {
                    ...currentProd,
                    name: name,
                    price: price,
                    desc: desc,
                },
            })
        );
    };

    const handleClickOpen = () => {
        setOpen(true);
        let selectedProduct = items.filter((item) => item._id === productId);
        selectedProduct = selectedProduct[0];
        setCurrentProd(selectedProduct);
        setPreviewImg(selectedProduct.image.url);
        setProductImg("");
        setName(selectedProduct.name);
        setPrice(selectedProduct.price);
        setDesc(selectedProduct.desc);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Edit onClick={handleClickOpen}>Edit</Edit>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={"md"}
            >
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    <StyledEditProduct>
                        <StyledForm onSubmit={handleSubmit}>
                            <h3>Edit the product</h3>
                            <input
                                type="file"
                                accept="image/"
                                onChange={handleProductImageUpload}
                                required
                            />
                            <input
                                type="text"
                                required
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="text"
                                required
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <input
                                type="text"
                                required
                                placeholder="Description"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                            <PrimaryButton type="submit">Submit</PrimaryButton>
                        </StyledForm>
                        <ImagePreview>
                            {previewImg ? (
                                <>
                                    <img src={previewImg} alt="previewImg" />
                                </>
                            ) : (
                                <p>Image preview</p>
                            )}
                        </ImagePreview>
                    </StyledEditProduct>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const Edit = styled.button`
    border: none;
    outline: none;
    height: 2rem;
    width: 3rem;
    font-size: 16px;
    padding: 3px 5px;
    color: white;
    border-radius: 3px
    cursor: pointer;
    background-color:#4b70e2
    `;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin-top: 2rem;
    select,
    input {
        padding: 7px;
        min-height: 30px;
        outline: none;
        border-radius: 5px;
        border: 1px solid rgb(182, 182, 182);
        margin: 0.3rem 0;
        &:focus {
            border: 2px solid rgb(0, 208, 255);
        }
    }
    select {
        color: rgb(95, 95, 95);
    }
`;

const StyledEditProduct = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ImagePreview = styled.div`
    margin: 2rem 0 2rem 2rem;
    padding: 2rem;
    border: 1px solid rgb(183, 183, 183);
    max-width: 300px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    color: rgb(78, 78, 78);
    img {
        max-width: 100%;
    }
`;
