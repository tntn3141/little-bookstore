// import { Carousel } from "react-responsive-carousel";
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
    <Carousel responsive={responsive} containerClass="h-30">
      <div className="info-wrapper">
        <span className="info-name">Tags</span>
        <TagSVG className="h-6 w-6" />
        <span className="info-content">{data.tags.join(", ")}, Nonfiction</span>
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

// export default function BookInfo({ data }) {
//   console.log(data);

//   return (
//     <div className="w-[80%]">
//       <Carousel
//         emulateTouch
//         showStatus={false}
//         showThumbs={false}
//         infiniteLoop={true}
//         preventMovementUntilSwipeScrollTolerance={true}

//       >
// <div className="carousel-part-wrapper">
//   <div className="info-wrapper">
//     <span className="info-name">Tags</span>
//     <TagSVG className="h-6 w-6" />
//     <span className="info-content">
//       {data.tags.join(", ")}, Nonfiction
//     </span>
//   </div>
//   <div className="info-wrapper">
//     <span className="info-name">Pages</span>
//     <PageSVG />
//     <span className="info-content">{`${data.pages} pages`}</span>
//   </div>
//   <div className="info-wrapper">
//     <span className="info-name">Language</span>
//     <LanguageSVG />
//     <span className="info-content">{data.language}</span>
//   </div>
//   <div className="info-wrapper">
//     <span className="info-name">Format</span>
//     <BookSVG />
//     <span className="info-content">{data.format}</span>
//   </div>
// </div>
// <div className="carousel-part-wrapper">
//   <div className="info-wrapper">
//     <span className="info-name">Publisher</span>
//     <BuildingSVG />
//     <span className="info-content">{data.publisher}</span>
//   </div>
//   <div className="info-wrapper">
//     <span className="info-name">Publication Year</span>
//     <CalendarSVG />
//     <span className="info-content">{data.publicationYear}</span>
//   </div>
// </div>
//       </Carousel>
//     </div>
//   );
// }
