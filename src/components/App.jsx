import { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import css from "./App.module.css";
import ImageGallery from "./ImageGallery/ImageGallery";
import {fetchImages } from "./fetchImages/fetchImages";
import {Searchbar} from "./Searchbar/Searchbar";
import {Loader} from "./Loader/Loader";
import { Button } from "./Button/Button";

let page = 1;

export default class App extends Component {
  state = {
    images: [],
    inputName: "",

    status: "idle",   
    totalHits: 0,
  };
  handleSubmit = async (inputName) => {
    if (inputName.trim() === "") {
      return toast("Please enter your request");
    } else {
      try {
        this.setState({ status: "pending" });
        const { totalHits, hits } = await fetchImages(inputName, page);
        if (hits.length < 1) {
          this.setState({ status: "idle" });
          return toast("There are no images matching your request.");        
        } else {
          this.setState({
            images: hits,
            inputName,
            totalHits: totalHits,
            status: "resolved",
          });
        }
      } catch (error) {
        this.setState({ status: "rejected" });
      }
    }
  };

  onNextPage = async () => {
    this.setState({ status: "pending" });

    try {
      const { hits } = await fetchImages(this.state.inputName, (page += 1));
      this.setState((prevState) => ({
        images: [...prevState.images, ...hits],
        status: "resolved",
      }));
    } catch (error) {
      this.setState({ status: "rejected" });
    }
  };
  
  render() {
    const { totalHits,  images, status } = this.state;
    if (status === "idle") {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.handleSubmit} />
          <ToastContainer autoClose={3000} />
        </div>
      );
    }
    if (status === "pending") {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page}  images={this.state.images} />
          <Loader />
          {totalHits > 12 && <Button onClick={this.onNextPage} />}
        </div>
      );
    }
    if (status === "rejected") {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.handleSubmit} />
          <p>Please try again later.</p>
        </div>
      );
    }
    if (status === "resolved") {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} images={this.state.images} />
          {totalHits > 12 && totalHits > images.length && (
            <Button onClick={this.onNextPage} />
          )}
        </div>
      );
    } 
  }      
}