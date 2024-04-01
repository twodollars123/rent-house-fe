// components
import Spring from "@components/Spring";
import Switch from "@ui/Switch";
import TruncatedText from "@components/TruncatedText";

// hooks
import useMeasure from "react-use-measure";

//styles
import "@components/appCard.scss";

//asssets
import ellipsis from "@assets/icons/ellipsis.svg";
const AppCard = ({ app, index }) => {
  const [titleRef, { width: titleWidth }] = useMeasure();
  const [descriptionRef, { width: descriptionWidth }] = useMeasure();

  const optionViewImg = () => {
    if (app.img && app.img.length <= 1) {
      return 1;
    } else if (app.img && app.img.length === 2) {
      return 2;
    } else if (app.img && app.img.length === 3) {
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
          <img className="h-9 w-auto" src={app.avatar} alt={app.name} />
          <div className="flex flex-col">
            <p
              className="max-w-[400px] w-full leading-[1.4] user-name"
              ref={titleRef}
            >
              <TruncatedText text={app.name} width={180} lines={1} />
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
        <p className="content-post">{app.description}</p>
        {optionViewImg() <= 1 && (
          <div className="flex justify-between items-center grow w-full">
            <img
              src={app.img[0]}
              alt=""
              className="max-h-[220px] max-w-[100%] overflow-hidden object-contain"
            />
          </div>
        )}
        {optionViewImg() === 2 && (
          <div className="flex gap-1 w-full justify-between grow">
            <img
              src={app.img[0]}
              alt=""
              className="max-h-[240px] max-w-[50%] overflow-hidden object-contain border-2 p-1 rounded-lg "
            />
            <img
              src={app.img[1]}
              alt=""
              className="max-h-[240px] max-w-[50%] overflow-hidden object-contain border-2 p-1 rounded-lg "
            />
          </div>
        )}

        {optionViewImg() === 3 && (
          <div className="flex gap-1 w-full justify-between grow">
            <img
              src={app.img[0]}
              alt=""
              className="max-h-[240px] max-w-[60%] overflow-hidden object-contain border-2 p-1 rounded-lg "
            />
            <div className="flex flex-col justify-between grow max-h-[240px] gap-1">
              <img
                src={app.img[1]}
                alt=""
                className="max-h-[50%] max-w-[100%] overflow-hidden object-contain border-2 p-1 rounded-lg "
              />
              <img
                src={app.img[2]}
                alt=""
                className="max-h-[50%] max-w-[100%] overflow-hidden object-contain border-2 p-1 rounded-lg "
              />
            </div>
          </div>
        )}

        {optionViewImg() === 4 && (
          <div className="flex gap-1 w-full justify-between grow">
            <img
              src={app.img[0]}
              alt=""
              className="max-h-[240px] w-3/5 overflow-hidden object-contain border-2 p-1 rounded-lg shrink"
            />
            <div className="flex flex-col justify-between grow max-h-[240px] gap-1 w-2/5">
              <img
                src={app.img[1]}
                alt=""
                className="max-h-[50%] max-w-[100%] overflow-hidden object-contain border-2 p-1 rounded-lg "
              />
              <div className="relative max-h-[50%] max-w-[100%] border-2 p-1 rounded-lg backdrop-blur-sm">
                <img
                  src={app.img[2]}
                  alt=""
                  className="max-h-[100%] max-w-[100%] overflow-hidden object-contain "
                />
                <div className="absolute backdrop-opacity-30 backdrop-invert bg-white/30 w-full h-full top-0 right-0 rounded-lg flex items-center justify-center text-blue-600 text-xl font-medium">
                  + {app.img.length - 3}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* them gach duoi */}
      {/* action  */}
      <div className="flex justify-around mt-auto h-16 pt-4 shrink">
        <div className="text-btn cursor-pointer">Thich 100N</div>
        <div className="text-btn cursor-pointer">Binh luan 200N</div>
      </div>
    </Spring>
  );
};

export default AppCard;
