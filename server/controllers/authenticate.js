
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authenticate = async(req, res, next) =>{
  
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('Token from authenticate:', token)
 
    if(!token){
        return res.status(401).json({message: 'No token found'})
    };
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.userId = decoded.id; 
        next();
      } catch (error) {
        console.log('error:', error)
        return res.status(403).json({ message: 'Invalid token' });
        
      }
}


module.exports = {authenticate}