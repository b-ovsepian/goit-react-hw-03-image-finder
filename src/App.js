import React, { useState } from "react";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Loader from "./Components/Loader/Loader";
import Modal from "./Components/Modal/Modal";
import Error from "./Components/Error/Error";
import Searchbar from "./Components/Searchbar/Searchbar";
import InfiniteScroll from "react-infinite-scroll-component";
import { axiosImages } from "./Components/Services/Services";

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");
  const [imageModal, setImageModal] = useState({});

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
      if (data.length < 1) {
        setError("Images not found! Try again...");
      } else setError("");
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
          dataLength={images.length}
          next={getImages}
          hasMore={true}
          scrollThreshold={0.8}
          loader={loader && <Loader />}
        >
          <ImageGallery images={images} onOpenModal={handleOpenModal} />
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
