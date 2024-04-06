import { ReactComponent as Ring } from "@assets/oval.svg";

const Loader = () => {
  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="w-[50px] h-[50px] text-accent">
        <Ring />
      </div>
    </div>
  );
};

export default Loader;
