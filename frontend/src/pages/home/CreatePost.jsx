import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const {
    mutate: createPost,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ text, img }) => {
      try {
        const response = await fetch("/api/posts/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, img }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Error creating post");
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Post created successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setText("");
      setImg(null);
    },
  });

  const imgRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({ text, img });
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-start gap-4 border-b border-gray-700 p-4">
      <div className="avatar">
        <div className="w-8 rounded-full">
          <img src={authUser.profileImg || "/avatar-placeholder.png"} />
        </div>
      </div>
      <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
        <textarea
          className="textarea w-full resize-none border-none border-gray-800 p-0 text-lg focus:outline-none"
          placeholder="What is happening?!"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {img && (
          <div className="relative mx-auto w-72">
            <IoCloseSharp
              className="absolute top-0 right-0 h-5 w-5 cursor-pointer rounded-full bg-gray-800 text-white"
              onClick={() => {
                setImg(null);
                imgRef.current.value = null;
              }}
            />
            <img
              src={img}
              className="mx-auto h-72 w-full rounded object-contain"
            />
          </div>
        )}

        <div className="flex justify-between border-t border-t-gray-700 py-2">
          <div className="flex items-center gap-1">
            <CiImageOn
              className="fill-primary h-6 w-6 cursor-pointer"
              onClick={() => imgRef.current.click()}
            />
            <BsEmojiSmileFill className="fill-primary h-5 w-5 cursor-pointer" />
          </div>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={imgRef}
            onChange={handleImgChange}
          />
          <button className="btn btn-primary btn-sm rounded-full px-4 text-white">
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>
        {isError && <div className="text-red-500">{error.message}</div>}
      </form>
    </div>
  );
};
export default CreatePost;
