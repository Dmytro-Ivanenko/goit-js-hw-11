import Notiflix from 'notiflix';
import PixabayAPI from './js/search';
import Gallery from './js/gallery';

// Variables
const refs = {
  searchInput: document.querySelector('[name = searchQuery]'),
  submitBtn: document.querySelector('[name = searchBtn]'),
  gallery: document.querySelector('.gallery'),
};

const pixabay = new PixabayAPI();
const galleryAPI = new Gallery(refs.gallery);

// Event handlings
const onSubmit = e => {
  e.preventDefault();
  const photoName = refs.searchInput.value;

  if (photoName.trim() === '') {
    Notiflix.Notify.failure('The input field is empty, enter a search query');
    return;
  } else {
    pixabay
      .search(photoName.trim())
      .then(response => {
        pixabay.checkResponse(response)
          ? galleryAPI.createGallery(response.data.hits)
          : Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );
      })
      .catch(error => {
        console.dir(error);
      });
  }
};

// Events

refs.submitBtn.addEventListener('click', onSubmit);
