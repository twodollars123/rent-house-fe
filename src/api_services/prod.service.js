import axios from "axios";

export const findProdById = async (id) => {
  return await axios.get(`http://localhost:3055/v1/api/prod/preview/${id}`, {
    headers: {
      "x-api-key": "privatekey1",
    },
  });
};

export const adddProd = async (payload) => {
  return await axios.post(
    `http://localhost:3055/v1/api/prod/add_prod`,
    payload,
    {
      headers: {
        "x-api-key": "privatekey1",
      },
    }
  );
};

export const addThumbnail = async (payload) => {
  return await axios.post(
    `http://localhost:3055/v1/api/prod/add_thumb`,
    payload,
    {
      headers: {
        "x-api-key": "privatekey1",
        "content-type": "multipart/form-data",
      },
    }
  );
};
