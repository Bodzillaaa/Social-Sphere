import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import Posts from "../../components/common/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import EditProfileModal from "./EditProfileModal";

import { POSTS } from "../../utils/db/dummy";

import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const ProfilePage = () => {
  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [feedType, setFeedType] = useState("posts");

  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);

  const isLoading = false;
  const isMyProfile = true;

  const user = {
    _id: "1",
    fullName: "John Doe",
    username: "johndoe",
    profileImg: "/avatars/boy2.png",
    coverImg: "/cover.png",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    link: "https://youtube.com/@asaprogrammer_",
    following: ["1", "2", "3"],
    followers: ["1", "2", "3"],
  };

  const handleImgChange = (e, state) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        state === "coverImg" && setCoverImg(reader.result);
        state === "profileImg" && setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="min-h-screen flex-[4_4_0] border-r border-gray-700">
        {/* HEADER */}
        {isLoading && <ProfileHeaderSkeleton />}
        {!isLoading && !user && (
          <p className="mt-4 text-center text-lg">User not found</p>
        )}
        <div className="flex flex-col">
          {!isLoading && user && (
            <>
              <div className="flex items-center gap-10 px-4 py-2">
                <Link to="/">
                  <FaArrowLeft className="h-4 w-4" />
                </Link>
                <div className="flex flex-col">
                  <p className="text-lg font-bold">{user?.fullName}</p>
                  <span className="text-sm text-slate-500">
                    {POSTS?.length} posts
                  </span>
                </div>
              </div>
              {/* COVER IMG */}
              <div className="group/cover relative">
                <img
                  src={coverImg || user?.coverImg || "/cover.png"}
                  className="h-52 w-full object-cover"
                  alt="cover image"
                />
                {isMyProfile && (
                  <div
                    className="bg-opacity-75 absolute top-2 right-2 cursor-pointer rounded-full bg-gray-800 p-2 opacity-0 transition duration-200 group-hover/cover:opacity-100"
                    onClick={() => coverImgRef.current.click()}
                  >
                    <MdEdit className="h-5 w-5 text-white" />
                  </div>
                )}

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  ref={coverImgRef}
                  onChange={(e) => handleImgChange(e, "coverImg")}
                />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  ref={profileImgRef}
                  onChange={(e) => handleImgChange(e, "profileImg")}
                />
                {/* USER AVATAR */}
                <div className="avatar absolute -bottom-16 left-4">
                  <div className="group/avatar relative w-32 rounded-full">
                    <img
                      src={
                        profileImg ||
                        user?.profileImg ||
                        "/avatar-placeholder.png"
                      }
                    />
                    <div className="bg-primary absolute top-5 right-3 cursor-pointer rounded-full p-1 opacity-0 group-hover/avatar:opacity-100">
                      {isMyProfile && (
                        <MdEdit
                          className="h-4 w-4 text-white"
                          onClick={() => profileImgRef.current.click()}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-end px-4">
                {isMyProfile && <EditProfileModal />}
                {!isMyProfile && (
                  <button
                    className="btn btn-outline btn-sm rounded-full"
                    onClick={() => alert("Followed successfully")}
                  >
                    Follow
                  </button>
                )}
                {(coverImg || profileImg) && (
                  <button
                    className="btn btn-primary btn-sm ml-2 rounded-full px-4 text-white"
                    onClick={() => alert("Profile updated successfully")}
                  >
                    Update
                  </button>
                )}
              </div>

              <div className="mt-14 flex flex-col gap-4 px-4">
                <div className="flex flex-col">
                  <span className="text-lg font-bold">{user?.fullName}</span>
                  <span className="text-sm text-slate-500">
                    @{user?.username}
                  </span>
                  <span className="my-1 text-sm">{user?.bio}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {user?.link && (
                    <div className="flex items-center gap-1">
                      <>
                        <FaLink className="h-3 w-3 text-slate-500" />
                        <a
                          href="https://youtube.com/@asaprogrammer_"
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-blue-500 hover:underline"
                        >
                          youtube.com/@asaprogrammer_
                        </a>
                      </>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <IoCalendarOutline className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-500">
                      Joined July 2021
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold">
                      {user?.following.length}
                    </span>
                    <span className="text-xs text-slate-500">Following</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold">
                      {user?.followers.length}
                    </span>
                    <span className="text-xs text-slate-500">Followers</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex w-full border-b border-gray-700">
                <div
                  className="hover:bg-secondary relative flex flex-1 cursor-pointer justify-center p-3 transition duration-300"
                  onClick={() => setFeedType("posts")}
                >
                  Posts
                  {feedType === "posts" && (
                    <div className="bg-primary absolute bottom-0 h-1 w-10 rounded-full" />
                  )}
                </div>
                <div
                  className="hover:bg-secondary relative flex flex-1 cursor-pointer justify-center p-3 text-slate-500 transition duration-300"
                  onClick={() => setFeedType("likes")}
                >
                  Likes
                  {feedType === "likes" && (
                    <div className="bg-primary absolute bottom-0 h-1 w-10 rounded-full" />
                  )}
                </div>
              </div>
            </>
          )}

          <Posts />
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
