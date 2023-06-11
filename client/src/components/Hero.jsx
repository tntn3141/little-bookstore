import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap mt-24 w-[90%] mx-auto">
      <div className="w-full md:w-[60%]">
        <Carousel
          autoPlay
          infiniteLoop
          emulateTouch
          showStatus={false}
          showThumbs={false}
          showIndicators={false}
        >
          <div className="cursor-pointer" onClick={() => navigate("/login")}>
            <img
              src="/assets/world-book-day1-960.webp"
              srcSet="
              /assets/world-book-day1-640.webp 640w,
              /assets/world-book-day1-360.webp 360w
              "
              alt="to featured article 1"
              width="100%"
            />
          </div>

          <div className="cursor-pointer" onClick={() => navigate("/register")}>
            <img
              src="/assets/world-book-day2-960.webp"
              srcSet="
              /assets/world-book-day2-640.webp 640w,
              /assets/world-book-day2-360.webp 360w
              "
              alt="to featured article 2"
              width="100%"
            />
          </div>
        </Carousel>
      </div>

      <div className="flex md:flex-col md:w-[39%] mx-auto justify-between">
        <div className="min-w-[50%]">
          <Link to={"/login"}>
            <img
              src="/assets/world-book-day-small1-480.webp"
              srcSet="/assets/world-book-day-small1-360.webp 640w"
              alt="to feature article 3"
              width="100%"
            />
          </Link>
        </div>
        <div className="min-w-[50%]">
          <Link to={"/register"}>
            <img
              src="/assets/book-sale-480.webp"
              srcSet="/assets/book-sale-360.webp 640w"
              alt="to feature article 4"
              width="100%"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
