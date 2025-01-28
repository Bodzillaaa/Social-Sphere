const PostSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex items-center gap-4">
        <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-2">
          <div className="skeleton h-2 w-12 rounded-full"></div>
          <div className="skeleton h-2 w-24 rounded-full"></div>
        </div>
      </div>
      <div className="skeleton h-40 w-full"></div>
    </div>
  );
};
export default PostSkeleton;
