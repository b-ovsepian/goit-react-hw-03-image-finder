import React, { useEffect } from "react";
import Styles from "./Modal.module.css";
import PropTypes from "prop-types";

const Modal = ({ onCloseModal, children }) => {
  // Pass useEffect a function
  useEffect(() => {
    // This gets called after every render, by default
    // (the first one, and every one after that)
    window.addEventListener("keydown", handleEsc);

    // If you want to implement componentWillUnmount,
    // return a function from here, and React will call
    // it prior to unmounting.
    return () => {
      console.log("unmounting...");
      window.removeEventListener("keydown", handleEsc);
    };
  });

  const handleEsc = (e) => {
    if (e.code === "Escape") {
      onCloseModal();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target.nodeName === "DIV") {
      onCloseModal();
    }
  };
  return (
    <>
      <div className={Styles.Overlay} onClick={handleBackdropClick}>
        <div className={Styles.Modal}>{children}</div>
      </div>
    </>
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
