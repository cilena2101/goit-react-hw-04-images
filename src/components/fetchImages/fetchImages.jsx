import axios from "axios";

export async function fetchImages(inputName, page) {
  const images = await axios.get(`https://pixabay.com/api/?q=${inputName}&page=${page}&key=34991567-d238450fbc6c73abfee575a58&image_type=photo&orientation=horizontal&per_page=12`)
  return images.data;
}