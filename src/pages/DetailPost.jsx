// components
import PageHeader from "@layout/PageHeader";
import Fade from "@components/Slider/Fade";
import Spring from "@components/Spring";
import Switch from "@ui/Switch";
import TruncatedText from "@components/TruncatedText";

import { findProdById } from "@api_services/prod.service";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

//assets
import light from "@assets/logo_light.svg";
import dark from "@assets/logo_dark.svg";
import house from "@assets/house.png";
import wallet from "@assets/coins.webp";
import ellipsis from "@assets/icons/ellipsis.svg";

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
    <div className="flex shink h-[80vh]">
      <div className="w-9/12 h-full">
        <Fade />
      </div>
      <div
        className="w-3/12 flex flex-col p-3"
        style={{ backgroundColor: "#f1f1f1" }}
      >
        {/* header */}
        <div className="flex flex-row justify-between items-center">
          {/* avartar-nameUser-createdPost */}
          <div className="flex flex-row gap-2 items-center">
            <img className="h-9 w-auto" src={house} alt={""} />
            <div className="flex flex-col">
              <p className="max-w-[400px] w-full leading-[1.4] user-name">
                <TruncatedText text={"tuannv"} width={180} lines={1} />
              </p>
              <p>
                <TruncatedText
                  text={"vua xong"}
                  width={"200"}
                  lines={1}
                  className="h-1"
                />
              </p>
            </div>
          </div>
          {/* action */}
          <div className="flex">
            <img src={ellipsis} alt="more" className="h-6 w-auto" />
          </div>
        </div>

        {/* them gach duoi */}
        {/* action  */}
        <div className="flex justify-around mt-auto h-16 pt-4 shrink">
          <div className="text-btn cursor-pointer">Thich 100N</div>
          <div className="text-btn cursor-pointer">Binh luan 200N</div>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
