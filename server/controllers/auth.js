const db = require("../config/db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/transporter.js");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const {Author} = require('../models/index.js');
const { Op} = require("sequelize");

dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const register = async (req, res) => {
  
  const { username, email, password } = req.body;
  const image = req.file ? req.file.filename : null; 

  console.log("Received fields:", { username, email, password, image }); 

  
  if (!(username && email && password && image)) {
    return res.status(400).json({ message: "All fields are compulsory" });
  }

  try {
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const existingUser = await Author.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    
    const newAuthor = await Author.create({
      username,
      email,
      password: hash, 
      image: imageUrl, 
    });

    
    return res.status(201).json({ message: "Registered successfully", user: newAuthor });
  } catch (err) {
    console.error("Error during registration:", err);
    return res.status(500).json({ message: "Error during registration" });
  }
};





const logIn = async (req, res) => {
  const { username, password} = req.body;
 

  if (!(username && password)) {
    return res.status(400).json({ message: "All fields are compulsory" });
  }

  try {
    const user = await Author.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect) {
      return res.status(401).json({ message: "Incorrect username or password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(token)

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user: { id: user.id, username: user.username, email: user.email, image: user.image },
    });
  } catch (err) {
    return res.status(500).json({ message: "Error during authentication" });
  }
};


const logOut = (req, res) => {
  res.clearCookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
};



const ForgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await Author.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const resetLink = `http://localhost:5173/resetPassword?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      html: `<p>You requested for password reset. Click the link below to reset your password:</p>
             <a href="${resetLink}">Reset Password</a>
             <p>This link will expire in 1 hour</p>`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("Error Sending request reset password:", err);
        res.status(200).json({ message: "Password reset link sent", info });
      }
      
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err });
  }
};


const ResetPassword = async (req, res) => {
  const { newPassword, confirmPassword, token } = req.body;

  if (!(newPassword && confirmPassword)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Author.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);

    user.password = hash;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    const errorMsg = err.name === "TokenExpiredError" ? "Expired reset token" : "Invalid reset token";
    res.status(400).json({ message: errorMsg });
  }
};

module.exports = {
  register,
  logIn,
  logOut,
  ForgotPassword,
  ResetPassword,
  upload
};
