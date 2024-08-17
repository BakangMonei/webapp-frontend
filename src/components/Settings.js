import React, { useState, useEffect } from "react";
import SportsCard from "../components/Cards/SportsCard";

import userThree from "../assets/images/neizatheedev.png";
import SuperAdminNavBar from "../components/NavBars/SuperAdminNavBar";

const Settings = () => {
  return (
    <div className="flex flex-cols-5 gap-8">
      <div>
        <SuperAdminNavBar />
      </div>
      <div>
        <div>
          <p className="text-black text-6xl font-extrabold text-center items-center underline p-3">Stream here</p>
        </div>
        <SportsCard />
      </div>
    </div>
  );
};

export default Settings;
