import axios from 'axios';
const API_KEY = '36616291-61cbd7d0a9e765bab834c6c33';
export const fetchPictures = async (query,page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  // console.log(data.hits)
  return data.hits;
};
