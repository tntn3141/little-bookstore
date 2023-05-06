import mongoose from "mongoose";

// required is commented to fix the ValidationError,
// plus Yup validationSchema already makes sure these fields are filled

const BookSchema = mongoose.Schema(
  {
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    lastModifiedBy: {
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
    language: {
      type: String,
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
    price: {
      type: Number,
      // required: true
    },
    description: {
      type: String,
      // required: true
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
          if (this.ratingAllTimes > 0) {
            return this.ratingAllPoints / this.ratingAllTimes;
          } else {
            return 0
          }
        },
      },
    },
  }
);
const BookModel = mongoose.model("Book", BookSchema);

export default BookModel;
