import { Link } from "react-router-dom";
// components
import Spring from "@components/Spring";
import TruncatedText from "@components/TruncatedText";

// hooks
import useMeasure from "react-use-measure";

//styles
import "@components/appCard.scss";

//asssets
import ellipsis from "@assets/icons/ellipsis.svg";
import house from "@assets/house.png";
import { useEffect, useState } from "react";

//api
import { getInfouserById } from "@api_services/user.service";
import { sendRequest } from "@api_services/order.service";
import { toast } from "react-toastify";

const AppCard = ({ app, index }) => {
  const [titleRef, { width: titleWidth }] = useMeasure();
  const [dataAuthor, setDataAuthor] = useState({});

  const currentUser = JSON.parse(localStorage.getItem("user_data"));
  // console.log("currentUser ::: ", currentUser.shop.user_id);

  useEffect(() => {
    (async () => {
      if (app.author_id) {
        const user = await getInfouserById(app.author_id);
        setDataAuthor(user.data.metadata);
      }
    })();
  }, []);

  const handleSendRequest = async () => {
    // console.log("card:::", app);
    // console.log("card author:::", dataAuthor);
    // ownerId, renterId, prodId
    const params = {
      ownerId: dataAuthor.user_id,
      renterId: currentUser.shop.user_id,
      prodId: app.id,
    };
    const res = await sendRequest(params);
    // console.log("res:::", res);
    if (res.data.status === 201) {
      toast.success(
        `Yêu cầu giữ phòng của bạn đã được gửi tới ${dataAuthor.name}. Vui lòng chờ phản hồi từ chủ phòng.`
      );
    }
  };

  const optionViewImg = () => {
    if (app.listThumbs && app.listThumbs.length === 0) {
      return 0;
    } else if (app.listThumbs.length === 1) {
      return 1;
    } else if (app.listThumbs.length === 2) {
      return 2;
    } else if (app.listThumbs.length === 3) {
      return 3;
    } else {
      return 4;
    }
  };

  return (
    <Spring
      className="card flex flex-col gap-4 !pt-5 !px-5 min-h-[500px] min-w-[600px] cursor-pointer"
      type="slideUp"
      index={index}
    >
      {/* header */}
      <div className="flex flex-row justify-between items-center">
        {/* avartar-nameUser-createdPost */}
        <div className="flex flex-row gap-2 items-center">
          <img
            className="h-9 w-auto rounded-full"
            src={dataAuthor.avatar == null ? house : dataAuthor.avatar}
            alt={app.name}
          />
          <div className="flex flex-col">
            <p
              className="max-w-[400px] w-full leading-[1.4] user-name"
              ref={titleRef}
            >
              <TruncatedText text={dataAuthor.name} width={180} lines={1} />
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
      {/* content  */}
      <div className="flex flex-col gap-4">
        <p className="content-post">{app.caption}</p>
        <Link to={`/detail-post/${app.id}`}>
          {optionViewImg() === 0 && (
            <div className="flex justify-between items-center grow w-full">
              <img
                src={house}
                alt=""
                className="max-h-[220px] max-w-[100%] overflow-hidden object-contain"
              />
            </div>
          )}
          {optionViewImg() === 1 && (
            <div className="flex justify-between items-center grow w-full">
              <img
                src={app.listThumbs[0].url}
                alt=""
                className="max-h-[220px] max-w-[100%] overflow-hidden object-contain"
              />
            </div>
          )}
          {optionViewImg() === 2 && (
            <div className="flex gap-1 w-full justify-between grow">
              <img
                src={app.listThumbs[0].url}
                alt=""
                className="max-h-[240px] max-w-[50%] overflow-hidden object-contain border-2 p-1 rounded-lg "
              />
              <img
                src={app.listThumbs[1].url}
                alt=""
                className="max-h-[240px] max-w-[50%] overflow-hidden object-contain border-2 p-1 rounded-lg "
              />
            </div>
          )}

          {optionViewImg() === 3 && (
            <div className="flex gap-1 w-full justify-between grow">
              <img
                src={app.listThumbs[0].url}
                alt=""
                className="max-h-[240px] max-w-[60%] overflow-hidden object-contain border-2 p-1 rounded-lg "
              />
              <div className="flex flex-col justify-between grow max-h-[240px] gap-1">
                <img
                  src={app.listThumbs[1].url}
                  alt=""
                  className="max-h-[50%] max-w-[100%] overflow-hidden object-contain border-2 p-1 rounded-lg "
                />
                <img
                  src={app.listThumbs[2].url}
                  alt=""
                  className="max-h-[50%] max-w-[100%] overflow-hidden object-contain border-2 p-1 rounded-lg "
                />
              </div>
            </div>
          )}

          {optionViewImg() === 4 && (
            <div className="flex gap-1 w-full justify-between grow">
              <img
                src={app.listThumbs[0].url}
                alt=""
                className="max-h-[240px] w-3/5 overflow-hidden object-contain border-2 p-1 rounded-lg shrink"
              />
              <div className="flex flex-col justify-between grow max-h-[240px] gap-1 w-2/5">
                <img
                  src={app.listThumbs[1].url}
                  alt=""
                  className="max-h-[50%] max-w-[100%] overflow-hidden object-contain border-2 p-1 rounded-lg "
                />
                <div className="relative max-h-[50%] max-w-[100%] border-2 p-1 rounded-lg backdrop-blur-sm">
                  <img
                    src={app.listThumbs[2].url}
                    alt=""
                    className="max-h-[100%] max-w-[100%] overflow-hidden object-contain "
                  />
                  <div className="absolute backdrop-opacity-30 backdrop-invert bg-white/30 w-full h-full top-0 right-0 rounded-lg flex items-center justify-center text-blue-600 text-xl font-medium">
                    + {app.listThumbs.length - 3}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Link>
      </div>
      {/* them gach duoi */}
      {/* action  */}
      <div className="flex justify-around mt-auto h-16 pt-4 shrink">
        <div className="text-btn cursor-pointer">Thích</div>
        <div className="text-btn cursor-pointer">Bình luận</div>
        <div className="text-btn cursor-pointer" onClick={handleSendRequest}>
          Giữ phòng
        </div>
      </div>
    </Spring>
  );
};

export default AppCard;
