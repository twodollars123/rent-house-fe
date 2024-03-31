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

  return (
    <Spring
      className="card flex flex-col items-stretch gap-4 !pt-5 !px-5 min-h-[500px] min-w-[600px]"
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
        <div className="flex justify-between items-center mx-16 grow">
          {app.img && app.img.length <= 1 && (
            <img
              src={app.img}
              alt=""
              className="max-h-[240px] max-w-[500px] overflow-hidden object-contain"
            />
          )}
        </div>
      </div>
      {/* them gach duoi */}
      {/* action  */}
      <div className="flex justify-around mt-auto">
        <div className="text-btn">thich</div>
        <div className="text-btn">comment</div>
      </div>
    </Spring>
  );
};

export default AppCard;
