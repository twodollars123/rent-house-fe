// components
import PageHeader from "@layout/PageHeader";
import { findProdById } from "@api_services/prod.service";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const DetailPost = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const fetchData = async () => {
    const res = await findProdById(id);
    if (res) {
      console.log("res::", res.data.metadata.metadata.prod);
      setData(res.data.metadata.metadata.prod[0]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <PageHeader title="Post Editor" />
      <div>detail {data.id} </div>
    </>
  );
};

export default DetailPost;
