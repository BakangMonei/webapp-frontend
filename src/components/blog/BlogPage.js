import React from "react";
import CreatePost from "./CreatePost";
import Sidebar from "../sidebar/SideBar";

const BlogPage = () => {
  return (
    <main className="h-screen flex flex-col">
      {/* <header className="bg-gray-100 py-4 ">
  <UserSearchBar />
</header> */}
      <div className="flex flex-grow">
        <aside className="w-64 bg-gray-200 p-4">
          <Sidebar />
        </aside>
        <div className="flex-grow p-4">
          <CreatePost />
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
