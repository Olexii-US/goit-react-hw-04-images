import PropTypes from 'prop-types';
import { LoadButton } from './Button.styled';

export const Button = ({ onLoadMoreClick }) => {
  return (
    <LoadButton type="button" onClick={onLoadMoreClick}>
      Load more
    </LoadButton>
  );
};

export default Button;

Button.propTypes = {
  onLoadMoreClick: PropTypes.func.isRequired,
};
