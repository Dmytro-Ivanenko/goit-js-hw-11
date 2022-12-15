import Notiflix from 'notiflix';
import PixabayAPI from './js/search';
import Gallery from './js/gallery';

// ============ Variables
const refs = {
  searchInput: document.querySelector('[name = searchQuery]'),
  submitBtn: document.querySelector('[name = searchBtn]'),
  gallery: document.querySelector('.gallery'),
};
const pixabay = new PixabayAPI();
const galleryAPI = new Gallery(refs.gallery);
const observerOptions = {
  rootMargin: '0px',
  threshold: 1.0,
};
const target = document.querySelector('.targetObserve');
const observer = new IntersectionObserver(([entry], observer) => {
  if (entry.isIntersecting) {
    observer.unobserve(entry.target);
    startSearch();
  }
}, observerOptions);

// ============= Functions
async function startSearch() {
  if (pixabay.checkLastPage()) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    observer.disconnect();
    return;
  }

  try {
    const response = await pixabay.initSearch();

    if (!response) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else if (pixabay.page === 1) {
      Notiflix.Notify.success(`Hooray! We found ${pixabay.totalHits} images.`);
    }
    // we can to render gallery
    galleryAPI.createGallery(response.data.hits);
    pixabay.images = refs.gallery.childElementCount;

    observer.observe(target);
  } catch (error) {
    console.error(error);
  }
}

// ============= Event handlings
function onSubmit(e) {
  e.preventDefault();
  observer.unobserve(target);
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  const text = refs.searchInput.value.trim();

  if (text === '') {
    Notiflix.Notify.failure('The input field is empty, enter a search query');
    return;
  }
  galleryAPI.clearGallery();
  pixabay.page = 0;
  pixabay.images = 0;

  pixabay.searchQueryText = text;
  startSearch();
}
// =============== Events

refs.submitBtn.addEventListener('click', onSubmit);
