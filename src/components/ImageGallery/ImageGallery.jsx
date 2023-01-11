import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { UlImageGallery, Notification } from './ImageGallery.styled';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

export class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    page: 1,
    totalHits: 0,
  };

  static defaultProps = {
    searchName: PropTypes.string.isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchName;
    const nextName = this.props.searchName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName && prevPage > 1) {
      this.setState({ images: [], loading: true, page: 1 });
    } else if (prevName !== nextName) {
      this.setState({ images: [], loading: true, page: 1 });
      return this.fetchImages();
    } else if (prevName === nextName && prevPage !== nextPage) {
      this.setState({ loading: true });
      return this.fetchImages();
    }
  }

  fetchImages = () => {
    const BASE_URL = 'https://pixabay.com/api/';
    const searchParams = new URLSearchParams({
      key: '31443805-4c85089cebd86174cba4b6646',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    });
    const nextName = this.props.searchName;
    const nextPage = this.state.page;

    fetch(`${BASE_URL}?q=${nextName}&page=${nextPage}&${searchParams}`)
      .then(res => res.json())
      .then(data => {
        if (data.totalHits === 0) {
          toast.warn('There is no such search results :(');
        }

        const filteredData = data.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );

        this.setState(prevState => ({
          images: prevState.images.concat(filteredData),
          loading: false,
          totalHits: data.totalHits,
        }));
      })
      .catch(error => toast.error('Page not found', error))
      .finally(this.setState({ loading: false }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, loading, totalHits } = this.state;
    return (
      <>
        {!loading && !images.length && (
          <Notification>Please, enter a search parameter!</Notification>
        )}
        <UlImageGallery>
          {images &&
            images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
              />
            ))}
        </UlImageGallery>
        {!loading && images.length > 0 && totalHits > images.length && (
          <Button onLoadMoreClick={this.loadMore} />
        )}
        {loading && <Loader />}
      </>
    );
  }
}

export default ImageGallery;
