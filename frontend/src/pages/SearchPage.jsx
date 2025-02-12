import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";

const SearchPage = () => {
  const [content, setContent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const handleSearch = async (e) => {
    e.preventDefault();
    if (
      searchQuery === authUser.username ||
      searchQuery === authUser.username.toLowerCase()
    ) {
      toast.error("You cannot search yourself!");
      setSearchQuery("");
    } else {
      try {
        const response = await fetch(`/api/users/search/${searchQuery}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Error searching user!");
        }
        setContent(data);
      } catch (error) {
        console.error(`Error searching user: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex-[4_4_0] border-r border-l border-gray-700">
      <form
        className="my-5 flex items-center justify-center"
        onSubmit={handleSearch}
      >
        <label className="input w-[80%]">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="grow"
          />
          <button className="cursor-pointer p-2">
            <IoSearch className="size-6" />
          </button>
        </label>
      </form>

      {content?.length === 0 && (
        <div className="p-4 text-center font-bold">
          No users found based on your search
        </div>
      )}

      <div className="border-t border-gray-700">
        {content?.map((user) => (
          <div
            className="flex gap-8 border-b border-gray-700 p-4"
            key={user.id}
          >
            <img
              src={user.profileImg}
              alt=""
              className="size-24 rounded-full"
            />

            <div className="flex flex-col justify-center gap-1">
              <p className="text-md font-extrabold md:text-xl">
                {user.fullName}
              </p>
              <p className="hover:text-primary md:text-md text-sm hover:underline">
                <a href={`/profile/${user.username}`}>@{user.username}</a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
