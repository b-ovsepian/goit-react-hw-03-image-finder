import React from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Styles from "./ImageGallery.module.css";
import PropTypes from "prop-types";

const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <ul className={Styles.ImageGallery}>
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          data={image}
          onOpenModal={onOpenModal}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
