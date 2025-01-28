import XSvg from "../../../components/svgs/X";
import { Link } from "react-router-dom";
import { useState } from "react";

import {
  MdDriveFileRenameOutline,
  MdPassword,
  MdOutlineMail,
} from "react-icons/md";
import { FaUser } from "react-icons/fa";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isError = false;

  return (
    <div className="mx-auto flex h-screen max-w-screen-xl px-10">
      <div className="hidden flex-1 items-center justify-center lg:flex">
        <XSvg className="fill-white lg:w-2/3" />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <form
          className="mx-auto flex flex-col gap-4 md:mx-20 lg:w-2/3"
          onSubmit={handleSubmit}
        >
          <XSvg className="w-24 fill-white lg:hidden" />
          <h1 className="mb-5 text-4xl font-extrabold">
            It&apos;s Happenning now
          </h1>

          <h1 className="text-4xl font-bold text-white">Join today.</h1>
          <label className="input input-bordered flex w-full items-center gap-2 rounded">
            <MdOutlineMail />
            <input
              type="email"
              className="grow"
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </label>
          <div className="flex flex-wrap gap-4">
            <label className="input input-bordered flex flex-1 items-center gap-2 rounded">
              <FaUser />
              <input
                type="text"
                className="grow"
                placeholder="Username"
                name="username"
                onChange={handleInputChange}
                value={formData.username}
              />
            </label>
            <label className="input input-bordered flex flex-1 items-center gap-2 rounded">
              <MdDriveFileRenameOutline />
              <input
                type="text"
                className="grow"
                placeholder="Full Name"
                name="fullName"
                onChange={handleInputChange}
                value={formData.fullName}
              />
            </label>
          </div>
          <label className="input input-bordered flex w-full items-center gap-2 rounded">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <button className="btn btn-primary rounded-full text-white">
            Sign up
          </button>
          {isError && <p className="text-red-500">Something went wrong</p>}
        </form>
        <div className="mt-4 flex flex-col gap-2 lg:w-2/3">
          <p className="text-lg text-white">Already have an account?</p>
          <Link to="/login">
            <button className="btn btn-primary btn-outline w-full rounded-full text-white">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
