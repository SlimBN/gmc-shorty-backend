import jwt from "jsonwebtoken";
import { handleError } from "../error.js";

// Middleware to verify the token
export const verifyToken = (req, res, next) => {
  // Get token from the header
  const token = req.header("x-auth-token");
  console.log(token)

  // Check if token exists
  if (!token) {
    return next(handleError(401, "You are not authenticated"));
  }

  // Verify the token using the JWT library
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      // If token verification fails, return an error
      return next(handleError(403, "Token is invalid"));
    }

    // If token verification succeeds, store the user data in the request object
    req.user = user;

    // Move to the next middleware or route handler
    next();
  });
};
