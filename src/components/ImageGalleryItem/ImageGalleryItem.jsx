import * as styles from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  return (
    <styles.ImageGalleryItem>
      <styles.GalleryImage src={webformatURL} alt={tags} />
    </styles.ImageGalleryItem>
  );
};

export default ImageGalleryItem;
