import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export default class Gallery {
  constructor(gallery) {
    this.gallery = gallery;
  }

  createGallery(response) {
    console.dir(response);
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
  <table class="info-item">
    <tr >
      <th>
        Like
      </th>
      <th>Views</th>
      <th>Comments</th>
      <th>Downloads</th>
    </tr>
    <tr >
      <td>${likes}</td>
      <td>${views}</td>
      <td>${comments}</td>
      <td>${downloads}</td>
    </tr>
    
    </table>
  </div>
</div></a>`;
        }
      )
      .join('');

    this.renderGallery(markup);
  }

  renderGallery(markup) {
    if (this.gallery.childElementCount === 0) {
      this.gallery.innerHTML = markup;

      return;
    }

    this.gallery.insertAdjacentHTML('beforeend', markup);
  }

  clearGallery() {
    this.gallery.innerHTML = '';
  }
}
