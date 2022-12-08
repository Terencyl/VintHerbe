import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";
import jwtDecode from "jwt-decode";

const initialState = {
    token: localStorage.getItem("token"),
    name: "",
    email: "",
    _id: "",
    isAdmin: "",
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
    userLoaded: false,
};

//Register user
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (user, { rejectWithValue }) => {
        try {
            const token = await axios.post(`${url}/register`, {
                name: user.name,
                email: user.email,
                password: user.password,
            });
            localStorage.setItem("token", token.data);
            return token.data;
        } catch (err) {
            console.log(err.response.data);
            return rejectWithValue(err.response.data);
        }
    }
);
//Login user
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (user, { rejectWithValue }) => {
        try {
            const token = await axios.post(`${url}/login`, {
                email: user.email,
                password: user.password,
            });
            localStorage.setItem("token", token.data);
            return token.data;
        } catch (err) {
            console.log(err.response.data);
            return rejectWithValue(err.response.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        //Load user if it exists
        loadUser(state, action) {
            const token = state.token;
            if (token) {
                const user = jwtDecode(token);
                return {
                    ...state,
                    token,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    isAdmin: user.isAdmin,
                    userLoaded: true,
                };
            }
        },
        logoutUser(state, action) {
            localStorage.removeItem("token");
            //Reset the state once the user logout
            return {
                ...state,
                token: "",
                name: "",
                email: "",
                _id: "",
                registerStatus: "",
                registerError: "",
                loginStatus: "",
                loginError: "",
                userLoaded: false,
            };
        },
    },
    extraReducers: (builder) => {
        //Builder for register cases
        //Pending
        builder.addCase(registerUser.pending, (state, action) => {
            return { ...state, registerStatus: "pending" };
        });
        //Fulfilled
        builder.addCase(registerUser.fulfilled, (state, action) => {
            if (action.payload) {
                const user = jwtDecode(action.payload);
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    isAdmin: user.isAdmin,
                    registerStatus: "success",
                };
            } else return state;
        });
        //Rejected
        builder.addCase(registerUser.rejected, (state, action) => {
            return {
                ...state,
                registerStatus: "rejected",
                registerError: action.payload,
            };
        });

        //Builder for login cases
        //Pending
        builder.addCase(loginUser.pending, (state, action) => {
            return { ...state, loginStatus: "pending" };
        });
        //Fulfilled
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload) {
                const user = jwtDecode(action.payload);
                return {
                    ...state,
                    token: action.payload,
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                    isAdmin: user.isAdmin,
                    loginStatus: "success",
                };
            } else return state;
        });
        //Rejected
        builder.addCase(loginUser.rejected, (state, action) => {
            return {
                ...state,
                loginStatus: "rejected",
                loginError: action.payload,
            };
        });
    },
});

export const { loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
