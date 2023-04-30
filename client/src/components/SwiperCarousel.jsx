import { Swiper as SwiperComponent } from "swiper/react";
import { SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

export default function SwiperCarousel(props) {
  const { items } = props;

  return (
    <SwiperComponent
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {items.map((item) => (
        <SwiperSlide key={item._id}>
          <div>
            <img src={item.coverImage} alt="cover image" width="100" />
            <p>{item.title}</p>
            <p>{item.price}</p>
          </div>
        </SwiperSlide>
      ))}
    </SwiperComponent>
  );
}
