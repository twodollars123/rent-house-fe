import axios from "axios";

export const findProdById = async (id) => {
  return await axios.get(`http://localhost:3055/v1/api/prod/preview/${id}`, {
    headers: {
      "x-api-key": "privatekey1",
    },
  });
};
