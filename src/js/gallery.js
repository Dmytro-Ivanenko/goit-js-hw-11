import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export default class Gallery {
  constructor(gallery) {
    this.gallery = gallery;
  }

  createGallery(response) {
    const markup = response
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          return `<a href="${largeImageURL}"><div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width = "400"/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div></a>`;
        }
      )
      .join('');

    this.renderGallery(markup);
  }

  renderGallery(markup) {
    this.gallery.innerHTML = markup;
    let gallery = new SimpleLightbox('.gallery a');
    gallery.on('show.simplelightbox');
  }
}
