import { BusinessModel } from "@api/business/types";
import {
  ArrowLeft,
  ArrowLeftRounded,
  ChevronLeft,
  ChevronLeftRounded,
  ChevronRight,
  Circle,
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
  SwipeLeftAltRounded,
  SwitchLeftRounded,
} from "@mui/icons-material";
import { CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import { Transition } from "react-transition-group";

type Props = {
  imagesSrc: Array<string>;
  businessName: string;
};

export default function ImageCarousel({ imagesSrc, businessName }: Props) {
  const [imageCarouselState, setImageCarouselState] = useState<number>(0);
  const imageIndices = Array.from({ length: imagesSrc.length }, (v, k) => k);
  const showingControls = " " + (imagesSrc.length > 1 ? "" : "hidden");

  const resetImageCarouselState = () => {
    setImageCarouselState(0);
    console.log("carousel reset");
  };

  const incrementCarouselState = () => {
    setImageCarouselState(
      imageCarouselState !== imageIndices.length - 1
        ? imageCarouselState + 1
        : 0
    );
  };

  const decrementCarouselState = () => {
    setImageCarouselState(
      imageCarouselState !== 0
        ? imageCarouselState - 1
        : imageIndices.length - 1
    );
  };

  const nextImageIndex = () => {
    return imageCarouselState === imageIndices.length - 1
      ? 0
      : imageCarouselState + 1;
  };

  useEffect(() => {
    resetImageCarouselState();
    console.log("useEffect called");
  }, [businessName]);

  {
    /* 
      TODO:
      - always show arrows on mobile
      - swipe-able on mobile
      - use ReactTransitionGroup to add a fade between images changing
      */
  }

  return (
    <div className="group relative text-white flex flex-row items-center justify-center">
      <div
        className={
          "absolute flex flex-row items-center inset-y-0 left-0 z-10 pl-2 w-1/4" +
          showingControls
        }
        onClick={() => decrementCarouselState()}
      >
        <button
          className="ease-in-out opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 bg-ukraine-blue text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
          onClick={() => decrementCarouselState()}
        >
          <KeyboardArrowLeftRounded />
        </button>
      </div>
      <div
        className={
          "absolute flex flex-row items-center justify-end inset-y-0 right-0 z-10 pr-2 w-1/4" +
          showingControls
        }
        onClick={() => incrementCarouselState()}
      >
        <button
          className="ease-in-out opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 bg-ukraine-blue text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
          onClick={() => incrementCarouselState()}
        >
          <KeyboardArrowRightRounded />
        </button>
      </div>
      <div
        className={
          "ease-in-out opacity-0 scale-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 absolute flex flex-row items-center justify-center bottom-0 h-1/12 z-10 py-2 w-1/4" +
          showingControls
        }
      >
        <div className="bg-ukraine-blue text-white rounded-full p-1 flex items-center justify-center scale-[0.7] shadow-lg">
          {imageIndices.map((i, index) => (
            <button
              className="flex items-center justify-center"
              onClick={() => setImageCarouselState(index)}
            >
              <div
                className={
                  "transition-all duration-300 flex items-center justify-center scale-[" +
                  (index === imageCarouselState ? "0.75" : "0.5") +
                  "]"
                }
              >
                <Circle fontSize="small" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-64 w-full">
        <CardMedia
          component="img"
          className="h-64 w-full opacity-0"
          image={imagesSrc[0]}
          alt={businessName}
        />

        {imagesSrc.map((img, key) => {
          return (
            <div className="absolute top-0 bottom-0 left-0 right-0">
              <CardMedia
                component="img"
                className={"transition-all duration-300 h-64 opacity-" + (key === imageCarouselState ? "100" : "0")}
                image={imagesSrc[key]}
                alt={businessName}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
