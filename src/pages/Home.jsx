// components
import AppCard from "@components/AppCard";
import PageHeader from "@layout/PageHeader";
import Sidebar from "@layout/Sidebar";
import Loader from "@components/Loader";

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

    app.data.length > 0 ? setHasMore(true) : setHasMore(false);

    setIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <>
      <PageHeader title="Home" />
      <div className="flex gap-4 justify-between">
        <Sidebar />

        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={"..."}
        >
          <div className="min-w-[600px] flex flex-col overflow-auto max-h-[80vh] gap-10 content">
            {items &&
              items.map((card, index) => {
                return <AppCard app={card} index={index} />;
              })}
          </div>
        </InfiniteScroll>

        <div className="wrapper">thông tin ngoài lề thời tiết chứng khoán</div>
      </div>
    </>
  );
};

export default Home;
