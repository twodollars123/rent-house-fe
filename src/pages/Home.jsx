// components
import AppCard from "@components/AppCard";
import PageHeader from "@layout/PageHeader";
import Sidebar from "@layout/Sidebar";
import Loader from "@components/Loader";
import InfiniteScrollCustom from "@components/InfiniteScrollCustom";

import "./home.scss";

//assets
import light from "@assets/logo_light.svg";
import dark from "@assets/logo_dark.svg";
import house from "@assets/house.png";

//library
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";

const Home = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);

  useEffect(() => {
    const app = [
      {
        id: 1,
        avatar: light,
        img: [light],
        name: "tuannv",
        description:
          "tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc,  tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc,  tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc,  tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc,  tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc,  tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc,  tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc,  tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc,  tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc,",
      },
      {
        id: 2,
        avatar: light,
        img: [light, dark],
        name: "nguyen van tuan",
        description:
          "tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc,  tuannv vua ",
      },
      {
        id: 3,
        img: [light, dark, house],
        name: "ab",
        description: "abc",
      },
      {
        id: 4,
        img: [light, dark, house, house, house],
        name: "ab",
        description: "abc",
      },
    ];
    setItems(app);
  }, []);

  const fetchMoreData = () => {
    const app = [
      {
        id: 1,
        avatar: light,
        img: [light],
        name: "tuannv",
        description:
          "tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc,  tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc,  tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc,  tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc,  tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc,  tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc,  tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc,  tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc,  tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc,",
      },
      {
        id: 2,
        avatar: light,
        img: [light, dark],
        name: "nguyen van tuan",
        description:
          "tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc, tuannv vua dang 1 phut truoc,  tuannv vua ",
      },
      {
        id: 3,
        img: [light, dark, house],
        name: "ab",
        description: "abc",
      },
      {
        id: 4,
        img: [light, dark, house, house, house],
        name: "ab",
        description: "abc",
      },
    ];

    setItems((prevItems) => [...prevItems, ...app]);

    setIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <>
      <PageHeader title="Home" />
      <div className="flex gap-4 justify-between ">
        <Sidebar />
        <div id="scrollableDiv" className="overflow-auto max-h-[100vh]">
          <InfiniteScrollCustom
            dataLength={items.length}
            fetchMore={fetchMoreData}
            hasMore={items.length > 20 ? false : true}
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
