import axios from 'axios';
export default class PixabayAPI {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalPage = 0;
    this.perPage = 40;
    this.totalHits = 0;
  }

  async newSearch(photoName) {
    this.searchQuery = photoName;
    const response = await this.search();

    this.totalHits = response.data.totalHits;
    this.totalPage = Math.ceil(this.totalHits / this.perPage);

    return response;
  }

  async nextPageSearch() {
    if (this.page >= this.totalPage) {
      return false;
    }

    this.page += 1;
    console.log(this.page);

    const response = await this.search();
    return response;
  }

  async search() {
    const response = await axios.get(
      `https://pixabay.com/api/?key=31970293-19f969d9a323cf342718bb6ce&q=${this.searchQuery.replace(
        ' ',
        '+'
      )}&image_type=photo&orientation=horizontal&safesearch=true&page=${
        this.page
      }&per_page=${this.perPage}`
    );

    return response;
  }

  checkResponse(response) {
    console.dir('This is check: ' + response);
    return response.data.hits.length === 0 ? false : true;
  }
}
