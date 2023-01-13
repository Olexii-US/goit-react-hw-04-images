import { useState } from 'react';
import PropTypes from 'prop-types';
import * as styles from './ImageGalleryItem.styled';
import Modal from '../Modal/Modal';

///////////////////PureComponent;///////

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <styles.ImageGalleryItem>
      <styles.GalleryImage
        src={webformatURL}
        alt={tags}
        onClick={toggleModal}
      />
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          tags={tags}
          onClose={toggleModal}
        />
      )}
    </styles.ImageGalleryItem>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

// export class ImageGalleryItem extends PureComponent {
//   // state = {
//   //   showModal: false,
//   // };

//   // static defaultProps = {
//   //   webformatURL: PropTypes.string.isRequired,
//   //   largeImageURL: PropTypes.string.isRequired,
//   //   tags: PropTypes.string.isRequired,
//   // };

//   toggleModal = () => {
//     this.setState(state => ({ showModal: !state.showModal }));
//   };

//   render() {
//     const { webformatURL, largeImageURL, tags } = this.props;
//     const { showModal } = this.state;
//     return (
//       <styles.ImageGalleryItem>
//         <styles.GalleryImage
//           src={webformatURL}
//           alt={tags}
//           onClick={this.toggleModal}
//         />
//         {showModal && (
//           <Modal
//             largeImageURL={largeImageURL}
//             tags={tags}
//             onClose={this.toggleModal}
//           />
//         )}
//       </styles.ImageGalleryItem>
//     );
//   }
// }
