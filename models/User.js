import mongoose from "npm:mongoose@^7.4.5";

// Define the schema for the User model
const UserSchema = new mongoose.Schema(
  {
    // User's username
    username: {
      type: String,
      required: true,
      unique: true, // Usernames must be unique
    },
    // User's email address
    email: {
      type: String,
      required: true,
      unique: true, // Email addresses must be unique
    },
    // User's password
    password: {
      type: String,
      required: true,
    },
    // User's profile information
    profile: {
      type: String,
    },
    // Array of user IDs who follow this user
    followers: {
      type: Array,
      defaultValue: [], // Initial value is an empty array
    },
    // Array of user IDs whom this user follows
    following: {
      type: Array,
      defaultValue: [], // Initial value is an empty array
    },
    // User's description
    description: {
      type: String,
    },
    // User's profile picture URL
    picture: {
      type: String,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the User model using the defined schema
export default mongoose.model("User", UserSchema);
