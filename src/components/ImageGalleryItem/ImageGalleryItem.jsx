import { useState } from "react";
import css from "./ImageGalleryItem.module.css";
import { Modal } from "../Modal/Modal";
import PropTypes from "prop-types";

export const ImageGalleryItem = ({ image }) => {
  const [shownModal, setShowModal] = useState(false);
  const onModal = () => {
    setShowModal((prefState) => !prefState);
  };

  const { webformatURL } = image;
  return (
    <li className={css.ImageGalleryItem}>
      <img
        onClick={onModal}
        className={css.ImageGalleryItem__image}
        src={webformatURL}
        alt="img"
      />
      {shownModal && <Modal onClose={onModal} image={image} />}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
};