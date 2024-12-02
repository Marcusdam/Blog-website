const express = require("express");
const multer = require("multer");
const {
  register,
  logIn,
  logOut,
  ForgotPassword,
  ResetPassword,
  upload,
} = require("../controllers/auth.js");
const { authenticate } = require("../controllers/authenticate.js");

const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getCategory,
  getPostByCategory,
  recentPosts,
} = require("../controllers/posts.js");

const router = express.Router();

router.post("/auth/register", upload.single("image"), register);
router.post("/auth/login", logIn);
router.post("/auth/logout", logOut);
router.post("/auth/forgot-password", ForgotPassword);
router.post("/auth/reset-password", ResetPassword);

router.get("/posts", getAllPosts);
router.get("/post/:id", getPostById);
router.post("/post", authenticate, upload.single("image"), createPost);
router.put("/post/:id", authenticate, upload.single("image"), updatePost);
router.delete("/post/:id", deletePost);
router.get("/categories", getCategory);
router.get("/posts/recent", recentPosts);
router.get("/posts/category/:categoryId", getPostByCategory);

module.exports = router;
