import { Search } from "lucide-react";

export function ShowcaseHeader() {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Discover Spaces
        </h1>
        <p className="mt-1 text-gray-600">
          Find and book the perfect venue for your next event
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-2xl border bg-white px-4 py-2 shadow-sm">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="search"
          placeholder="Search venues..."
          className="w-full min-w-[200px] border-0 bg-transparent text-sm focus:outline-none focus:ring-0"
        />
      </div>
    </div>
  );
}
