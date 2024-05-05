import axios from "axios";

export const getInvenByProdId = async (prodId) => {
  return await axios.get(
    `http://localhost:3055/v1/api/inven/getInStock/${prodId}`,
    {
      headers: {
        "x-api-key": "privatekey1",
      },
    }
  );
};
