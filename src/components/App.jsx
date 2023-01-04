import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchName: '',
  };

  handleSearchSubmit = searchName => {
    this.setState({ searchName });
  };

  render() {
    return (
      <div>
        <Searchbar onSearchSubmit={this.handleSearchSubmit} />
        <ToastContainer autoClose={4000} />
        <ImageGallery searchName={this.state.searchName} />
      </div>
    );
  }
}

export default App;
