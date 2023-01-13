import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyles } from './Modal.styled';
const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImageURL, tags, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    console.log('eskape addddd');

    return () => {
      window.removeEventListener('keydown', handleEscape);
      console.log('eskape removvvvvweeee');
    };
  }, []);

  const handleEscape = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <Overlay onClick={handleBackdrop}>
      <ModalStyles>
        <img src={largeImageURL} alt={tags} />
      </ModalStyles>
    </Overlay>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

// export class Modal extends Component {
//   // static defaultProps = {
//   //   largeImageURL: PropTypes.string.isRequired,
//   //   tags: PropTypes.string.isRequired,
//   //   onClose: PropTypes.func.isRequired,
//   // };

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleEscape);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleEscape);
//   }

//   // handleEscape = e => {
//   //   if (e.code === 'Escape') {
//   //     this.props.onClose();
//   //   }
//   // };

//   // handleBackdrop = e => {
//   //   if (e.target === e.currentTarget) {
//   //     this.props.onClose();
//   //   }
//   // };

//   // render() {
//   //   const { largeImageURL, tags } = this.props;
//   //   return createPortal(
//   //     <Overlay onClick={this.handleBackdrop}>
//   //       <ModalStyles>
//   //         <img src={largeImageURL} alt={tags} />
//   //       </ModalStyles>
//   //     </Overlay>,
//   //     modalRoot
//   //   );
//   // }
// }
