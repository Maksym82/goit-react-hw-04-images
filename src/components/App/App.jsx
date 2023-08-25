import { useState, useEffect } from 'react';
import fetchImages from '../../services/api';
import { Container } from './App.styled';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import Notiflix from 'notiflix';


export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');


  const openModal = id => {
    setIsLoading(true);
    const largeImage = images.find(image => image.id === id);

    setTimeout(() => {
      setLargeImage(largeImage.largeImageURL);
      setIsLoading(false);
      setShowModal(true);
    }, 500);
    window.addEventListener('keydown', handleKeyDown);
  };

  

  const deleteEventList = () => {
    setShowModal(false);
    window.removeEventListener('keydown', handleKeyDown);
  };

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      deleteEventList;
    }
  };

  const onClickBackdrop = event => {
    if (event.currentTarget === event.target) {
      deleteEventList;
    }
  }




  render() {
    const {
      images,
      query,
      page,
      totalPages,
      isLoading,
      showModal,
      largeImageURL,
    } = this.state;

    return (
      <Container>
        {isLoading && <Loader />}
        <Searchbar onSubmit={this.handleSubmit} />
        {query !== '' && (
          <>
            <ImageGallery images={images} openModal={this.openModal} />
            {page < totalPages && <Button onClick={this.buttonOnClick} />}
          </>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={query} />
          </Modal>
        )}
      </Container>
    );
  }
}


