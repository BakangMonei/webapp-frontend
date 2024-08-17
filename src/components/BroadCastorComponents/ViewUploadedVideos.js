import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../Database/firebase";  // Import your firebase configuration
import AdminNavbar from "../NavBars/AdminNavbar";

const ViewUploadedVideos = () => {



  return (
    <div className="flex flex-auto p-1">
    <div>
      <AdminNavbar />
    </div>

    </div>
  );
};

export default ViewUploadedVideos;
