import axios from 'axios';
export default class PixabayAPI {
  constructor() {
    this.searchQueryText = '';
    this.page = 0;
    this.perPage = 40;
    this.totalHits;
    this.images = 0;
  }

  async initSearch() {
    this.page += 1;
    const response = await this.search();
    if (response && this.page === 1) {
      this.totalHits = response.data.totalHits;
    }
    return response;
  }

  async search() {
    const response = await axios.get(
      `https://pixabay.com/api/?key=31970293-19f969d9a323cf342718bb6ce&q=${this.searchQueryText.replace(
        ' ',
        '+'
      )}&image_type=photo&orientation=horizontal&safesearch=true&page=${
        this.page
      }&per_page=${this.perPage}`
    );

    return this.checkResponse(response);
  }

  checkLastPage() {
    if (this.images >= this.totalHits) {
      return true;
    }
    return false;
  }

  checkResponse(response) {
    return response.data.hits.length === 0 ? false : response;
  }
}
