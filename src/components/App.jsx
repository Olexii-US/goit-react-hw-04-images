import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppStyles } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export const App = () => {
  const [searchName, setSearchName] = useState('');

  const handleSearchSubmit = searchName => {
    setSearchName(searchName);
  };

  return (
    <AppStyles>
      <Searchbar onSearchSubmit={handleSearchSubmit} />
      <ToastContainer autoClose={4000} />
      <ImageGallery searchName={searchName} />
    </AppStyles>
  );
};

export default App;
