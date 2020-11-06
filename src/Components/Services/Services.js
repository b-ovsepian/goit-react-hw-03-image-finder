import axios from "axios";

//You must add your API_KEY to .env

export const axiosImages = async (query, page) => {
  const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${process.env.REACT_APP_API_KEY}`;
  const result = await axios.get(url);
  return result.data.hits;
};
