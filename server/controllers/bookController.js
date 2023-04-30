import BookModel from "../models/bookModel.js";
import { uploadImage } from "../utilities/upload.js";

export const createBook = async (req, res, next) => {
  try {
    if (req.file) {
      const image = req.file;
      const imageUrl = await uploadImage(image);
      req.body.coverImage = imageUrl;
    }
    const newBook = await BookModel.create(req.body);
    res.status(200).json(newBook);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const updatedBook = await BookModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

export const getBook = async (req, res, next) => {
  try {
    const book = await BookModel.findById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

export const getBooks = async (req, res, next) => {
  const { _skip, _limit, searchQuery, filterQuery, recommendation } = req.query;
  // Get value of limit param. If undefined, set it to 10 by default
  const limit = parseInt(_limit) || 10;

  // "Load more" pagination feature
  if (_skip) {
    const skip = parseInt(_skip);
    try {
      const books = await BookModel.find().limit(limit).skip(skip);
      return res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }

  // Search bar feature
  if (searchQuery) {
    // (^|\s): Start of the string or after a whitespace
    // (${query}): Contains the query string
    // i: case insensitive
    const regex = new RegExp(`(^|\\s)(${searchQuery})`, "i");
    try {
      const books = await BookModel.find({ title: { $regex: regex } }).limit(
        limit
      );
      return res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }

  // Filter feature
  if (filterQuery) {
    let compiledQuery = [];
    for (const key in filterQuery) {
      if (typeof filterQuery[key] === "string") {
        // To remove all the extra whitespaces. Reference:
        // https://stackoverflow.com/questions/18065807/regular-expression-for-removing-whitespaces
        filterQuery[key] = filterQuery[key].replace(/^\s+|\s+$|\s+(?=\s)/g, "");
        // To improve searchability (case insensitive, finding any word that starts with the value)
        filterQuery[key] = new RegExp(`(^|\\s)(${filterQuery[key]})`, "i");
      }
      // We want to find items that meet ALL of the user's conditions, so $and is used.
      // The value to $and should be an array that contains the conditions,
      // all of which should be objects.

      // Transforming filterQuery into an array of objects
      if (Array.isArray(filterQuery[key])) {
        for (let i in filterQuery[key]) {
          const x = {};
          x[key] = filterQuery[key][i];
          compiledQuery.push(x);
        }
      } else {
        const x = {};
        x[key] = filterQuery[key];
        compiledQuery.push(x);
      }
    }

    try {
      const books = await BookModel.find({ $and: compiledQuery });
      return res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }

  if (recommendation) {
    // Simple recommendation algorithm (average rating)
    try {
      const recommendedBooks = await BookModel.aggregate([
        { $match: { _id: { $nin: [recommendation] } } },
        {
          $project: {
            averageRating: {
              $divide: ["$ratingAllPoints", "$ratingAllTimes"],
            },
            _id: "$_id",
            coverImage: 1,
            price: 1,
            title: 1,
          },
        },
        { $limit: 10 },
        {
          $sort: { averageRating: -1 },
        },
      ]);
      console.log(recommendedBooks)
      res.status(200).json(recommendedBooks);
    } catch (error) {
      next(error);
    }
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    await BookModel.findByIdAndDelete(req.params.id);
    res.status(200).json("The book has been deleted.");
  } catch (error) {
    next(error);
  }
};
