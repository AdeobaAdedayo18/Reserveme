import { toast } from "@/hooks/use-toast";
import useAdd from "@/hooks/useAdd";
import { Space } from "@/interfaces/Spaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const venueSchema = z.object({
  name: z.string().min(1, "Venue name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  is_available: z.boolean(),
  location: z.string().min(1, "Location is required"),
  amenities: z.array(z.string()).min(1, "At least one amenity is required"),
  hourly_rate: z.number().min(1, "Hourly rate must be at least 1"),
});

type VenueFormData = z.infer<typeof venueSchema>;

interface AddVenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

const AMENITY_OPTIONS = [
  "WiFi",
  "Projector",
  "Air Conditioning",
  "Whiteboard",
  "Coffee Machine",
  "Water Dispenser",
  "Parking",
  "Catering",
  "Sound System",
  "TV/Monitor",
];

const AddVenueModal = ({ isOpen, onClose, refetch }: AddVenueModalProps) => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const { mutateAsync } = useAdd<Space, any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VenueFormData>({
    resolver: zodResolver(venueSchema),
    defaultValues: {
      is_available: true,
      amenities: [],
    },
  });

  const onSubmit = async (data: VenueFormData) => {
    console.log("Form submitted with:", data);
    const res = await mutateAsync({ endpoint: "/spaces/", postData: data });
    if (res.id) {
      toast({
        title: "New Venue Created",
        description: "Venue added successfully",
      });
    } else {
      toast({ title: "Failed to add venue", variant: "destructive" });
    }

    reset();
    refetch();
    onClose();
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">
            Add New Venue
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Venue Name
              </label>
              <input
                type="text"
                {...register("name")}
                className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-[#B32406] focus:outline-none focus:ring-1 focus:ring-[#B32406]"
                placeholder="Enter venue name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={3}
                className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-[#B32406] focus:outline-none focus:ring-1 focus:ring-[#B32406]"
                placeholder="Enter venue description"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Capacity
                </label>
                <input
                  type="number"
                  {...register("capacity", { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-[#B32406] focus:outline-none focus:ring-1 focus:ring-[#B32406]"
                  placeholder="Enter capacity"
                />
                {errors.capacity && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.capacity.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  {...register("hourly_rate", { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-[#B32406] focus:outline-none focus:ring-1 focus:ring-[#B32406]"
                  placeholder="Enter hourly rate"
                />
                {errors.hourly_rate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.hourly_rate.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <textarea
                rows={2}
                {...register("location")}
                className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-[#B32406] focus:outline-none focus:ring-1 focus:ring-[#B32406]"
                placeholder="Enter venue location"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amenities
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {AMENITY_OPTIONS.map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register("amenities")}
                      value={amenity}
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                      className="rounded border-gray-300 text-[#B32406] focus:ring-[#B32406]"
                    />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
              {errors.amenities && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.amenities.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register("is_available")}
                className="rounded border-gray-300 text-[#B32406] focus:ring-[#B32406]"
              />
              <label className="text-sm text-gray-700">
                Available for booking
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#B32406] px-4 py-2 text-sm font-medium text-white hover:bg-[#922005]"
            >
              Add Venue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVenueModal;
