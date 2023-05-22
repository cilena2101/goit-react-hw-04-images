import { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    shownModal: false,
  };

  onModal = () => {
    this.setState(({ shownModal }) => ({ shownModal: !shownModal }));
  };

  render() {
    const { image } = this.props;
    const { webformatURL } =image;
    return (
      <li className={css.ImageGalleryItem}>
        <img
          onClick={this.onModal}
          className={css.ImageGalleryItem__image}
          src={webformatURL}
          alt="img"
        />
        {this.state.shownModal && <Modal onClose={this.onModal} image={image} />}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
};