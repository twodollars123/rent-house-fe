// components
import Spring from "@components/Spring";
import AppCard from "@components/AppCard";

//hooks
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

//assets
import light from "@assets/logo_light.svg";
import dark from "@assets/logo_dark.svg";
import house from "@assets/house.png";
import wallet from "@assets/coins.webp";
import ellipsis from "@assets/icons/ellipsis.svg";
//lib
import classNames from "classnames";
import { toast } from "react-toastify";
//api
import { findProdById, getThumbs } from "@api_services/prod.service";
import {
  searchByQuery,
  searchDecayFn,
} from "@api_services/elasticsearch.service";

const SearchPage = () => {
  //user login
  const currentUser = JSON.parse(localStorage.getItem("user_data"));
  console.log("currentUser ::: ", currentUser.shop.user_id);
  //init data
  const location = useLocation();
  const [items, setItems] = useState([]);

  const fetchDataSearchQuery = async () => {
    console.log("queery::", location);
    const listPostsId = await searchByQuery(location.state);
    console.log("result search::", listPostsId.data.hits);
    if (listPostsId.data.hits?.length == 0) {
      toast.error("không tìm thấy kết quả");
    } else {
      const listDataPost = listPostsId.data.hits.map(async (postItem) => {
        const post = await findProdById(postItem._source.id);
        const listThumbs = (await getThumbs(postItem._source.id)).data.metadata;
        return { ...post.data.metadata.metadata.prod[0], listThumbs };
      });
      Promise.all(listDataPost).then((results) => {
        console.log("resulfdshdfu::", results);
        setItems((prevItems) => [...prevItems, ...results]);
      });
    }
  };

  useEffect(() => {
    fetchDataSearchQuery();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const handlePublish = async (data) => {
    console.log("payload :::", data);
    const listPostsId = await searchDecayFn(data);
    console.log("id", listPostsId.data.hits);
    if (listPostsId.data.hits?.length == 0) {
      toast.error("không tìm thấy kết quả");
    } else {
      const listDataPost = listPostsId.data.hits.map(async (postItem) => {
        const post = await findProdById(postItem._source.id);
        const listThumbs = (await getThumbs(postItem._source.id)).data.metadata;
        return { ...post.data.metadata.metadata.prod[0], listThumbs };
      });
      Promise.all(listDataPost).then((results) => {
        console.log("resulfdshdfu::", results);
        setItems(results);
      });
    }
  };

  return (
    <div className="flex shink h-[76vh] gap-8">
      <Spring className="card flex-col w-5/12 relative">
        <h5 className="mb-[15px] text-center">Tìm kiếm nâng cao</h5>
        <h6 className="mb-[15px]">Khu vực</h6>
        <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
          <div className="field-wrapper">
            <label className="field-label" htmlFor="location">
              Tọa độ trung tâm (kinh độ, vĩ độ)
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.location,
              })}
              id="location"
              placeholder="Ex: 20, 100"
              {...register("location", { required: true })}
            />
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="location_variance">
              Bán kính (km)
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.location_variance,
              })}
              id="location_variance"
              placeholder="Nhập bán kính"
              {...register("location_variance", { required: true })}
            />
          </div>
        </div>
        <h6 className="my-[15px]">Giá phòng</h6>
        <div className="grid grid-cols-1 gap-y-4 gap-x-2 sm:grid-cols-2">
          <div className="field-wrapper">
            <label className="field-label" htmlFor="price">
              Giá mong muốn
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.price,
              })}
              id="price"
              placeholder="Nhập giá phòng mong muốn"
              {...register("price", { required: true })}
            />
          </div>
          <div className="field-wrapper">
            <label className="field-label" htmlFor="price_variance">
              Số tiền chênh lệch cho phép
            </label>
            <input
              className={classNames("field-input", {
                "field-input--error": errors.price_variance,
              })}
              id="price_variance"
              placeholder="Nhập giá trị"
              {...register("price_variance", { required: true })}
            />
          </div>
        </div>
        <div className="grid gap-2 absolute bottom-10 right-[40%]">
          <button
            className="btn btn--primary"
            onClick={handleSubmit(handlePublish)}
          >
            Tìm kiếm
          </button>
        </div>
      </Spring>
      <div className="flex flex-1 w-7/12 overflow-auto flex-col gap-8">
        {items &&
          items.map((card, index) => {
            return <AppCard app={card} index={index} />;
          })}
      </div>
    </div>
  );
};

export default SearchPage;
