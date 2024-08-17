import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/SideBar";
import Breadcrumb from "../Breadcrumps/Breadcrumb";
import UserProfileForm from "./UserProfileForm";
import UserProfileChangePasswordFor from "./UserProfileChangePasswordFor";

const UserProfile = () => {
  
  return (
    <main className="h-screen flex flex-col">
      <div className="flex flex-grow">
        <aside className="w-64 bg-gray-200 p-4">
          <Sidebar />
        </aside>
        <div className="flex-grow p-4">
          <Breadcrumb pageName="My Profile Dashboard" />

          <div className="grid grid-cols-5 gap-8 ">
            
            <UserProfileForm/>

            <UserProfileChangePasswordFor/>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
