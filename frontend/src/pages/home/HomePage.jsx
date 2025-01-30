import { useState } from "react";

import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";

const HomePage = () => {
  const [feedType, setFeedType] = useState("forYou");

  return (
    <>
      <div className="mr-auto min-h-screen flex-[4_4_0] border-r border-gray-700">
        {/* Header */}
        <div className="flex w-full border-b border-gray-700">
          <div
            className={
              "hover:bg-secondary relative flex flex-1 cursor-pointer justify-center p-3 transition duration-300"
            }
            onClick={() => setFeedType("forYou")}
          >
            For you
            {feedType === "forYou" && (
              <div className="bg-primary absolute bottom-0 h-1 w-10 rounded-full"></div>
            )}
          </div>
          <div
            className="hover:bg-secondary relative flex flex-1 cursor-pointer justify-center p-3 transition duration-300"
            onClick={() => setFeedType("following")}
          >
            Following
            {feedType === "following" && (
              <div className="bg-primary absolute bottom-0 h-1 w-10 rounded-full"></div>
            )}
          </div>
        </div>

        {/*  CREATE POST INPUT */}
        <CreatePost />

        {/* POSTS */}
        <Posts feedType={feedType} />
      </div>
    </>
  );
};
export default HomePage;
