import BookModel from "../models/bookModel.js";
import { uploadImageGC, uploadImageIMGBB } from "../utilities/upload.js";

export const createBook = async (req, res, next) => {
  try {
    if (req.body.image) {
      // Uploading to imgbb (currently in use)
      if (req.body.imageUploadType == "imgbb") {
        const imageUrl = await uploadImageIMGBB(req.body.image);
        req.body.imgbb = imageUrl;
      }
      // Uploading to Google Cloud (not actually in use because GC free trial ran out)
      if (req.body.imageUploadType == "gc") {
        const imageUrl = await uploadImageGC(req.body.image);
        req.body.imgbb = imageUrl;
      }
    }
    const newBook = await BookModel.create(req.body);
    res.status(200).json(newBook);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    if (req.body.image) {
      // Uploading to imgbb (currently in use)
      if (req.body.imageUploadType == "imgbb") {
        const imageUrl = await uploadImageIMGBB(req.body.image);
        req.body.imgbb = imageUrl;
      }
      // Uploading to Google Cloud (not actually in use because GC free trial ran out)
      if (req.body.imageUploadType == "gc") {
        const imageUrl = await uploadImageGC(req.body.image);
        req.body.imgbb = imageUrl;
      }
    }

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
  const {
    _skip,
    _limit,
    normal,
    latest,
    searchQuery,
    filterQuery,
    recommendation,
  } = req.query;
  // Get value of limit param. If undefined, set it to 10 by default
  const limit = parseInt(_limit) || 10;
  const skip = parseInt(_skip);

  // DEFAULT ORDER (OLDEST -> NEWEST)
  if (normal) {
    try {
      const books = await BookModel.find().limit(limit).skip(skip);
      return res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }

  // NEW BOOKS (NEWEST -> OLDEST)
  if (latest) {
    try {
      const latestBooks = await BookModel.find()
        .sort({ $natural: -1 })
        .limit(limit)
        .skip(skip);
      return res.status(200).json(latestBooks);
    } catch (error) {
      next(error);
    }
  }

  if (searchQuery) {
    // (^|\s): Start of the string or after a whitespace
    // (${query}): Contains the query string
    // i: case insensitive
    const regex = new RegExp(`(^|\\s)(${searchQuery})`, "i");
    try {
      const matchedBooks = await BookModel.find({
        $or: [{ title: regex }, { author: regex }],
      })
        .limit(limit)
        .skip(skip);
      return res.status(200).json(matchedBooks);
    } catch (error) {
      next(error);
    }
  }

  // FILTER
  if (filterQuery) {
    let compiledQuery = [];
    // Filter by "$and" (all conditions must be true) by default
    // If the key "or" is present, change the value to "$or" (at least one condition is true)
    let type = "$and";

    for (const key in filterQuery) {
      const implicitArrays = [
        "includedTags",
        "excludedTags",
        "includedFormat",
        "excludedFormat",
      ];

      // To properly separate items in implicit arrays
      if (implicitArrays.includes(key) && filterQuery[key].includes(",")) {
        filterQuery[key] = filterQuery[key].split(",");
      }

      // New object to store the renamed key:value pair of certain fields,
      // to be added to the final compiledQuery
      const tempObject = {};

      // Rename the keys and values into ones that mongoDB understands
      switch (key) {
        // If the value is not an implicit array, transform it into a regex to improve
        // searchability (case insensitive, matching one word/phrase in any position)
        case "title":
        case "author":
          filterQuery[key] = new RegExp(`(^|\\s)(${filterQuery[key]})`, "i");
          break;
        // Convert price shorthands into mongoDB queries
        case "price":
          switch (filterQuery[key]) {
            case "0":
              filterQuery[key] = { $gte: 0 };
              break;
            case "1":
              filterQuery[key] = { $lte: 200000 };
              break;
            case "2":
              filterQuery[key] = { $gte: 200000, $lte: 400000 };
              break;
            case "3":
              filterQuery[key] = { $gte: 400000, $lte: 600000 };
              break;
            case "4":
              filterQuery[key] = { $gte: 600000 };
              break;
          }
          break;

        // Rename to correct field names of mongoDB / Transform values to ones
        // that the database understands
        case "includedTags":
          delete Object.assign(
            tempObject,
            { [key]: filterQuery[key] },
            {
              ["tags"]: filterQuery["includedTags"],
            }
          )["includedTags"];
          break;
        case "includedFormat":
          delete Object.assign(
            tempObject,
            { [key]: filterQuery[key] },
            {
              ["format"]: filterQuery["includedFormat"],
            }
          )["includedFormat"];
          break;
        case "excludedTags":
          filterQuery[key] = { $nin: filterQuery[key] };
          delete Object.assign(
            tempObject,
            { [key]: filterQuery[key] },
            {
              ["tags"]: filterQuery["excludedTags"],
            }
          )["excludedTags"];
          break;
        case "excludedFormat":
          filterQuery[key] = { $nin: filterQuery[key] };
          delete Object.assign(
            tempObject,
            { [key]: filterQuery[key] },
            {
              ["format"]: filterQuery["excludedFormat"],
            }
          )["excludedFormat"];
          break;

        case "or":
          type = "$or";
      }
      // Add queries to the final query using the renamed keys
      if (Object.keys(tempObject).length > 0) {
        compiledQuery.push(tempObject);
      } else {
        compiledQuery.push({ [key]: filterQuery[key] });
      }
    }

    try {
      const books = await BookModel.find({ [type]: compiledQuery })
        .limit(limit)
        .skip(skip);
      return res.status(200).json(books);
    } catch (error) {
      next(error);
    }
  }

  // RECOMMENDATION (highest average rating)
  if (recommendation) {
    try {
      const recommendedBooks = await BookModel.aggregate([
        // To exclude the current item (NOT WORKING atm for some reason)
        { $match: { _id: { $nin: [recommendation] } } },
        {
          // Temporary doc to be returned for the frontend
          $project: {
            averageRating: {
              $cond: [
                {
                  $eq: ["$ratingAllTimes", 0],
                },
                0,
                { $divide: ["$ratingAllPoints", "$ratingAllTimes"] },
              ],
            },
            _id: "$_id",
            imgbb: 1,
            price: 1,
            title: 1,
          },
        },
        // Get x items
        { $limit: 15 },
        {
          // Descending order
          $sort: { averageRating: -1 },
        },
      ]);
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
