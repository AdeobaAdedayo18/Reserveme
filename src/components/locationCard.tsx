import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import dashboard from "../assets/pexels-pixabay-269140.jpg";
import { Space } from "../interfaces/Spaces";

interface LocationCardProps {
  Space: Space;
}

export function LocationCard({ Space }: LocationCardProps) {
  const navigate = useNavigate();

  return (
    <div className="group relative flex h-[400px] cursor-pointer flex-col overflow-hidden rounded-3xl bg-gray-100">
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/5 via-black/25 to-black/60" />

      <img
        src={dashboard || "/placeholder.svg"}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-110"
      />

      <div className="relative z-20 flex h-full flex-col justify-end p-6">
        <div className="transform transition-transform duration-500 group-hover:translate-y-[-8px]">
          {/* <div className="mb-2 inline-flex rounded-full bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm">
            {category}
          </div> */}
          <h2 className="mb-2 text-2xl font-semibold text-white">
            {Space.name}
          </h2>
          <p className="mb-4 line-clamp-2 text-gray-200">{Space.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-md font-medium text-white">
              ${Space.hourly_rate}/hour
            </span>
            <button
              onClick={() => navigate(`/location/${Space.id}`)}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              View Details
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
