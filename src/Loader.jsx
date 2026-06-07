import React from "react";
import loaderVideo from "./assets/loader.mp4";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <video
        src={loaderVideo}
        autoPlay
        loop
        muted
        className="w-40 h-40 object-contain"
      />
    </div>
  );
};

export default Loader;