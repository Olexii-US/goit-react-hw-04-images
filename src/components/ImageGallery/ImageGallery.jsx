import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { UlImageGallery, Notification } from './ImageGallery.styled';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

export const ImageGallery = ({ searchName }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [prevName, setPrevName] = useState('');

  useEffect(() => {
    if (searchName !== '') {
      const fetchImages = () => {
        const BASE_URL = 'https://pixabay.com/api/';
        const searchParams = new URLSearchParams({
          key: '31443805-4c85089cebd86174cba4b6646',
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: 12,
        });

        fetch(`${BASE_URL}?q=${searchName}&page=${page}&${searchParams}`)
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
            setImages(prevImages => prevImages.concat(filteredData));
            setTotalHits(data.totalHits);
          })
          .catch(error => toast.error('Page not found', error))
          .finally(() => setLoading(false));
      };
      if (searchName !== prevName && page > 1) {
        setImages([]);
        setLoading(true);
        setPage(1);
      } else if (searchName !== prevName) {
        setImages([]);
        setLoading(true);
        setPage(1);
        setPrevName(searchName);
        return fetchImages();
      } else if (searchName === prevName && page > 1) {
        setLoading(true);
        fetchImages();
      }
    }
  }, [page, prevName, searchName]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

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
        <Button onLoadMoreClick={loadMore} />
      )}
      {loading && <Loader />}
    </>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  searchName: PropTypes.string.isRequired,
};
