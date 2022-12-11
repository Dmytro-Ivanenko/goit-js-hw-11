import axios from 'axios';
export default class PixabayAPI {
  constructor() {
    this.page = 1;
    this.perPage = 40;
    this.totalHints = 0;
  }

  async search(photoName) {
    const response = await axios.get(
      `https://pixabay.com/api/?key=31970293-19f969d9a323cf342718bb6ce&q=${photoName.replace(
        ' ',
        '+'
      )}&image_type=photo&orientation=horizontal&safesearch=true&page=${
        this.page
      }&per_page=${this.perPage}`
    );
    console.log(response);
    return response;
  }
}
