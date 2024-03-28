// components
import AppCard from "@components/AppCard";
import PageHeader from "@layout/PageHeader";
import Sidebar from "@layout/Sidebar";

import "./home.scss";

const Home = () => {
  const app = [
    {
      id: 1,
      img: "s",
      name: "a",
      description: "abc",
    },
    {
      id: 2,
      img: "s",
      name: "b",
      description: "abc",
    },
    {
      id: 3,
      img: "s",
      name: "ab",
      description: "abc",
    },
    {
      id: 4,
      img: "s",
      name: "ab",
      description: "abc",
    },
  ];
  return (
    <>
      <PageHeader title="Home" />
      <div className="flex gap-4 justify-between">
        <Sidebar />
        <div className="min-w-[600px] flex flex-col overflow-auto max-h-[80vh] gap-10 content">
          {app &&
            app.map((card) => {
              return <AppCard app={card} index={card.id} />;
            })}
        </div>
        <div className="wrapper">thông tin ngoài lề thời tiết chứng khoán</div>
      </div>
    </>
  );
};

export default Home;
