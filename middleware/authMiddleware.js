import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log(' req.headers.Authorization ',  req.headers )
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log('token', token)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
console.log('decoded', decoded, req.user)
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized no token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized u r just a normal user");
  }
};

export { protect, admin };
