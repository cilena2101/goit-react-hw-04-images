import { useEffect } from "react";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const ModalRoot = document.querySelector("#ModalRoot");

export const Modal = ({ onClose, image }) => {
  useEffect(() => {
    const keyDown = (evt) => {
      if (evt.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", keyDown);

    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  }, [onClose]);

  const onModalClose = (evt) => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  const { largeImageURL } = image;
  return createPortal(
    <div onClick={onModalClose} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="img" />
      </div>
    </div>,
    ModalRoot
  );
};

Modal.propTypes = {
  image: PropTypes.object,
  onClose: PropTypes.func,
};
