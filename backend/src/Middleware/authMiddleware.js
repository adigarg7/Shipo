import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.cookies?.token  
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded) ;
    if(!decoded) return res.status(401).json({ error: "Invalid token" });
    req.user = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default auth;
