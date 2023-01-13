import { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';

import * as styles from './Searchbar.styled';

export const Searchbar = ({ onSearchSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleSearch = event => {
    setSearchName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchName.trim() === '') {
      return toast.warn('Please, enter a search parameter');
    }
    onSearchSubmit(searchName);
    // this.setState({ searchName: '' });
  };

  return (
    <styles.HeaderSearch>
      <styles.SearchForm onSubmit={handleSubmit}>
        <styles.SearchButton>
          <AiOutlineSearch style={{ width: '28px', height: '28px' }} />
        </styles.SearchButton>

        <styles.SearchInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchName}
          onChange={handleSearch}
        />
      </styles.SearchForm>
    </styles.HeaderSearch>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
};

// export class Searchbar extends Component {
//   state = {
//     searchName: '',
//   };

//   static defaultProps = {
//     onSearchSubmit: PropTypes.func.isRequired,
//   };

//   handleSearch = event => {
//     this.setState({ searchName: event.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     if (this.state.searchName.trim() === '') {
//       return toast.warn('Please, enter a search parameter');
//     }
//     this.props.onSearchSubmit(this.state.searchName);
//     // this.setState({ searchName: '' });
//   };

//   // render() {
//   //   const { searchName } = this.state;
//   //   return (
//   //     <styles.HeaderSearch>
//   //       <styles.SearchForm onSubmit={this.handleSubmit}>
//   //         <styles.SearchButton>
//   //           <AiOutlineSearch style={{ width: '28px', height: '28px' }} />
//   //         </styles.SearchButton>

//   //         <styles.SearchInput
//   //           type="text"
//   //           autocomplete="off"
//   //           autoFocus
//   //           placeholder="Search images and photos"
//   //           value={searchName}
//   //           onChange={this.handleSearch}
//   //         />
//   //       </styles.SearchForm>
//   //     </styles.HeaderSearch>
//   //   );
//   // }
// }
