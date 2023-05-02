import * as Yup from "yup";

// To be imported by BookRegistrationForm

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
  { key: "Contemporary", value: "Contemporary" },
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
];

// Meant for price range in search/filter
// The quote syntax of values should be ' "example": 123 ' 
// so that JSON.parse works properly
export const bookPriceRanges = [
  { key: "Any", value: "" },
  { key: "< 200,000 VND", value: '{ "$lt": 200000 }' },
  {
    key: "200,000 - 400,000 VND",
    value: '{ "$gte": 200000, "$lte": 400000 }',
  },
  {
    key: "400,000 - 600,000 VND",
    value: '{ "$gte": 400000, "$lte": 600000 }',
  },
  { key: "> 600,000 VND", value: '{ "$gt": 600000 }' },
];
