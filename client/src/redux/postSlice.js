import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

// Helper function for getting authorization headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not authenticated");
  return { Authorization: `Bearer ${token}` };
};

// Async thunks
export const fetchPost = createAsyncThunk(
  "/posts/fetchPost",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/posts");

      return response.data.posts || response.data; // Adjust in case of nested posts array
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch posts");
    }
  }
);

export const createPost = createAsyncThunk(
  "/post/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/post/create", formData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create post");
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/post/${postId}`, formData, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Update Post Error:", error);
      return rejectWithValue(error.response?.data || "Failed to update post");
    }
  }
);

export const deletePost = createAsyncThunk(
  "/post/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/post/${id}`, {
        headers: getAuthHeaders(),
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete post");
    }
  }
);
export const fetchPostBycategory = createAsyncThunk(
  "posts/fetchPostByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/posts/category/${categoryId}`);
      return response.data.posts || response.data;
    } catch (error) {
      console.error("Error fetching posts by category:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch posts");
    }
  }
);
export const fetchRecentPosts = createAsyncThunk(
  "posts/fetchRecentPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/posts/recent"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch recent posts"
      );
    }
  }
);

// Slice
const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    recentPosts: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPostBycategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostBycategory.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostBycategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRecentPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.recentPosts = action.payload;
      })
      .addCase(fetchRecentPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
