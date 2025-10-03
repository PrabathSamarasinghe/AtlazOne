import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LoadingComponent = () => {
  return (
    <div className="w-32 h-32 flex items-center justify-center">
      <DotLottieReact
        src="https://lottie.host/e047c307-602e-4f62-9cbe-e9ac6b69606d/MNHSSllGVz.lottie"
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default LoadingComponent;
