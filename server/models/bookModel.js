import mongoose from "mongoose";

// required is commented to fix the ValidationError,
// plus Yup validationSchema already makes sure these fields are filled

const BookSchema = mongoose.Schema(
  {
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    title: {
      type: String,
      // required: true
    },
    author: {
      type: String,
      // required: true
    },
    tags: {
      type: [String],
      // required: true
    },
    publisher: {
      type: String,
      // required: true
    },
    publicationYear: {
      type: Number,
      // required: true
    },
    coverImage: {
      type: String,
      // required: true
    },
    otherImages: {
      type: [String],
      // required: true
    },
    format: {
      type: String,
      // required: true
    },
    category: {
      type: String,
      // required: true
    },
    pages: {
      type: Number,
      // required: true
    },
    ISBN: {
      type: String,
    },
    price: {
      type: Number,
      // required: true
    },
    description: {
      type: String,
      // required: true
    },
    featured: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
    },
    ratingAllTimes: {
      type: Number,
      default: 0,
    },
    ratingAllPoints: {
      type: Number,
      default: 0,
    },
  },
  {
    virtuals: {
      averageRating: {
        get() {
          return this.ratingAllPoints / this.ratingAllTimes || 0;
        },
      },
    },
  }
);
const BookModel = mongoose.model("Book", BookSchema);

export default BookModel;
