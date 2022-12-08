import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setHeaders, url } from "./api";

const initialState = {
    items: [],
    status: null,
    createStatus: null,
    deleteStatus: null,
    editStatus: null,
};

//Fetch the products available on the website
export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/products`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

//Create a new product
export const productsCreate = createAsyncThunk(
    "products/productsCreate",
    async (values) => {
        try {
            const response = await axios.post(
                `${url}/products`,
                values,
                setHeaders()
            );
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data);
        }
    }
);

//Delete a product
export const productsDelete = createAsyncThunk(
    "products/productsDelete",
    async (id) => {
        try {
            const response = await axios.delete(
                `${url}/products/${id}`,
                setHeaders()
            );
            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data);
        }
    }
);

//Edit an existing product
export const productsEdit = createAsyncThunk(
    "products/productsEdit",
    async (values) => {
        try {
            const response = await axios.put(
                `${url}/products/${values.product.id}`,
                values,
                setHeaders()
            );
            return response.data;
        } catch (error) {
            console.log(error);
            toast.info(error.response?.data);
        }
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: {
        //Fetch
        [productsFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [productsFetch.fulfilled]: (state, action) => {
            state.status = "success";
            state.items = action.payload;
        },
        [productsFetch.rejected]: (state, action) => {
            state.status = "rejected";
        },

        //Create
        [productsCreate.pending]: (state, action) => {
            state.createStatus = "pending";
        },
        [productsCreate.fulfilled]: (state, action) => {
            state.createStatus = "success";
            state.items.push(action.payload);
            toast.success("Product Created!");
        },
        [productsCreate.rejected]: (state, action) => {
            state.createStatus = "rejected";
        },

        //Edit
        [productsEdit.pending]: (state, action) => {
            state.editStatus = "pending";
        },
        [productsEdit.fulfilled]: (state, action) => {
            const updatedProducts = state.items.map((product) =>
                product.id === action.payload.id ? action.payload : product
            );
            state.items = updatedProducts;
            state.editStatus = "success";
            toast.info("Product successfully edited!");
        },
        [productsEdit.rejected]: (state, action) => {
            state.editStatus = "rejected";
        },

        //Delete
        [productsDelete.pending]: (state, action) => {
            state.deleteStatus = "pending";
        },
        [productsDelete.fulfilled]: (state, action) => {
            const newList = state.items.filter(
                (item) => item._id !== action.payload._id
            );
            state.items = newList;
            state.deleteStatus = "success";
            toast.error("Product Deleted!");
        },
        [productsDelete.rejected]: (state, action) => {
            state.deleteStatus = "rejected";
        },
    },
});

export default productsSlice.reducer;
