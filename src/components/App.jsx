import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import css from "./App.module.css";
import ImageGallery from "./ImageGallery/ImageGallery";
import { fetchImages } from "./fetchImages/fetchImages";
import { Searchbar } from "./Searchbar/Searchbar";
import { Loader } from "./Loader/Loader";
import { Button } from "./Button/Button";

let page = 1;
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

export default function App () {
  const [images, setImages] = useState([]);
  const [inputName, setInputName] = useState("");
  const [status, setStatus] = useState(Status.IDLE);
  const [totalHits, setTotalHits] = useState(0);

  const handleSubmit = async (inputName) => {
    page = 1;
    if (inputName.trim() === "") {
      return toast("Please enter your request");
    } else {
      try {
        setStatus(Status.PENDING);
        const { totalHits, hits } = await fetchImages(inputName, page);
        if (hits.length < 1) {
          setStatus(Status.IDLE);
          return toast("There are no images matching your request.");
        } else {
          setImages(hits);
          setInputName(inputName);
          setTotalHits(totalHits);
          setStatus(Status.RESOLVED);
        }
      } catch (error) {
        setStatus(Status.REJECTED);
      }
    }
  };

  const onNextPage = async () => {
    setStatus(Status.PENDING);

    try {
      const { hits } = await fetchImages(inputName, (page += 1));
      setImages((prevState) => [...prevState, ...hits]);
      setStatus(Status.RESOLVED);
    } catch (error) {
      setStatus(Status.REJECTED);
    }
  };

  if (status === Status.IDLE) {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={handleSubmit} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
  if (status === Status.PENDING) {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery page={page} images={images} />
        <Loader />
        {totalHits > 12 && <Button onClick={onNextPage} />}
      </div>
    );
  }
  if (status === Status.REJECTED) {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={handleSubmit} />
        <p>Please try again later.</p>
      </div>
    );
  }
  if (status === Status.RESOLVED) {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery page={page} images={images} />
        {totalHits > 12 && totalHits > images.length && (
          <Button onClick={onNextPage} />
        )}
      </div>
    );
  }
};