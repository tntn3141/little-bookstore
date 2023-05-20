import RatingModel from "../models/ratingModel.js";
import BookModel from "../models/bookModel.js";
import { startSession } from "mongoose";

export const getRating = async (req, res, next) => {
  const { user_id, item_id } = req.body;
  try {
    const rateValue = await RatingModel.find({
      userId: user_id,
      itemId: item_id,
    });
    res.status(200).json(rateValue);
  } catch (error) {
    next(error);
  }
};

export const createRating = async (req, res, next) => {
  const { user_id, item_id, value } = req.body;
  const session = await startSession();
  try {
    let currentRating = await RatingModel.findOne({
      userId: user_id,
      itemId: item_id,
    });
    session.startTransaction();
    if (!currentRating) {
      // Register user's rating
      const newRating = await RatingModel.create({
        userId: user_id,
        itemId: item_id,
        value: value,
      });
      const updatedBook = await BookModel.updateOne(
        { _id: item_id },
        { $inc: { ratingAllTimes: 1, ratingAllPoints: value } }
      );
      return res.status(200).json(newRating);
    } else {
      // Update user's rating
      const updatedBook = await BookModel.findByIdAndUpdate(item_id, {
        $inc: { ratingAllPoints: -currentRating.value + value },
      });
      const updatedRating = await RatingModel.findOneAndUpdate(
        { userId: user_id, itemId: item_id },
        {
          value: value,
        }
      );
      return res.status(200).json(updatedRating);
    }
  } catch (error) {
    next(error);
  }
};
