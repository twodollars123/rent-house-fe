import axios from "axios";

export const getRootCmt = async (prodId) => {
  return await axios.get(
    `http://localhost:3055/v1/api/comments/getRootCmt/${prodId}`,
    {
      headers: {
        "x-api-key": "privatekey1",
      },
    }
  );
};

export const getReplyCmt = async (idCmt) => {
  return await axios.get(
    `http://localhost:3055/v1/api/comments/getReplyCmt/${idCmt}`,
    {
      headers: {
        "x-api-key": "privatekey1",
      },
    }
  );
};

export const addComment = async (payload) => {
  // {
  //     "cmt_parentId": 21,
  //     "cmt_content": "cmt 2.3.1",
  //     "cmt_prodId": 3,
  //     "cmt_userId": 1
  // }
  return await axios.post(
    `http://localhost:3055/v1/api/comments/create`,
    payload,
    {
      headers: {
        "x-api-key": "privatekey1",
      },
    }
  );
};
