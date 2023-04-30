import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function SubmitBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [stock, setStock] = useState(1);
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [publisher, setPublisher] = useState("");

  const [fiction, setFiction] = use

  const [formatChecked, setFormatedChecked] = useState(false);
  const [isMainGenreChecked, setMainGenreChecked] = useState();

  async function handleBookSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("/submit"),
        {
          title,
          author,
          publicationYear,
          stock,
          price,
          originalPrice,
          publisher,
        };
    } catch (e) {
      alert("Submission failed.");
    }
  }

  return (
    <div>
      <form
        action=""
        className="flex flex-col text-xl md:text-xl ml-[2%] mt-[2%] gap-2"
      >
        <h1 className="text-4xl mx-auto">Book Submission</h1>

        <label htmlFor="title">Book title</label>
        <input
          className="submit-form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          type="text"
          placeholder="Title..."
        />

        <label htmlFor="author">Author</label>
        <input
          className="submit-form-input"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          id="author"
          type="text"
          placeholder="Author name..."
        />

        <label htmlFor="publisher">Publisher</label>
        <input
          className="submit-form-input"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          id="publisher"
          type="text"
          placeholder="Publisher name..."
        />

        <div className="flex gap-[10%] items-center">
          <p>Format</p>
          <div className="flex gap-[5%]">
            <label htmlFor="paperback" className="submit-form-radio">Paperback</label>
            <input
              id="paperback"
              type="radio"
              name="format"
              required
              className="appearance-none"
              onChange={(e) => {
                
                console.log('paperback chosen');
              }}
            />
          </div>
          <div className="flex gap-[5%]">
            <label htmlFor="hardcover" className="submit-form-radio">Hardcover</label>
            <input
              id="hardcover"
              type="radio"
              name="format"
              className="appearance-none"
              required
              onChange={(e) => {console.log('hardcover chosen')}}
            />
          </div>
        </div>

        <label htmlFor="price">Price</label>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          id="price"
          type="text"
          placeholder="Price (unit: $)..."
        />

        <label htmlFor="original-price">Original price</label>
        <input
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
          id="original-price"
          type="text"
          placeholder="Price (unit: $)..."
        />

        <label htmlFor="publication-year">Publication year</label>
        <input
          value={publicationYear}
          onChange={(e) => setPublicationYear(e.target.value)}
          id="publication-year"
          type="text"
          placeholder="Year..."
        />
        <label htmlFor="stock">Amount of copies</label>
        <input
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          id="stock"
          type="text"
          placeholder="Stock"
        />

        <p>Cover</p>
        <div className="flex gap-2">
          <input type="text" placeholder="Add photos by using links (.jpg)" />
          <button className="primary">Add photo</button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
          <button className="border bg-transparent rounded-xl mb-10 p-8 justify-center items-center flex">
            Upload
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
              />
            </svg>
          </button>
        </div>

        <div>
          <span>Genres</span>
          <div>
            <label htmlFor="fiction">Fiction</label>
            <input
              id="fiction"
              name="main_genre"
              type="radio"
              onChange={(e) => console.log(e.target.id)}
            />
            <label htmlFor="non-fiction">Nonfiction</label>
            <input
              id="nonfiction"
              name="main_genre"
              type="radio"
              onChange={(e) => console.log(e.target.id)}
            />
          </div>
          {true && (
            <div>
              <label htmlFor="action-adventure">Action & Adventure</label>
              <input type="checkbox" className="checked:bg-blue-500" />
              <label htmlFor="fantasy">Fantasy</label>
              <input type="checkbox" />
              <label htmlFor="science-fiction">Science fiction</label>
              <input type="checkbox" />
              <label htmlFor="thriller-suspense">Thriller & Suspense</label>
              <input type="checkbox" />
              <label htmlFor="children">Children</label>
              <input type="checkbox" />
              <label htmlFor="romance">Romance</label>
              <input type="checkbox" />
              <label htmlFor="horror">Horror</label>
              <input type="checkbox" />
              <label htmlFor="contemporary">Contemporary</label>
              <input type="checkbox" />
            </div>
          )}
          {true && (
            <div>
              <label htmlFor="memoir-autobiography">
                Memoir & Autobiography
              </label>
              <input type="checkbox" />
              <label htmlFor="travel">Travel</label>
              <input type="checkbox" />
              <label htmlFor="humanities-social-sciences">
                Humanities & Social Sciences
              </label>
              <input type="checkbox" />
              <label htmlFor="art-photography">Art & Photography</label>
              <input type="checkbox" />
              <label htmlFor="self-help">Self-help</label>
              <input type="checkbox" />
              <label htmlFor="history">History</label>
              <input type="checkbox" />
              <label htmlFor="science-technology">Science & Technology</label>
              <input type="checkbox" />
              <label htmlFor="children">Children</label>
              <input type="checkbox" />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
