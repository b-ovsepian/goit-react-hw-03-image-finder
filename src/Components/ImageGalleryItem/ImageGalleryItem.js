import React from "react";
import Styles from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";

const ImageGalleryItem = ({ data, onOpenModal }) => {
  const {
    webformatURL,
    webformatWidth,
    webformatHeight,
    largeImageURL,
    tags,
  } = data;
  return (
    <li className={Styles.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        width={webformatWidth}
        height={webformatHeight}
        className={Styles["ImageGalleryItem-image"]}
        onClick={() => {
          onOpenModal({ largeImageURL, tags });
        }}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  data: PropTypes.shape({
    webformatURL: PropTypes.string,
    webformatWidth: PropTypes.number,
    webformatHeight: PropTypes.number,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
