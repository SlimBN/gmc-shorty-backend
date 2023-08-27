import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleError } from "../error.js";

// Signup function
export const signup = async (req, res, next) => {
  try {
    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Create a new user instance
    const newUser = new User({ ...req.body, password: hash });
    newUser.username = newUser.username.toLowerCase();

    // Save the new user
    await newUser.save();

    // Generate a JWT token
    const payload = { user: { id: newUser.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "30 days" },
      (err, token) => {
        if (err) throw err;
        const { password, ...othersData } = newUser._doc;
        res.status(201).json({ token, ...othersData });
      }
    );
  } catch (err) {
    next(err);
  }
};

// Signin function
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      username: req.body.username.toLowerCase(),
    });

    // Check if user exists
    if (!user) return next(handleError(404, "User not found"));

    // Compare passwords
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(handleError(400, "Wrong password"));

    // Generate a JWT token
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT,
      { expiresIn: "30 days" },
      (err, token) => {
        if (err) throw err;
        const { password, ...othersData } = user._doc;
        res.status(201).json({ token, ...othersData });
      }
    );
  } catch (err) {
    next(err);
  }
};
