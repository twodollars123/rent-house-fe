import axios from "axios";

export const searchByQuery = async (query) => {
  return await axios.get(
    `http://127.0.0.1:3010/quotes/search-by-query/?query=${query}`
  );
};

export const searchDecayFn = async (payload) => {
  return await axios.post(`http://127.0.0.1:3010/quotes/search`, payload);
};
