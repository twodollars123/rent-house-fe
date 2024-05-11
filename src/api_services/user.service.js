import axios from "axios";

export const getInfouserById = async (id) => {
  return await axios.get(`http://localhost:3055/v1/api/users/${id}`, {
    headers: {
      "x-api-key": "privatekey1",
    },
  });
};

export const getAllAccount = async () => {
  return await axios.get(`http://localhost:3055/v1/api/users/getAccount`, {
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
