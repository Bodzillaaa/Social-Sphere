const ProfileHeaderSkeleton = () => {
  return (
    <div className="my-2 flex w-full flex-col gap-2 p-4">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 gap-1">
          <div className="flex w-full flex-col gap-1">
            <div className="skeleton h-4 w-12 rounded-full"></div>
            <div className="skeleton h-4 w-16 rounded-full"></div>
            <div className="skeleton relative h-40 w-full">
              <div className="skeleton absolute -bottom-10 left-3 h-20 w-20 rounded-full border"></div>
            </div>
            <div className="skeleton mt-4 ml-auto h-6 w-24 rounded-full"></div>
            <div className="skeleton mt-4 h-4 w-14 rounded-full"></div>
            <div className="skeleton h-4 w-20 rounded-full"></div>
            <div className="skeleton h-4 w-2/3 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileHeaderSkeleton;
