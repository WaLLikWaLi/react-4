import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Audio } from "react-loader-spinner";
import axios from "axios";
import Modal from "react-modal";
import React from "react";

import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
// import ImageModal from "../ImageModal/ImageModal";
// import Loader from "../Loader/Loader";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export default function App() {
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(1);
  const [param, setParam] = useState("");
  const [images, setImages] = useState([]);
  const [getingimages, setGetingimages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    openModal();
  };
  const handleSearch = (newParam) => {
    setParam(newParam);
    setImages([]);
    setGetingimages([]);
    setPages(1);
  };
  useEffect(() => {
    async function getImages() {
      setLoading(true);

      const response = await axios.get(
        "https://api.unsplash.com/search/photos?client_id=847LMTn4ciMpRzeKAoB3Sa9yC23UuMOxHbsd7mecpco",
        {
          params: {
            page: pages,
            query: param,
            orientation: "landscape",
          },
        }
      );
      setImages(response.data.results);
      setLoading(false);
    }
    getImages();
  }, [pages, param]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar setParam={handleSearch} />
      <ImageGallery
        onHandleImageClick={handleImageClick}
        getingimages={getingimages}
        images={images}
      />
      <Audio
        visible={loading}
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
      <LoadMoreButton
        setLoading={setLoading}
        setGetingimages={setGetingimages}
        setPages={setPages}
        pages={pages}
        getingimages={getingimages}
        images={images}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}>
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Large Image"
            style={{ width: "70vw", height: "90vh", objectFit: "contain" }}
          />
        )}
      </Modal>
    </div>
  );
}
