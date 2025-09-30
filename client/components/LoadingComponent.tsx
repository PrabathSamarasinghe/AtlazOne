import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LoadingComponent = () => {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[200px] p-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 max-w-[200px] max-h-[200px]">
        <DotLottieReact
          src="https://lottie.host/e047c307-602e-4f62-9cbe-e9ac6b69606d/MNHSSllGVz.lottie"
          loop
          autoplay
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default LoadingComponent;
