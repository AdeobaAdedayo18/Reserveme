import LocationSkeleton from "@/components/LocationSkeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocationCard } from "../components/locationCard";
import useData from "../hooks/useData";
import { Space } from "../interfaces/Spaces";

export default function Showcase() {
  const { data, isLoading } = useData<Space[]>("/spaces/");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  // Filter locations based on search query

  const filteredData =
    data?.filter(
      (space) =>
        space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Discover Spaces
            </h1>
            <p className="mt-1 text-gray-600">
              Find and book the perfect venue for your next event
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/dashboard")}
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>

          {/* <div className="flex items-center gap-2 rounded-2xl border bg-white px-4 py-2 shadow-sm">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full min-w-[200px] border-0 bg-transparent text-sm focus:outline-none focus:ring-0 "
              />
            </div> */}
        </div>

        <div className="mb-6 flex items-center ">
          {/* <Search className="h-5 w-5 text-gray-400" /> */}
          <input
            type="text"
            placeholder="Search locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
          />
        </div>

        {/* Grid */}
        {isLoading || data === null ? (
          <LocationSkeleton />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredData.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">
                  No locations found matching your search.
                </p>
              </div>
            ) : (
              filteredData.map((location) => (
                <LocationCard key={location.id} Space={location} />
              ))
            )}
          </div>
        )}
        {/* Load More
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800">
            Load More Venues
          </button>
        </div> */}
      </div>
    </div>
  );
}
