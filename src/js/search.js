import axios from 'axios';
export default async function search(photoName) {
  const response = await axios.get(
    `https://pixabay.com/api/?key=31970293-19f969d9a323cf342718bb6ce&q=${photoName.replace(
      ' ',
      '+'
    )}&image_type=photo`
  );
  console.log(response);
  return response;
}
