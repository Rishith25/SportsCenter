import { Outlet } from "react-router-dom";
import Appbar from "../../layouts/account/Appbar";
import FavoritesList from "./Favorites";

const FavoritesIndex = () => {
  return (
    <>
     <Appbar />
      <div className="mx-5 py-4 sm:px-6 lg:px-1">
        <div className=" text-xl font-semibold text-gray-800">Favorites</div>
        <FavoritesList />
        <Outlet />
      </div>
    </>
  )
}
export default FavoritesIndex;