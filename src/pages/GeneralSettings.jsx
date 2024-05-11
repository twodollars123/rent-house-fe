// components
import PageHeader from "@layout/PageHeader";
import UserProfileCard from "@widgets/UserProfileCard";
import UserProfileDetails from "@widgets/UserProfileDetails";
import UserProfilePanel from "@widgets/UserProfilePanel";
import UserProfileInfo from "@widgets/UserProfileInfo";
//api
import { getInfouserById } from "@api_services/user.service";
import { useEffect, useState } from "react";

const GeneralSettings = () => {
  const [dataUser, setDataUser] = useState({});
  const fetchData = async () => {
    const currentUser = JSON.parse(localStorage.getItem("user_data"));
    const infoUser = await getInfouserById(currentUser.shop.user_id);
    console.log("info user:::: ", infoUser);
    setDataUser(infoUser.data.metadata);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <PageHeader title="Settings" />
      <div className="widgets-grid md:!grid-cols-2 xl:!grid-cols-[340px,_minmax(0,1fr)]">
        <div className="widgets-grid md:!grid-cols-2 md:col-span-2 xl:!grid-cols-1 xl:col-span-1">
          <UserProfileCard data={dataUser} />
          <div className="widgets-grid">
            <UserProfilePanel />
            <UserProfileInfo data={dataUser} />
          </div>
        </div>
        <UserProfileDetails data={dataUser} />
      </div>
    </>
  );
};

export default GeneralSettings;
