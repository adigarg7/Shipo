import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });
    res.json({ success: true, user });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(400).json({ error: err.message || "Signup failed" });
  }

};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('hii') ; 
    console.log('Signin attempt:', email);
    console.log('hii') ; 
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log(token) ; 

    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
    return res.json({ success: true }); 
  } catch (err) {
    console.log(err) ; 
    res.status(400).json({ error: "Signin failed" });
  }
};
