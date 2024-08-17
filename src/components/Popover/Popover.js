import React, { useState } from "react";
import CreateAdmin from "../Forms/CreateAdmin"; // Assuming CreateUserForm is in a separate file
import demoImage from "../../assets/images/neizatheedev.png"

const Popover = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (


    <div class="w-64 p-2 m-auto bg-white shadow-lg rounded-2xl">
      <img
        src={demoImage}
        alt="adidas"
        class="w-32 p-4 m-auto h-36 border rounded-3xl"
      />
      <div class="p-4 m-3 bg-blue-200 rounded-lg">
        <p class="text-xl font-bold text-white ">Create </p>
        <div class="flex items-center justify-between ">
          {/* <p class="text-white"></p> */}
          <p class="text-xl text-gray-50 font-mono">Sport Admin</p>
          <button
          onClick={togglePopover}
            type="button"
            class="w-10 h-10 text-base font-medium text-white bg-blue-500 rounded-full hover:bg-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              class="mx-auto"
              fill="white"
              viewBox="0 0 1792 1792"
            >
              <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z"></path>
            </svg>
          </button>
          {isOpen && (
        <div className="createadmin_container absolute border border-gray-200 items-center justify-self-center">
          <div className="p-4">
            <CreateAdmin />
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default Popover;
