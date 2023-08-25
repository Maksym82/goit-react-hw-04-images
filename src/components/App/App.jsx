import { useState, useEffect } from 'react';
import fetchImages from '../../services/api';
import { Container } from './App.styled';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import Notiflix from 'notiflix';

export  function App() {
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
  };

  const fetch = async (query, page) => {
    setIsLoading(true);
    const { totalHits, hits } = await fetchImages(query, page);
    const pageCount = totalHits / 12;
    setTotalPages(pageCount);
    return hits;
  };

  const handleSubmit = q => {
    setImages([]);
    setQuery(q);
    setPage(1);
    if (!q) {
      Notiflix.Notify.warning('Enter your request!');
    } else {
      fetch(q, 1).then(hits => setImages(hits));
      setIsLoading(false);
    }
  };

  const buttonOnClick = event => {
    event.preventDefault();
    setPage(prevPage => prevPage + 1);

    fetch(query, page + 1).then(hits =>
      setImages(prevState => [...prevState, ...hits])
    );
    setIsLoading(false);
  };

  useEffect(() => {
    if (!query) {
      setQuery('');
      setImages([]);
      return;
    }
  }, [query, page]);


  return (
    <Container>
      {isLoading && <Loader />}
      <Searchbar onSubmit={handleSubmit} />
      {query !== '' && (
        <>
          <ImageGallery images={images} openModal={openModal} />
          {page < totalPages && <Button onClick={buttonOnClick} />}
        </>
      )}
      {showModal && (
        <Modal onClose={onClickBackdrop}>
          <img src={largeImage} alt={query} />
        </Modal>
      )}
    </Container>
  );
}
