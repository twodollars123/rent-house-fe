// components
import AppCard from "@components/AppCard";
import PageHeader from "@layout/PageHeader";
import Sidebar from "@layout/Sidebar";
// import Loader from "@components/Loader";
import InfiniteScrollCustom from "@components/InfiniteScrollCustom";

import "./home.scss";

//assets
import light from "@assets/logo_light.svg";
import dark from "@assets/logo_dark.svg";
import house from "@assets/house.png";

//library
// import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";

//api
import { getPosts, getThumbs } from "@api_services/prod.service";

const Home = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPosts, setTotalPosts] = useState(100);

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

  // const fetchMoreData = async () => {
  //   console.log("page", page);
  //   const data = await fetchData(page, 10);
  //   setItems((prevItems) => [...prevItems, ...data]);
  //   setPage(page + 1);
  //   console.log("a");
  //   if (data.length < itemsPerPage) {
  //     setHasMore(false);
  //   }
  // };

  return (
    <>
      <PageHeader title="Home" />
      <div className="flex gap-4 justify-between ">
        <Sidebar />
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

        <div className="wrapper">thông tin ngoài lề thời tiết chứng khoán</div>
      </div>
    </>
  );
};

export default Home;
