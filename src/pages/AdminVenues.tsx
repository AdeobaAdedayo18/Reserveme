import AddVenueModal from "@/components/AddvenueModal";
import VenueModal from "@/components/EditVenueModal";
import { VenueFormData } from "@/components/VenueForm";
import { toast } from "@/hooks/use-toast";
import useData from "@/hooks/useData";
import { Space } from "@/interfaces/Spaces";
import axiosInstance from "@/utils/axiosInstance";
import { Building2, Plus, Search } from "lucide-react";
import { useState } from "react";

export default function AdminVenuesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: "add" | "edit";
    data?: VenueFormData;
  }>({
    isOpen: false,
    mode: "add",
  });

  const { data: venues, error, refetch } = useData<Space[]>("/spaces/");
  console.log(venues);
  const handleEdit = (venue: Space) => {
    setModalState({
      isOpen: true,
      mode: "edit",
      data: {
        id: venue.id,
        name: venue.name,
        description: venue.description,
        location: venue.location,
        capacity: venue.capacity,
        hourly_rate: venue.hourly_rate,
        is_available: venue.is_available,
        amenities: venue.amenities,
      },
    });
  };

  const handleDelete = async (id: string | undefined) => {
    try {
      await axiosInstance.delete(`/spaces/${id}`);
      toast({
        title: "Venue Deleted",
        description: "Venue has been deleted successfully",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Venue Deletion Failed",
        description: "Failed to delete venue",
        variant: "destructive",
      });
    }
  };

  if (error) {
    toast({
      title: "Something went wrong",
      description: "Failed to fetch venues",
      variant: "destructive",
    });
  }

  return (
    <div>
      <div className="flex-1 p-4 md:p-8">
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Venues</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage and monitor all venues
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="mt-4 md:mt-0 flex items-center gap-2 rounded-lg bg-[#B32406] px-4 py-2 text-sm font-medium text-white hover:bg-[#922005]"
          >
            <Plus className="h-4 w-4" />
            Add New Venue
          </button>
        </div>

        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search venues..."
              className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 focus:border-[#B32406] focus:outline-none focus:ring-1 focus:ring-[#B32406]"
            />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white"></div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 border-b border-gray-200 px-6 py-3 text-sm font-medium text-gray-500">
          <div>Name</div>
          <div>Location</div>
          <div>Capacity</div>
          <div>Hourly Rate</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        {venues?.map((venue) => (
          <div
            key={venue.id}
            className="grid grid-cols-1 md:grid-cols-6 gap-4 border-b border-gray-200 px-6 py-4 last:border-0"
          >
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-gray-400" />
              <span className="font-medium text-gray-900">{venue.name}</span>
            </div>
            <div className="text-gray-500">
              {venue.location.length > 20
                ? `${venue.location.substring(0, 20)}...`
                : venue.location}
            </div>
            <div className="text-gray-500">{venue.capacity} people</div>
            <div className="text-gray-900">${venue.hourly_rate}</div>
            <div>
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                  venue.is_available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {venue.is_available ? "Available" : "Not available"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="rounded-lg border border-gray-200 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50"
                onClick={() => handleEdit(venue)}
              >
                Edit
              </button>
              <button
                className="rounded-lg border border-red-200 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50"
                onClick={() => {
                  handleDelete(venue.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <AddVenueModal
        isOpen={isAddModalOpen}
        refetch={refetch}
        onClose={() => setIsAddModalOpen(false)}
      />
      <VenueModal
        isOpen={modalState.isOpen}
        refetch={refetch}
        mode={modalState.mode}
        initialData={modalState.data}
        onClose={() => setModalState({ isOpen: false, mode: "add" })}
      />
    </div>
  );
}
