import Shorty from "../models/Shorty.js";
import { handleError } from "../error.js";
import User from "../models/User.js";

// Create a shorty
export const createShorty = async (req, res, next) => {
  try {
    const newShorty = new Shorty(req.body);
    const savedShorty = await newShorty.save();
    res.status(200).json(savedShorty);
  } catch (err) {
    handleError(500, err);
  }
};

// Delete a shorty
export const deleteShorty = async (req, res, next) => {
  try {
    const shorty = await Shorty.findById(req.params.id);
    if (shorty.userId === req.body.id) {
      await shorty.deleteOne();
      res.status(200).json("Shorty has been deleted");
    } else {
      handleError(403, "Unauthorized");
    }
  } catch (err) {
    handleError(500, err);
  }
};

// Like or dislike a shorty
export const likeOrDislike = async (req, res, next) => {
  try {
    const shorty = await Shorty.findById(req.params.id);
    const userId = req.body.id;

    if (!shorty.likes.includes(userId)) {
      await shorty.updateOne({ $push: { likes: userId } });
      res.status(200).json("Shorty has been liked");
    } else {
      await shorty.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Shorty has been disliked");
    }
  } catch (err) {
    handleError(500, err);
  }
};

// Get all shorties
export const getAllShorties = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const userShorties = await Shorty.find({ userId: currentUser._id });

    const followersShorties = await Promise.all(
      currentUser.following.map(async (followerId) => {
        return Shorty.find({ userId: followerId });
      })
    );

    res.status(200).json(userShorties.concat(...followersShorties));
  } catch (err) {
    handleError(500, err);
  }
};

// Get shorties of a specific user
export const getUserShorties = async (req, res, next) => {
  try {
    const userShorties = await Shorty.find({ userId: req.params.id }).sort({
      createAt: -1,
    });

    res.status(200).json(userShorties);
  } catch (err) {
    handleError(500, err);
  }
};

// Get explore shorties (based on likes)
export const getExploreShorties = async (req, res, next) => {
  try {
    const exploreShorties = await Shorty.find({
      likes: { $exists: true },
    }).sort({ likes: -1 });

    res.status(200).json(exploreShorties);
  } catch (err) {
    handleError(500, err);
  }
};
