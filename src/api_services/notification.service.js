import axios from "axios";

export const getNotifications = async (params) => {
  return await axios.post(`http://localhost:3055/v1/api/noti/getnoti`, params, {
    headers: {
      "x-api-key": "privatekey1",
    },
  });
};

export const markSeenNotification = async (params) => {
  return await axios.post(
    `http://localhost:3055/v1/api/noti/markSeen`,
    params,
    {
      headers: {
        "x-api-key": "privatekey1",
      },
    }
  );
};
