import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../redux/authSlice";
import { fetchCategories } from "../redux/category";
import { FaBars, FaTimes, FaCaretDown } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleLogOut = async (e) => {
    e.preventDefault();
    dispatch(logOut());
    navigate("/");
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  return (
    <nav className=" bg-white border-b-2 fixed top-0 w-full h-20  z-50 ">
      <div className="flex justify-between items-center  pt-8 px-4 ">
        <div
          onClick={() => navigate("/")}
          className="text-3xl font-bold text-red-600 cursor-pointer"
        >
          BlogCrafters
        </div>

        <div className="md:hidden">
          <button
            className="text-xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-lg font-medium">
          <li>
            <Link to="/" className="hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-400">
              About
            </Link>
          </li>

          <li
            className="relative hover:text-gray-400 cursor-pointer"
            onMouseEnter={() => setCategoryMenuOpen(true)}
            onMouseLeave={() => setCategoryMenuOpen(false)}
          >
            <span className="flex items-center gap-2">
              Categories <FaCaretDown />
            </span>
            {categoryMenuOpen && (
              <ul className="absolute top-full left-0 mt-2 bg-gray-100  text-black rounded shadow-md py-2 w-48">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <li
                      key={category.id}
                      className="hover:bg-gray-700 hover:text-white px-4 py-2"
                    >
                      <Link to={`/posts/category/${category.id}`}>
                        {category.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">No categories</li>
                )}
              </ul>
            )}
          </li>
          <li>
            <Link to="/services" className="hover:text-gray-400">
              Services
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-400">
              Contact
            </Link>
          </li>
        </ul>

        <div className="hidden md:flex text-lg font-semibold items-center gap-6">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/CreatePost")}
                className="hover:text-gray-400"
              >
                Create Post
              </button>
              <button onClick={handleLogOut} className="hover:text-gray-400">
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hover:text-gray-400"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="hover:text-gray-400"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>

      <div
        className={`md:hidden w-full h-screen bg-gray-800 text-white py-4 px-6 mt-3 transition-all duration-300 ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-4">
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>

          <li>
            <div
              className="cursor-pointer"
              onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
            >
              <span className="flex items-center gap-2">
                Categories <FaCaretDown />
              </span>
            </div>
            {categoryMenuOpen && (
              <ul className="mt-2 bg-gray-700 text-white rounded shadow-md py-2">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <li
                      key={category.id}
                      className="hover:bg-gray-600 px-4 py-2"
                    >
                      <Link
                        to={`/posts/category/${category.id}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-400">No categories</li>
                )}
              </ul>
            )}
          </li >
          {isAuthenticated ? (
            <>
              <li>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/CreatePost");
                  }}
                >
                  Create Post
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogOut();
                  }}
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/login");
                  }}
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/register");
                  }}
                >
                  Register
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
