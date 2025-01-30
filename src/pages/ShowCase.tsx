import { LocationCard } from "../components/locationCard";
import { ShowcaseHeader } from "../components/showcaseHeader";
import useData from "../hooks/useData";
import { Space } from "../interfaces/Spaces";
// import { getSession } from "../utils/session";

// const access_token = await getSession();
// console.log(access_token);

export default function Showcase() {
  const { data, isLoading, error } = useData<Space[]>("/spaces/");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ShowcaseHeader />

        {/* Filters */}
        {/* <div className="mb-6 flex flex-wrap gap-2">
          {[
            "All",
            "Auditorium",
            "Studio",
            "Outdoor",
            "Business",
            "Gallery",
            "Lounge",
          ].map((filter) => (
            <button
              key={filter}
              className="rounded-full border border-gray-200 bg-white px-4 py-1 text-sm font-medium text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50"
            >
              {filter}
            </button>
          ))}
        </div> */}

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.map((location) => (
            <LocationCard key={location.id} Space={location} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800">
            Load More Venues
          </button>
        </div>
      </div>
    </div>
  );
}
