import axios from "axios";

export const sendRequest = async (params) => {
  return await axios.post(`http://localhost:3055/v1/api/order/create`, params, {
    headers: {
      "x-api-key": "privatekey1",
    },
  });
};
