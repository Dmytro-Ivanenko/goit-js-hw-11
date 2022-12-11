import Notiflix from 'notiflix';
import PixabayAPI from './js/search';
import Gallery from './js/gallery';
const throttle = require('lodash.throttle');

// Variables
const refs = {
  searchInput: document.querySelector('[name = searchQuery]'),
  submitBtn: document.querySelector('[name = searchBtn]'),
  gallery: document.querySelector('.gallery'),
};
const pixabay = new PixabayAPI();
const galleryAPI = new Gallery(refs.gallery);
let gallerylightBox;

// Event handlings
const onSubmit = e => {
  e.preventDefault();
  galleryAPI.clearGallery();
  pixabay.page = 1;

  const photoName = refs.searchInput.value;

  if (photoName.trim() === '') {
    Notiflix.Notify.failure('The input field is empty, enter a search query');
    return;
  } else {
    pixabay
      .newSearch(photoName.trim())
      .then(response => {
        if (!pixabay.checkResponse(response)) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        galleryAPI.createGallery(response.data.hits);

        gallerylightBox = new SimpleLightbox('.gallery a');
        gallerylightBox.on('show.simplelightbox');

        Notiflix.Notify.success(
          `Hooray! We found ${pixabay.totalHits} images.`
        );
      })
      .catch(error => {
        console.dir(error);
      });
  }

  // add scroll listener
  window.addEventListener('scroll', throttle(onScroll, 400));
};

const onScroll = e => {
  if (window.pageYOffset >= document.documentElement.scrollHeight - 800) {
    console.log('The and of page');

    pixabay
      .nextPageSearch()
      .then(response => {
        if (!pixabay.checkResponse) {
          window.removeEventListener('scroll', throttle(onScroll, 400));
          Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );

          return;
        }
        galleryAPI.createGallery(response.data.hits);
        gallerylightBox.refresh();
        Notiflix.Notify.success(
          `Hooray! We found ${pixabay.totalHits} images.`
        );
      })
      .catch(error => {
        console.dir(error);
      });
  }
};

// Events

refs.submitBtn.addEventListener('click', onSubmit);
