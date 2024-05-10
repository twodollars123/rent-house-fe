import axios from "axios";

export const sendRequest = async (params) => {
  return await axios.post(`http://localhost:3055/v1/api/order/create`, params, {
    headers: {
      "x-api-key": "privatekey1",
    },
  });
};

export const getHistoryRequest = async (params) => {
  return await axios.post(
    `http://localhost:3055/v1/api/order/getHistoryRequest`,
    params,
    {
      headers: {
        "x-api-key": "privatekey1",
      },
    }
  );
};

export const getRequest = async (params) => {
  return await axios.post(
    `http://localhost:3055/v1/api/order/getRequest`,
    params,
    {
      headers: {
        "x-api-key": "privatekey1",
      },
    }
  );
};

export const updateStatus = async (params) => {
  return await axios.post(
    `http://localhost:3055/v1/api/order/updateStatus`,
    params,
    {
      headers: {
        "x-api-key": "privatekey1",
      },
    }
  );
};
