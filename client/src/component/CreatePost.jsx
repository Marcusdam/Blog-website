import React, { useEffect, useState } from 'react';
import ReactQuill from "react-quill";
import axios from 'axios';
import sanitizeHtml from 'sanitize-html';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/category.js';

const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: '',
        categoryId: '',
        content: '',
        image: null,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { title, categoryId, content, image } = formData;
    const { categories } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    };

   
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                setErrors({ ...errors, image: 'Unsupported file type. Only JPEG, PNG, and GIF allowed.' });
                return;
            }
            if (file.size > 2 * 1024 * 1024) { 
                setErrors({ ...errors, image: 'File size exceeds 2MB.' });
                return;
            }
            setFormData({ ...formData, image: file });
            setErrors((prevErrors) => ({ ...prevErrors, image: null }));
        }
    };

  
    const validateInputs = () => {
        const validationErrors = {};
        if (!title.trim()) validationErrors.title = 'Title is required.';
        if (!categoryId) validationErrors.categoryId = 'Category is required.';
        if (!content.trim()) validationErrors.content = 'Content is required.';
        if (!image) validationErrors.image = 'An image is required.';
        return validationErrors;
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        const sanitizedContent = sanitizeHtml(content, {
            allowedTags: ['b', 'i', 'ul', 'li', 'strong', 'em'],
            allowedAttributes: {},
            disallowedTagsMode: 'discard',
        });

        const postData = new FormData();
        postData.append('title', title);
        postData.append('content', sanitizedContent);
        postData.append('categoryId', categoryId);
        postData.append('image', image);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('No token found. Please log in.');
                return;
            }

            await axios.post('http://localhost:5000/api/post', postData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('Post created successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error creating post:', error.response?.data?.message || error.message);
            alert('Failed to create post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container max-w-[1024px] mx-auto mt-28">
            <form onSubmit={handleSubmit} className="space-y-6">
               
                <div className="flex flex-col space-y-4">
                    <label className="font-bold">Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Post Title"
                        value={title}
                        onChange={handleInputChange}
                        className={`p-4 border ${errors.title ? 'border-red-500' : 'border-black'}`}
                    />
                    {errors.title && <span className="text-red-500">{errors.title}</span>}
                </div>

                
                <div className="flex flex-col space-y-4">
                    <label className="font-bold">Post Content</label>
                    <ReactQuill
                        value={content}
                        onChange={(value) => {
                            setFormData({ ...formData, content: value });
                            if (errors.content) setErrors((prevErrors) => ({ ...prevErrors, content: null }));
                        }}
                        className={`${errors.content ? 'border border-red-500' : ''}`}
                        modules={{
                            toolbar: [
                                ['bold', 'italic'],
                                [{ list: 'ordered' }, { list: 'bullet' }],
                                ['link'],
                            ],
                        }}
                        formats={['bold', 'italic', 'list', 'bullet', 'link']}
                    />
                    {errors.content && <span className="text-red-500">{errors.content}</span>}
                </div>

                
                <div className="flex flex-col space-y-4">
                    <label className="font-bold">Category</label>
                    <select
                        name="categoryId"
                        value={categoryId}
                        onChange={handleInputChange}
                        className={`p-4 border ${errors.categoryId ? 'border-red-500' : 'border-black'}`}
                    >
                        <option value="" disabled>
                            Select a category
                        </option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.categoryId && <span className="text-red-500">{errors.categoryId}</span>}
                </div>

                <div className="flex flex-col space-y-4">
                    <label className="font-bold">Upload Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className={`border ${errors.image ? 'border-red-500' : 'border-black'} p-2`}
                    />
                    {errors.image && <span className="text-red-500">{errors.image}</span>}
                </div>

                
                <button
                    type="submit"
                    disabled={loading}
                    className={`bg-blue-500 text-white p-3 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Creating Post...' : 'Create Post'}
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
