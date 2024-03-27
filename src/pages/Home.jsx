// components
import PageHeader from "@layout/PageHeader";
import Sidebar from "@layout/Sidebar";

const Home = () => {
  return (
    <>
      <PageHeader title="Home" />
      <div className="flex gap-4">
        <Sidebar />
        <div>home page</div>
      </div>
    </>
  );
};

export default Home;
