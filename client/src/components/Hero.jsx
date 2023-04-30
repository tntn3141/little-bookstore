import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Hero() {
    const navigate = useNavigate();

  return (
    <div className="flex flex-wrap mt-24">
      <div className="w-full md:w-[60%]">
        <Carousel
          autoPlay
          infiniteLoop
          emulateTouch
          showStatus={false}
          showThumbs={false}
        >
          <div className='cursor-pointer' onClick={() => navigate("/login")}>
            <img
              src="/assets/266524-P53SH3-817a.png"
              alt="to featured article 1"
            />
          </div>

          <div className='cursor-pointer' onClick={() => navigate("/register")}>
            <img src="/assets/266524-P53SH3-817b.png" alt="to featured article 2"/>
          </div>
        </Carousel>
      </div>

      <div className="flex md:flex-col md:w-[39%] mx-auto justify-between">
        <div className="min-w-[50%]">
          <Link to={"/login"}>
            <img src="/assets/5109069a.png" />
          </Link>
        </div>
        <div className="min-w-[50%]">
          <Link to={"/register"}>
            <img src="/assets/7913448.png" />
          </Link>
        </div>
      </div>
    </div>
  );
}
