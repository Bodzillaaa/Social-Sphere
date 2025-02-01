/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import useUpdateProfile from "../../hooks/useUpdateProfile";

const EditProfileModal = ({ authUser }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    bio: "",
    link: "",
    newPassword: "",
    currentPassword: "",
  });

  const { updateProfile, isUpdatingProfile } = useUpdateProfile();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.fullName,
        username: authUser.username,
        email: authUser.email,
        bio: authUser.bio,
        link: authUser.link,
        currentPassword: "",
        newPassword: "",
      });
    }
  }, [authUser]);

  return (
    <>
      <button
        className="btn btn-outline btn-sm rounded-full"
        onClick={() =>
          document.getElementById("edit_profile_modal").showModal()
        }
      >
        Edit profile
      </button>
      <dialog id="edit_profile_modal" className="modal">
        <div className="modal-box rounded-md border border-gray-700 shadow-md">
          <h3 className="my-3 text-lg font-bold">Update Profile</h3>
          <form
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              await updateProfile(formData);
            }}
          >
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="Full Name"
                className="input input-md flex-1 rounded border border-gray-700 p-2"
                value={formData.fullName}
                name="fullName"
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Username"
                className="input input-md flex-1 rounded border border-gray-700 p-2"
                value={formData.username}
                name="username"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                type="email"
                placeholder="Email"
                className="input input-md flex-1 rounded border border-gray-700 p-2"
                value={formData.email}
                name="email"
                onChange={handleInputChange}
              />
              <textarea
                placeholder="Bio"
                className="input input-md flex-1 rounded border border-gray-700 p-2"
                value={formData.bio}
                name="bio"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                type="password"
                placeholder="Current Password"
                className="input input-md flex-1 rounded border border-gray-700 p-2"
                value={formData.currentPassword}
                name="currentPassword"
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="New Password"
                className="input input-md flex-1 rounded border border-gray-700 p-2"
                value={formData.newPassword}
                name="newPassword"
                onChange={handleInputChange}
              />
            </div>
            <input
              type="text"
              placeholder="Link"
              className="input input-md flex-1 rounded border border-gray-700 p-2"
              value={formData.link}
              name="link"
              onChange={handleInputChange}
            />
            <button className="btn btn-primary btn-sm rounded-full text-white">
              {isUpdatingProfile ? <LoadingSpinner size="sm" /> : "Update"}
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="outline-none">close</button>
        </form>
      </dialog>
    </>
  );
};
export default EditProfileModal;
