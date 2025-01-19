import { LocationCard } from "../components/locationCard";
import { ShowcaseHeader } from "../components/showcaseHeader";
import useData from "../hooks/useData";
import { Space } from "../interfaces/Spaces";
// import { getSession } from "../utils/session";

// In a real app, this would come from an API
const locations = [
  {
    id: 1,
    name: "Cucrid Auditorium",
    description:
      "Experience the best seating and air conditioning for ultimate comfort. Perfect for conferences, performances, and large gatherings.",
    image: "/placeholder.svg?height=400&width=600",
    detailPath: "/cucrid-auditorium",
    category: "Auditorium",
    price: "From $450/hour",
  },
  {
    id: 2,
    name: "HSL Studio",
    description:
      "A studio with the best lighting and sound system for your events. Ideal for recordings, photoshoots, and intimate performances.",
    image: "/placeholder.svg?height=400&width=600",
    detailPath: "/hsl-studio",
    category: "Studio",
    price: "From $200/hour",
  },
  {
    id: 3,
    name: "Garden Terrace",
    description:
      "Beautiful outdoor space with stunning views. Perfect for weddings, parties, and social gatherings.",
    image: "/placeholder.svg?height=400&width=600",
    detailPath: "/garden-terrace",
    category: "Outdoor",
    price: "From $300/hour",
  },
  {
    id: 4,
    name: "Conference Center",
    description:
      "Modern meeting spaces equipped with the latest technology. Ideal for business meetings and workshops.",
    image: "/placeholder.svg?height=400&width=600",
    detailPath: "/conference-center",
    category: "Business",
    price: "From $150/hour",
  },
  {
    id: 5,
    name: "Art Gallery",
    description:
      "Elegant space with perfect lighting for exhibitions. Great for art shows, receptions, and cultural events.",
    image: "/placeholder.svg?height=400&width=600",
    detailPath: "/art-gallery",
    category: "Gallery",
    price: "From $250/hour",
  },
  {
    id: 6,
    name: "Rooftop Lounge",
    description:
      "Spectacular city views with indoor and outdoor areas. Perfect for corporate events and private parties.",
    image: "/placeholder.svg?height=400&width=600",
    detailPath: "/rooftop-lounge",
    category: "Lounge",
    price: "From $400/hour",
  },
];

// const access_token = await getSession();
// console.log(access_token);

export default function Showcase() {
  const { data, isLoading, error } = useData<Space[]>("/spaces/");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ShowcaseHeader />

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
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
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {locations?.map((location) => (
            <LocationCard key={location.id} {...location} />
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
