import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/categories'); // Ensure the URL is correct
            return response.data;
        } catch (error) {
            // Check if the error has a response (i.e., the server responded with a status)
            if (error.response) {
                return rejectWithValue(error.response.data.error || "Failed to fetch categories");
            }
            // If no response, return a generic error message
            return rejectWithValue("Network error, please try again later.");
        }
    }
);

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.loading = false;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                // Use action.payload when available, else use a generic message
                state.error = action.payload || action.error.message;
            });
    },
});

export default categorySlice.reducer;
