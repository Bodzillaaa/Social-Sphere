import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Posts from "../../components/common/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import EditProfileModal from "./EditProfileModal";

import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";
import { formatMemberSinceDate } from "../../utils/date";
import useFollow from "../../hooks/useFollow";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import useUpdateProfile from "../../hooks/useUpdateProfile";

const ProfilePage = () => {
  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [feedType, setFeedType] = useState("posts");

  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);

  const { username } = useParams();

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const {
    data: user,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/users/profile/${username}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Error fetching user profile");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { data: posts, refetch: refetchPosts } = useQuery({
    queryKey: ["posts"],
  });

  const { updateProfile, isUpdatingProfile } = useUpdateProfile();

  const { follow, isPending: isFollowing } = useFollow({});

  const isMyProfile = authUser?._id === user?._id;
  const memberSinceDate = formatMemberSinceDate(user?.createdAt);
  const isFollow = authUser?.following.includes(user?._id);

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

  useEffect(() => {
    refetch();
  }, [username, refetch]);

  return (
    <>
      <div className="min-h-screen flex-[4_4_0] border-r border-gray-700">
        {/* HEADER */}
        {(isLoading || isRefetching) && <ProfileHeaderSkeleton />}
        {!isLoading && !isRefetching && !user && (
          <p className="mt-4 text-center text-lg">User not found</p>
        )}
        <div className="flex flex-col">
          {!isLoading && !isRefetching && user && (
            <>
              <div className="flex items-center gap-10 px-4 py-2">
                <Link to="/">
                  <FaArrowLeft className="h-4 w-4" />
                </Link>
                <div className="flex flex-col">
                  <p className="text-lg font-bold">{user?.fullName}</p>
                  <span className="text-sm text-slate-500">
                    {/* TODO  */}
                    {posts?.length} posts
                  </span>
                </div>
              </div>
              {/* COVER IMG */}
              <div className="group/cover relative">
                <img
                  src={coverImg || user?.coverImg || "/cover.png"}
                  alt="cover image"
                  className="h-52 w-full cursor-pointer object-cover"
                  {...(isMyProfile && {
                    onClick: () => profileImgRef.current.click(),
                  })}
                />

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
                      className="cursor-pointer"
                      {...(isMyProfile && {
                        onClick: () => profileImgRef.current.click(),
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-end px-4">
                {isMyProfile && <EditProfileModal authUser={authUser} />}
                {!isMyProfile && (
                  <button
                    className="btn btn-outline btn-sm rounded-full"
                    onClick={() => follow(user?._id)}
                  >
                    {isFollowing && <LoadingSpinner size="sm" />}
                    {!isFollowing && isFollow && "Unfollow"}
                    {!isFollowing && !isFollow && "Follow"}
                  </button>
                )}
                {(coverImg || profileImg) && (
                  <button
                    className="btn btn-primary btn-sm ml-2 rounded-full px-4 text-white"
                    onClick={async () => {
                      await updateProfile({ coverImg, profileImg });
                      setCoverImg(null);
                      setProfileImg(null);
                      refetchPosts(); // Refetch posts after profile update
                    }}
                  >
                    {isUpdatingProfile ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      "Update"
                    )}
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
                          href={user?.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-blue-500 hover:underline"
                        >
                          {user?.link}
                        </a>
                      </>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <IoCalendarOutline className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-500">
                      {memberSinceDate}
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

          <Posts
            feedType={feedType}
            username={username}
            userId={user?._id}
            refetchPosts={refetchPosts}
          />
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
