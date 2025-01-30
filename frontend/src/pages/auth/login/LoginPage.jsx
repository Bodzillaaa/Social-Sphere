import XSvg from "../../../components/svgs/X";

import { useState } from "react";
import { Link } from "react-router-dom";
import { MdPassword } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (!response.ok)
          throw new Error(
            data.error || "Failed to login. Something went wrong",
          );
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="mx-auto flex h-screen max-w-screen-xl">
      <div className="hidden flex-1 items-center justify-center lg:flex">
        <XSvg className="fill-white lg:w-2/3" />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <XSvg className="w-24 fill-white lg:hidden" />
          <h1 className="text-4xl font-extrabold text-white">{"Let's"} go.</h1>
          <label className="input input-bordered flex items-center gap-2 rounded">
            <FaUser />
            <input
              type="text"
              className="grow"
              placeholder="username"
              name="username"
              onChange={handleInputChange}
              value={formData.username}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 rounded">
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
            {isPending ? "Loading..." : "Login"}
          </button>
          {isError && <p className="text-red-500">{error.message}</p>}
        </form>
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-lg text-white">{"Don't"} have an account?</p>
          <Link to="/signup">
            <button className="btn btn-primary btn-outline w-full rounded-full text-white">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
