import React, { useState, useEffect } from "react";
import SuperAdminNavBar from "../../components/NavBars/SuperAdminNavBar";
import SuperAdminEnquiryForm from "../Forms/SuperAdminEnquiryForm";

export const SuperAdminEnquiry = () => {
  const [admins, setAdmins] = useState([]);


  return (
    <div className="flex flex-auto p-3">
      <div>
        <SuperAdminNavBar />
      </div>

      <div>
        <div className="w-full gap-4 p-4">
          {/* Add your components here */}
          
            <SuperAdminEnquiryForm />
       
        </div>
        
        
      </div>
    </div>
  );
};

export default SuperAdminEnquiry;
