import { Link } from "react-router-dom";
import XSvg from "../svgs/X";

import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
  const data = {
    username: "john_doe",
    fullName: "John Doe",
    profileImg: "/avatars/boy1.png",
  };

  return (
    <div className="w-18 max-w-52 md:flex-[2_2_0]">
      <div className="sticky top-0 left-0 flex h-screen w-20 flex-col border-r border-gray-700 md:w-full">
        <Link to="/" className="flex justify-center md:justify-start">
          <XSvg className="h-12 w-12 rounded-full fill-white px-2 hover:bg-stone-900" />
        </Link>
        <ul className="mt-4 flex flex-col gap-3">
          <li className="flex justify-center md:justify-start">
            <Link
              to="/"
              className="flex max-w-fit cursor-pointer items-center gap-3 rounded-full py-2 pr-4 pl-2 transition-all duration-300 hover:bg-stone-900"
            >
              <MdHomeFilled className="h-8 w-8" />
              <span className="hidden text-lg md:block">Home</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start">
            <Link
              to="/notifications"
              className="flex max-w-fit cursor-pointer items-center gap-3 rounded-full py-2 pr-4 pl-2 transition-all duration-300 hover:bg-stone-900"
            >
              <IoNotifications className="h-6 w-6" />
              <span className="hidden text-lg md:block">Notifications</span>
            </Link>
          </li>

          <li className="flex justify-center md:justify-start">
            <Link
              to={`/profile/${data?.username}`}
              className="flex max-w-fit cursor-pointer items-center gap-3 rounded-full py-2 pr-4 pl-2 transition-all duration-300 hover:bg-stone-900"
            >
              <FaUser className="h-6 w-6" />
              <span className="hidden text-lg md:block">Profile</span>
            </Link>
          </li>
        </ul>
        {data && (
          <Link
            to={`/profile/${data.username}`}
            className="mt-auto mb-10 flex items-start gap-2 rounded-full px-4 py-2 transition-all duration-300 hover:bg-[#181818]"
          >
            <div className="avatar hidden md:inline-flex">
              <div className="w-8 rounded-full">
                <img src={data?.profileImg || "/avatar-placeholder.png"} />
              </div>
            </div>
            <div className="flex flex-1 justify-between">
              <div className="hidden md:block">
                <p className="w-20 truncate text-sm font-bold text-white">
                  {data?.fullName}
                </p>
                <p className="text-sm text-slate-500">@{data?.username}</p>
              </div>
              <BiLogOut className="h-5 w-5 cursor-pointer" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
