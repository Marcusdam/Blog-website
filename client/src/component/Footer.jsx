import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/category";
import { Link } from "react-router-dom";
import {
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiTwitter,
} from "react-icons/fi";

const Footer = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="footer-contact">
          <h3 className="text-lg font-semibold mb-2">Contact Me</h3>
          <p className="text-lg text-gray-400 mb-4">
            Got a project or collaboration in mind? I'd love to hear from you!
          </p>
          <ul className="contact-links">
            <li className="mb-2 flex gap-4 items-center">
              <FiMail size={20} className="text-gray-400 hover:text-white" />
              <a
                href="mailto:marcusdam@example.com"
                className="text-gray-400 hover:text-white"
              >
                marcusdam@example.com
              </a>
            </li>
            <li className="mb-2 flex gap-4 items-center">
              <FiLinkedin
                size={20}
                className="text-gray-400 hover:text-white"
              />
              <a
                href="https://www.linkedin.com/in/Oghogho-Marcus/"
                className="text-gray-400 hover:text-white"
              >
                Oghogho Marcus
              </a>
            </li>
            <li className="mb-2 flex gap-4 items-center">
              <FiGithub size={20} className="text-gray-400 hover:text-white" />
              <a
                href="https://github.com/Marcusdam"
                className="text-gray-400 hover:text-white"
              >
                Marcusdam
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-category md:ml-40">
          <h3 className="text-lg font-semibold mb-2">Categories</h3>
          <ul className="flex flex-col gap-3">
            {categories.length > 0 ? (
              categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/posts/category/${category.id}`}
                    className="text-gray-400 hover:text-white"
                  >
                    {category.name}
                  </Link>
                </li>
              ))
            ) : (
              <li className="text-gray-400">No categories found</li>
            )}
          </ul>
        </div>

        <div className="footer-social md:ml-40">
          <h3 className="text-lg font-semibold mb-2">Follow Me</h3>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="https://twitter.com/Marcusdam"
                className="flex gap-4 items-center text-gray-400 hover:text-white"
              >
                <FiTwitter
                  size={20}
                  className="text-blue-500 hover:text-white"
                />
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/Marcusdam/"
                className="flex gap-4 items-center text-gray-400 hover:text-white"
              >
                <FiInstagram
                  size={20}
                  className="text-pink-500 hover:text-white"
                />
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/Oghogho-Marcus/"
                className="flex gap-4 items-center text-gray-400 hover:text-white"
              >
                <FiLinkedin
                  size={20}
                  className="text-blue-600 hover:text-white"
                />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8 text-gray-600">
        <p>
          &copy; {new Date().getFullYear()}  Marcus Oghogho. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
