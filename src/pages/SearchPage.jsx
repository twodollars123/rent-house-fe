// components
import Spring from "@components/Spring";
import Switch from "@ui/Switch";
import TruncatedText from "@components/TruncatedText";
import InfiniteScrollCustom from "@components/InfiniteScrollCustom";
import AppCard from "@components/AppCard";
//api
import { findProdById, getThumbs } from "@api_services/prod.service";
import { getInfouserById } from "@api_services/user.service";
import {
  addComment,
  getRootCmt,
  getReplyCmt,
} from "@api_services/comments.service";
//hooks
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

//assets
import light from "@assets/logo_light.svg";
import dark from "@assets/logo_dark.svg";
import house from "@assets/house.png";
import wallet from "@assets/coins.webp";
import ellipsis from "@assets/icons/ellipsis.svg";
//lib
import classNames from "classnames";
//api
import { getPosts } from "@api_services/prod.service";

const SearchPage = () => {
  //user login
  const currentUser = JSON.parse(localStorage.getItem("user_data"));
  console.log("currentUser ::: ", currentUser.shop.user_id);
  //init data
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPosts, setTotalPosts] = useState(100);
  useEffect(() => {
    console.log("queery::", location);
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    (async () => {
      const res = await getPosts(page, itemsPerPage);
      const initData = res.data.metadata.metadata.data;
      setTotalPosts(res.data.metadata.metadata.totalItems);
      const data = initData.map(async (post) => {
        const listThumbs = (await getThumbs(post.id)).data.metadata;
        return { ...post, listThumbs };
      });

      Promise.all(data).then((results) =>
        setItems((prevItems) => [...prevItems, ...results])
      );
    })();
    if (items.length >= totalPosts) {
      setHasMore(false);
    }
  }, [page]);

  const handlePublish = async (data) => {
    console.log("payload :::", data);
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
            Publish Post
          </button>
        </div>
      </Spring>
      <div className="flex flex-1 w-7/12">
        <div id="scrollableDiv" className="overflow-auto max-h-[100vh]">
          <InfiniteScrollCustom
            dataLength={items.length}
            fetchMore={() => setPage((prev) => prev + 1)}
            hasMore={hasMore}
            className="flex flex-col gap-10 "
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {items &&
              items.map((card, index) => {
                return <AppCard app={card} index={index} />;
              })}
          </InfiniteScrollCustom>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
