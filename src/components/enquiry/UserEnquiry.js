import React from "react";
import Sidebar from "../../components/sidebar/SideBar";
import UserSearchBar from "../../components/Search/UserSearchBar";
import SportsCard from "../../components/Cards/SportsCard";
import StreamCardsUser from "../../components/Cards/StreamCardsUser";
import EnquiryForm from "../Forms/EnquiryForm";

export const UserEnquiry = () => {
  return (
    <main className="h-screen flex flex-col">
      <div className="flex flex-grow">
        <aside className="w-64 bg-gray-200 p-4">
          <Sidebar />
        </aside>
        <div className="flex-grow p-4">
          <EnquiryForm/>

          {/* <StreamCardsUser/> */}
        </div>
      </div>
    </main>
  );
};

export default UserEnquiry;