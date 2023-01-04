import React, { Component } from 'react';
import { toast } from 'react-toastify';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { UlImageGallery } from './ImageGallery.styled';
import Loader from '../Loader/Loader';

export class ImageGallery extends Component {
  state = {
    images: null,
    status: 'idle',
    // error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const BASE_URL = 'https://pixabay.com/api/';
    const searchParams = new URLSearchParams({
      key: '31443805-4c85089cebd86174cba4b6646',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    });
    const prevName = prevProps.searchName;
    const nextName = this.props.searchName;

    if (prevName !== nextName) {
      this.setState({ status: 'pending' });

      setTimeout(() => {
        fetch(`${BASE_URL}?q=${nextName}&page=1&${searchParams}`)
          .then(res => res.json())
          .then(data => {
            if (data.totalHits === 0) {
              toast.warn('There is no such search results :(');
              return this.setState({ status: 'idle' });
            }
            this.setState({ images: data.hits, status: 'resolved' });
          })
          .catch(error => toast.error('Page not found', error));
      }, 1000);
    }
  }

  render() {
    const { images, status } = this.state;
    console.log('this.state.images', images);

    if (status === 'idle') {
      return <div>Please, enter a search parameter!</div>;
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'resolved') {
      return (
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
