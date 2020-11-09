import React, { useState, useEffect } from "react";
import Loader from "./Components/Loader/Loader";
import Modal from "./Components/Modal/Modal";
import Error from "./Components/Error/Error";
import Searchbar from "./Components/Searchbar/Searchbar";
import InfiniteScroll from "react-infinite-scroll-component";
import { axiosImages } from "./Components/Services/Services";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const [imageModal, setImageModal] = useState({});

  useEffect(() => {
    if (!images.length && query && error) {
      setError("Images not found! Try again...");
    } else setError("");
  }, [images]);

  const handleSearchOnSubmit = () => {
    getImages();
    setPage(1);
    setImages([]);
  };
  const getImages = async () => {
    setLoader(true);
    try {
      const data = await axiosImages(query, page);
      setImages((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoader(false);
    }
  };

  const handleOpenModal = (obj) => {
    setModal(true);
    setImageModal(obj);
  };

  const handleCloseModal = (e) => {
    setModal(false);
    setImageModal(null);
  };
  return (
    <>
      <Searchbar
        onSubmit={handleSearchOnSubmit}
        query={query}
        setQuery={setQuery}
      />
      {modal && (
        <Modal onCloseModal={handleCloseModal}>
          <img src={imageModal.largeImageURL} alt={imageModal.tags} />
        </Modal>
      )}
      {!error && (
        <InfiniteScroll
          className="ImageGallery"
          dataLength={images.length}
          next={getImages}
          hasMore={true}
          scrollThreshold="50px"
          loader={loader && <Loader />}
        >
          {images.map((image) => {
            const {
              id,
              webformatURL,
              tags,
              webformatWidth,
              webformatHeight,
              largeImageURL,
            } = image;

            return (
              <div className="ImageGalleryItem" key={id}>
                <img
                  src={webformatURL}
                  alt={tags}
                  width={webformatWidth}
                  height={webformatHeight}
                  className="ImageGalleryItem-image"
                  onClick={() => {
                    handleOpenModal({ largeImageURL, tags });
                  }}
                />
              </div>
            );
          })}
        </InfiniteScroll>
      )}
      {error && (
        <Error>
          <h2>{error}</h2>
        </Error>
      )}
    </>
  );
};

export default App;
