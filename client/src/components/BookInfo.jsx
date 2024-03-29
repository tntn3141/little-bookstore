import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import {
  BookSVG,
  PageSVG,
  CalendarSVG,
  TagSVG,
  BuildingSVG,
  LanguageSVG,
} from "../assets/svg";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 4,
  },
  smalltablet: {
    breakpoint: { max: 768, min: 640 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 2,
  },
};

export default function BookInfo({ data }) {
  return (
    <Carousel
      responsive={responsive}
      containerClass="h-30 border-t border-b border-gray-600"
    >
      <div className="info-wrapper">
        <span className="info-name">Tags</span>
        <TagSVG className="h-6 w-6" />
        <span className="info-content">
          {data.category}, {data.tags.join(", ")}
        </span>
      </div>
      <div className="info-wrapper">
        <span className="info-name">Pages</span>
        <PageSVG />
        <span className="info-content">{`${data.pages} pages`}</span>
      </div>
      <div className="info-wrapper">
        <span className="info-name">Language</span>
        <LanguageSVG />
        <span className="info-content">{data.language}</span>
      </div>
      <div className="info-wrapper">
        <span className="info-name">Format</span>
        <BookSVG />
        <span className="info-content">{data.format}</span>
      </div>

      <div className="info-wrapper">
        <span className="info-name">Publisher</span>
        <BuildingSVG />
        <span className="info-content">{data.publisher}</span>
      </div>
      <div className="info-wrapper">
        <span className="info-name">Publication Year</span>
        <CalendarSVG />
        <span className="info-content">{data.publicationYear}</span>
      </div>
    </Carousel>
  );
}
