import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const { loading, registerStatus, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setInputs({ ...inputs, image: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", inputs.username);
    formData.append("email", inputs.email);
    formData.append("password", inputs.password);
    formData.append("image", inputs.image);

    try {
      const result = await dispatch(register(formData));
      console.log("Dispatch Result:", result);

      if (result.meta.requestStatus === "fulfilled") {
        alert("Registered successfully");
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration Error:", err);
    }
  };

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-md p-8 mt-10 bg-slate-300 rounded-lg shadow-md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <h1 className='text-xl py-4 font-bold'>REGISTER</h1>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={inputs.username}
            onChange={handleChange}
            className="p-2 border border-black rounded"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            className="p-2 border border-black rounded"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            className="p-2 border border-black rounded"
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="p-2 border border-black rounded"
            accept="image/*"
          />
          <Link to='/login' className='text-blue-900 font-semibold'>Sign In</Link>

          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}

          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          {error && (
            <p style={{ color: "red" }}>
              {error.message || "An error occurred"}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
