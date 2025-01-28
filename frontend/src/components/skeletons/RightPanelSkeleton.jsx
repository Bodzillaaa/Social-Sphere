const RightPanelSkeleton = () => {
  return (
    <div className="my-2 flex w-52 flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="skeleton h-8 w-8 shrink-0 rounded-full"></div>
        <div className="flex flex-1 justify-between">
          <div className="flex flex-col gap-1">
            <div className="skeleton h-2 w-12 rounded-full"></div>
            <div className="skeleton h-2 w-16 rounded-full"></div>
          </div>
          <div className="skeleton h-6 w-14 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
export default RightPanelSkeleton;
