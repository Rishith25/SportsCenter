import { Outlet } from "react-router-dom";
import Profile from "./Profile";

const ProfileIndex = () => {
  return (
    <>
      <Profile />
      <Outlet />
    </>
  );
};
export default ProfileIndex;
