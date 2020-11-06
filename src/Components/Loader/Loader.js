import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Style from "./Loader.module.css";

const LoaderComponent = () => {
  return (
    <Loader
      type="ThreeDots"
      color="#3f51b5"
      height={80}
      width={80}
      className={Style.spiner}
    />
  );
};

export default LoaderComponent;
