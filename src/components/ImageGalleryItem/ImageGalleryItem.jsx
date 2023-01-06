import React, { Component } from 'react';
import * as styles from './ImageGalleryItem.styled';
import Modal from '../Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    const { showModal } = this.state;
    return (
      <styles.ImageGalleryItem>
        <styles.GalleryImage
          src={webformatURL}
          alt={tags}
          onClick={this.toggleModal}
        />
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClose={this.toggleModal}
          />
        )}
      </styles.ImageGalleryItem>
    );
  }
}

export default ImageGalleryItem;
