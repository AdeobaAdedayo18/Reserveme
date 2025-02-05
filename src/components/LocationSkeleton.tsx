import { Skeleton } from "./ui/skeleton";

const LocationSkeleton = () => {
  const locations = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {locations?.map((location) => (
        <Skeleton key={location} className="h-[400px]  rounded-3xl" />
      ))}
    </div>
    // <div className="flex flex-col space-y-3">
    //   <Skeleton className="h-[125px] w-[250px] rounded-xl" />
    // </div>
  );
};

export default LocationSkeleton;
