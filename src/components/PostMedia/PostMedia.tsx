import React, { JSX } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/bundle";
import { Pagination } from "swiper/modules";
import Image from "next/image";

const PostMedia = ({ postMedia }: { postMedia: string[] }): JSX.Element => {
  return (
    <Swiper
      spaceBetween={30}
      modules={[Pagination]}
      pagination={{
        clickable: true,
      }}
      className="mySwiper"
    >
      {postMedia.map((media: string, id: number) => (
        <SwiperSlide
          key={id}
          className="max-h-[300px] w-full h-full object-cover flex items-center justify-center"
        >
          <Image
            src={media}
            className="h-full object-contain m-auto"
            alt="media"
            height={400}
            width={800}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PostMedia;
