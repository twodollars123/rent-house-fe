import axios from "axios";

export const getInfoPaymentMethod = async (prodId) => {
  return await axios.get(
    `http://localhost:3055/v1/api/methodpayments/getinfo/${prodId}`,
    {
      headers: {
        "x-api-key": "privatekey1",
      },
    }
  );
};
