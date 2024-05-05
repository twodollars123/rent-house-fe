// components
import Spring from "@components/Spring";

// utils
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//api
import { markSeenNotification } from "@api_services/notification.service";

dayjs.extend(relativeTime);

const placeholder = {
  timestamp: new Date(),
  subcategory: "Offers",
  text: "Joined to discount program",
  user: {
    name: "tuannv",
    avatar: "https://placehold.it/100x100",
  },
};

const NotificationItem = ({ notification = placeholder, index, refetch }) => {
  const handleMarkSeen = async () => {
    await markSeenNotification({
      noti_receivedId: notification.noti_receivedId,
    });
    refetch();
  };
  return (
    <Spring className="notification with-border flex gap-2.5" index={index}>
      <div className="w-[36px] h-[36px] shrink-0 rounded-md bg-body overflow-hidden">
        <img src={notification.user.avatar} alt={notification.user.name} />
      </div>
      <div>
        <span className="h6 !text-sm truncate max-w-[210px]">
          {notification.user.name}
        </span>
        <p>{notification.text}</p>
        <p className="flex items-center gap-1.5 mt-1 mb-2 text-xs font-medium text-gray">
          <span>{dayjs(notification.timestamp).fromNow()}</span>
          {/* <i className="icon-circle-solid text-[4px]"/>
                    <span>{notification.subcategory}</span> */}
        </p>
        <div className="flex gap-2.5">
          <button className="btn btn--outline size-xs blue">Accept</button>
          <button
            className="btn btn--outline size-xs red"
            onClick={handleMarkSeen}
          >
            Dismiss
          </button>
        </div>
      </div>
    </Spring>
  );
};

export default NotificationItem;
