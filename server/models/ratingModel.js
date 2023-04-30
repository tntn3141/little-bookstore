import mongoose from "mongoose";

const RatingSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookModel",
    },
    value: {
      type: Number,
    },
  },
  { timestamps: true }
);

const RatingModel = mongoose.model("Rating", RatingSchema);

export default RatingModel;
