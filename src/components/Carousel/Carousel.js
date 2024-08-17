import React from "react";

const Carousel = () => {
  return (
    <div className="carousel relative container mx-auto">
      <div className="carousel-inner relative overflow-hidden w-full">
        <input
          className="carousel-open"
          type="radio"
          id="carousel-1"
          name="carousel"
          aria-hidden="true"
          hidden
          defaultChecked
        />
        <div
          className="carousel-item absolute opacity-0"
          style={{ height: "50vh" }}
        >
          <div className="block h-full w-full bg-blue-500 text-white text-5xl text-center">
            Slide 1
          </div>
        </div>
        <input
          className="carousel-open"
          type="radio"
          id="carousel-2"
          name="carousel"
          aria-hidden="true"
          hidden
        />
        <div
          className="carousel-item absolute opacity-0"
          style={{ height: "50vh" }}
        >
          <div className="block h-full w-full bg-red-500 text-white text-5xl text-center">
            Slide 2
          </div>
        </div>
        <input
          className="carousel-open"
          type="radio"
          id="carousel-3"
          name="carousel"
          aria-hidden="true"
          hidden
        />
        <div
          className="carousel-item absolute opacity-0"
          style={{ height: "50vh" }}
        >
          <div className="block h-full w-full bg-green-500 text-white text-5xl text-center">
            Slide 3
          </div>
        </div>

        <label
          htmlFor="carousel-1"
          className="carousel-control prev control-1 bg-gray-800 text-white hover:bg-gray-700 absolute cursor-pointer hidden lg:block"
          style={{ marginTop: "-25px" }}
        >
          &#x3c;
        </label>
        <label
          htmlFor="carousel-2"
          className="carousel-control next control-1 bg-gray-800 text-white hover:bg-gray-700 absolute cursor-pointer hidden lg:block"
          style={{ marginTop: "-25px" }}
        >
          &#x3e;
        </label>

        <label
          htmlFor="carousel-2"
          className="carousel-control prev control-2 bg-gray-800 text-white hover:bg-gray-700 absolute cursor-pointer hidden lg:block"
          style={{ marginTop: "-25px" }}
        >
          &#x3c;
        </label>
        <label
          htmlFor="carousel-3"
          className="carousel-control next control-2 bg-gray-800 text-white hover:bg-gray-700 absolute cursor-pointer hidden lg:block"
          style={{ marginTop: "-25px" }}
        >
          &#x3e;
        </label>

        <label
          htmlFor="carousel-3"
          className="carousel-control prev control-3 bg-gray-800 text-white hover:bg-gray-700 absolute cursor-pointer hidden lg:block"
          style={{ marginTop: "-25px" }}
        >
          &#x3c;
        </label>
        <label
          htmlFor="carousel-1"
          className="carousel-control next control-3 bg-gray-800 text-white hover:bg-gray-700 absolute cursor-pointer hidden lg:block"
          style={{ marginTop: "-25px" }}
        >
          &#x3e;
        </label>
      </div>
    </div>
  );
};

export default Carousel;
