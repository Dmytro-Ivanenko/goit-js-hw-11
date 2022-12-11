import axios from 'axios';
export default class PixabayAPI {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 10;
    this.totalHits = 0;
  }

  newSearch(photoName) {
    this.searchQuery = photoName;
    return this.search();
  }

  nextPageSearch() {
    this.page += 1;
    console.log(this.page);
    return this.search();
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

    this.totalHits = response.data.totalHits;
    return response;
  }

  checkResponse(response) {
    return response.data.hits.length === 0 ? false : true;
  }
}
