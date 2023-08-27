import { handleError } from "../error.js";
import User from "../models/User.js";
import Shorty from "../models/Shorty.js";

// Get user by ID
export const getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Update user profile
export const update = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// Delete user and related shorties
export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    await User.findByIdAndDelete(userId);
    await Shorty.remove({ userId });

    res.status(200).json("User deleted");
  } catch (err) {
    next(err);
  }
};

// Follow a user
export const follow = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const currentUser = await User.findById(req.body.id);

    if (!currentUser.following.includes(userId)) {
      await User.updateOne(
        { _id: userId },
        { $push: { followers: req.body.id } }
      );

      await currentUser.updateOne({ $push: { following: userId } });
    } else {
      res.status(403).json("You already follow this user");
    }
    res.status(200).json("Following the user");
  } catch (err) {
    next(err);
  }
};

// Unfollow a user
export const unFollow = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const currentUser = await User.findById(req.body.id);

    if (currentUser.following.includes(userId)) {
      await User.updateOne(
        { _id: userId },
        { $pull: { followers: req.body.id } }
      );

      await currentUser.updateOne({ $pull: { following: userId } });
    } else {
      res.status(403).json("You are not following this user");
    }
    res.status(200).json("Unfollowing the user");
  } catch (err) {
    next(err);
  }
};
