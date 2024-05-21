import React from "react";
import { register } from "swiper/element/bundle";
import Slide from "./Slide";
register();

const Slider = () => {
  return (
    <swiper-container
      slides-per-view="1"
      navigation="true"
      pagination="false"
      loop={true}
    >
      <swiper-slide>
        <Slide />
      </swiper-slide>
      <swiper-slide>
        <Slide />
      </swiper-slide>
      <swiper-slide>
        <Slide />
      </swiper-slide>
    </swiper-container>
  );
};

export default Slider;
