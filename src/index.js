import Notiflix from 'notiflix';
import search from './js/search';

// Variables
const refs = {
  searchInput: document.querySelector('[name = searchQuery]'),
  submitBtn: document.querySelector('[name = searchBtn]'),
  gallery: document.querySelector('.gallery'),
};

// Event handlings
const onSubmit = e => {
  e.preventDefault();
  const photoName = refs.searchInput.value;

  if (photoName.trim() === '') {
    Notiflix.Notify.failure('The input field is empty, enter a search query');
    return;
  } else {
    search(photoName.trim())
      .then(response => createGallery(response))
      .catch(error => {
        console.dir(error);
      });
  }
};

// Events

refs.submitBtn.addEventListener('click', onSubmit);
