import React from "react";
import Sidebar from "../../components/sidebar/SideBar";
import UserFavorites from "../../components/Cards/UserFavorites";

export const FavoriteList = () => {
  return (
    <main className="h-screen flex flex-col">
      <div className="flex flex-grow">
        <aside className="w-64 bg-gray-200 p-4">
          <Sidebar />
        </aside>
        <div className="flex-grow p-4">
          <UserFavorites />
        </div>
      </div>
    </main>
  );
};

export default FavoriteList;
