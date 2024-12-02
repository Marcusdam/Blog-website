import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { fetchCategories } from "../redux/category";
import { updatePost } from "../redux/postSlice";

const UpdatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [error, setError] = useState("");
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/post/${postId}`
        );
        const post = response.data.post;
        setTitle(post.title);
        setContent(post.content);
        setCategoryId(post.categoryId);
        setCurrentImage(post.image);
      } catch (error) {
        console.error("Error fetching post details:", error);
        setError("Failed to fetch post details.");
      }
    };
    fetchPostDetails();
  }, [postId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title || !content || !categoryId) {
      setError("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("categoryId", categoryId);
    if (image) formData.append("image", image);

    try {
      dispatch(updatePost({postId, formData}))
      alert("Post updated successfully");
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error("Error updating post:", error);
      setError("Failed to update post.");
    }
  };

  return (
    <div className="container max-w-[1240px] mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Update Post</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border p-2"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={handleImageChange}
          className="border p-2"
        />
        {currentImage && (
          <img src={currentImage} alt="Preview" className="w-40 h-40" />
        )}
        <button type="submit" className="bg-blue-500 text-white p-2">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
