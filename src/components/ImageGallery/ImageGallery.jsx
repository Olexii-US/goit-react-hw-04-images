import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { UlImageGallery } from './ImageGallery.styled';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

export class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
    page: 1,
    totalHits: 0,
  };

  static defaultProps = {
    searchName: PropTypes.string.isRequired,
  };
  // ///////////////
  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   // Чи додаємо ми нові позиції у список?
  //   // Захоплюємо позицію прокрутки, щоб можна було налаштувати прокрутку пізніше.
  //   if (prevState.images.length < this.state.images.length) {
  //     const images = this.state.listRef.current;
  //     return images.scrollHeight - images.scrollTop;
  //   }
  //   return null;
  // }
  //   if (snapshot !== null) {
  //   const images = this.state.listRef.current;
  //   images.scrollTop = images.scrollHeight - snapshot;
  // }
  // ////////////////
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchName;
    const nextName = this.props.searchName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName && prevPage > 1) {
      this.setState({ images: [], status: 'pending', page: 1 });
    } else if (prevName !== nextName) {
      this.setState({ images: [], status: 'pending', page: 1 });
      return this.fetchImages();
    } else if (prevName === nextName && prevPage !== nextPage) {
      this.setState({ status: 'pending' });
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

    setTimeout(() => {
      fetch(`${BASE_URL}?q=${nextName}&page=${nextPage}&${searchParams}`)
        .then(res => res.json())
        .then(data => {
          if (data.totalHits === 0) {
            toast.warn('There is no such search results :(');
            return this.setState({ status: 'idle' });
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
            status: 'resolved',
            totalHits: data.totalHits,
          }));
        })
        .catch(error => toast.error('Page not found', error));
    }, 1000);
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, status, totalHits } = this.state;

    if (status === 'idle') {
      return <div>Please, enter a search parameter!</div>;
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'resolved') {
      return (
        <>
          <UlImageGallery>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
              />
            ))}
          </UlImageGallery>
          {totalHits > images.length && (
            <Button onLoadMoreClick={this.loadMore} />
          )}
        </>
      );
    }

    // return (
    //   <div>
    //     {loading && <div>Loading...</div>}
    //     {!images && <div>Please, enter a search parameter!</div>}
    //     <ul>
    //       {images &&
    //         images.map(({ id, webformatURL, largeImageURL, tags }) => (
    //           <ImageGalleryItem
    //             key={id}
    //             webformatURL={webformatURL}
    //             largeImageURL={largeImageURL}
    //             tags={tags}
    //           />
    //         ))}
    //     </ul>
    //   </div>
    // );
  }
}

export default ImageGallery;
