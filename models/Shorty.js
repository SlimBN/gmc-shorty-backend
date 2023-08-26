import mongoose from "mongoose";

const ShortySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      max: 280,
    },
    likes: {
      type: Array,
      defaultValue: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Shorty", ShortySchema);
