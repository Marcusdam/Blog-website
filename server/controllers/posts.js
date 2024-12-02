const multer = require("multer");
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 2 * 1024 * 1024 },
}).single("file");

const { where, Op } = require("sequelize");
const { Author, Category, Post } = require("../models");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: Author, as: "author" },
        { model: Category, as: "category" },
      ],
    });

    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    return res.status(200).json( posts );
  } catch (error) {
    console.error("Error getting all posts:", error);
    return res.status(500).json({ message: "Failed to retrieve posts" });
  }
};

const createPost = async (req, res) => {
  try {
    

    const { title, content, categoryId } = req.body;
    const authorId = req.userId || null;

    if (!authorId || !categoryId) {
      return res
        .status(400)
        .json({ message: "AuthorId or CategoryId is missing" });
    }

    if (!title || !content || !categoryId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    const existingPost = await Post.findOne({
      where: { title, content },
    });

    if (existingPost) {
      return res.status(409).json({ message: "Post already exists" });
    }

    const existingAuthor = await Author.findOne({ where: { id: authorId } });
    if (!existingAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }

    const existingCategory = await Category.findOne({
      where: { id: categoryId },
    });
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const newPost = await Post.create({
      title,
      content,
      authorId,
      categoryId,
      image: imageUrl,
    });

    return res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error.message, error.stack);
    return res.status(500).json({ message: "Unable to create Post" });
  }
};

const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId, {
      include: [
        { model: Author, as: "author" },
        { model: Category, as: "category" },
      ],
    });
    if (!post) {
      return res.status(404).json({ message: "Post  not found" });
    }
    return res.status(200).json({ post });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Failed to retrieve post" });
  }
};
const updatePost = async (req, res) => {
  const { title, content, categoryId } = req.body;
  const image = req.file;
  const postId = req.params.id;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.categoryId = categoryId || post.categoryId;
    if (image) {
      const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
        image.filename
      }`;
      post.image = imageUrl;
    }

    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const deletePost = await Post.destroy({ where: { id: postId } });

    if (deletePost === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Post unaable to be deleted" });
  }
};

const getCategory = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching categories" });
  }
};
const recentPosts = async (req, res) => {
  try {
    const recentPosts = await Post.findAll({
      order: [["createdAt", "DESC"]],
      limit: 10,
      include: ["author"],
    });
    res.status(200).json(recentPosts);
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    res.status(500).json({ message: "Failed to fetch recent posts" });
  }
};
const getPostByCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const postByCategory = await Post.findAll({
      where: { categoryId },
      include: [
        { model: Author, as: "author" },
        { model: Category, as: "category" },
      ],
    });

    if (postByCategory.length === 0) {
      return res
        .status(404)
        .json({ message: "No posts for this category found" });
    }

    return res.status(200).json({ posts: postByCategory });
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve posts by category" });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  getCategory,
  getPostByCategory,
  recentPosts,
};
