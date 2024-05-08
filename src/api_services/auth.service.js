import axios from "axios";

export const login = async (email, password) => {
  return await axios.post(
    "http://localhost:3055/v1/api/user/login",
    {
      email,
      password,
    },
    {
      headers: {
        "x-api-key": "privatekey1",
      },
    }
  );
};

export const signup = async (params) => {
  return await axios.post("http://localhost:3055/v1/api/user/signup", params, {
    headers: {
      "x-api-key": "privatekey1",
    },
  });
};
