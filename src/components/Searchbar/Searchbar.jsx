import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';

import * as styles from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchName: '',
  };

  static defaultProps = {
    onSearchSubmit: PropTypes.func.isRequired,
  };

  handleSearch = event => {
    this.setState({ searchName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchName.trim() === '') {
      return toast.warn('Please, enter a search parameter');
    }
    this.props.onSearchSubmit(this.state.searchName);
    // this.setState({ searchName: '' });
  };

  render() {
    const { searchName } = this.state;
    return (
      <styles.HeaderSearch>
        <styles.SearchForm onSubmit={this.handleSubmit}>
          <styles.SearchButton>
            <AiOutlineSearch style={{ width: '28px', height: '28px' }} />
          </styles.SearchButton>

          <styles.SearchInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchName}
            onChange={this.handleSearch}
          />
        </styles.SearchForm>
      </styles.HeaderSearch>
    );
  }
}

export default Searchbar;
