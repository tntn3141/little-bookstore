import * as Yup from "yup";

export const bookInitialValues = {
  title: "",
  author: "",
  publicationYear: "",
  stock: 1,
  price: "",
  publisher: "",
  format: "",
  pages: "",
  tags: [],
  category: "",
  description: "",
  coverImage: "",
  ratingAllPoints: 0,
  ratingAllTimes: 0,
};

export const bookValidationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  author: Yup.string().required("Required"),
  publicationYear: Yup.number().positive().integer().required("Required"),
  price: Yup.number().positive().required("Required"),
  publisher: Yup.string().required("Required"),
  pages: Yup.number().positive().integer().required("Required"),
  stock: Yup.number().positive().integer().required("Required"),
  language: Yup.string().required("Required"),
  format: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  tags: Yup.array().min(1, "Select at least one tag").required("Required"),
  description: Yup.string().required("Required"),
  ratingAllPoints: Yup.number(),
  ratingAllTimes: Yup.number(),
  coverImage: Yup.mixed(),
});

// Meant for select
export const bookLanguages = [
  { key: "Choose one", value: "" },
  { key: "English", value: "English" },
  { key: "Vietnamese", value: "Vietnamese" },
  { key: "Others", value: "Others" },
];

// Meant for radio
export const bookFormats = [
  { key: "Paperback", value: "Paperback" },
  { key: "Hardcover", value: "Hardcover" },
];

// Meant for radio
export const bookCategories = [
  { key: "Fiction", value: "Fiction" },
  { key: "Nonfiction", value: "Nonfiction" },
];

// Meant for checkbox
export const bookTags = [
  { key: "Adventure", value: "Adventure" },
  { key: "Romance", value: "Romance" },
  { key: "Thriller", value: "Thriller" },
  { key: "Horror", value: "Horror" },
  { key: "Fantasy", value: "Fantasy" },
  { key: "Historical", value: "Historical" },
  { key: "Children", value: "Children" },
  { key: "Self-help", value: "Self-help" },
  { key: "Classic", value: "Classic" },
  { key: "Technology", value: "Technology" },
  { key: "Guide", value: "Guide" },
  { key: "Sci-fi", value: "Sci-fi" },
  { key: "Mystery", value: "Mystery" },
  { key: "Relationships", value: "Relationships" },
  { key: "Memoir", value: "Memoir" },
  { key: "Graphic Novel", value: "Graphic Novel" },
  { key: "Arts", value: "Arts" },
  { key: "Science", value: "Science" },
];

// Values should be mapped to objects for mongodb as follows:
// 1: { $lte: 200000 }
// 2: { $gte: 200000, $lte: 400000 }
// 3: { $gte: 400000, $lte: 600000 }
// 4: { $gte: 600000 }

export const bookPriceRanges = [
  { key: "Any", value: 0 },
  { key: "< 200,000 VND", value: 1 },
  {
    key: "200,000 - 400,000 VND",
    value: 2,
  },
  {
    key: "400,000 - 600,000 VND",
    value: 3,
  },
  { key: "> 600,000 VND", value: 4 },
];
