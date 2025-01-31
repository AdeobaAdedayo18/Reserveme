import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";

const venueSchema = z.object({
  name: z.string().min(1, "Venue name is required"),
  id: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  is_available: z.boolean(),
  location: z.string().min(1, "Location is required"),
  amenities: z.array(z.string()).min(1, "At least one amenity is required"),
  hourly_rate: z.number().min(1, "Hourly rate must be at least 1"),
});

export type VenueFormData = z.infer<typeof venueSchema>;

interface VenueFormProps {
  onSubmit: (data: VenueFormData) => void;
  onCancel: () => void;
  initialData?: VenueFormData;
  submitLabel: string;
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

export default function VenueForm({
  onSubmit,
  onCancel,
  initialData,
  submitLabel,
}: VenueFormProps) {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    initialData?.amenities || []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VenueFormData>({
    resolver: zodResolver(venueSchema),
    defaultValues: initialData || {
      is_available: true,
      amenities: [],
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setSelectedAmenities(initialData.amenities);
    }
  }, [initialData, reset]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
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
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
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
          <input
            type="text"
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
          <label className="text-sm text-gray-700">Available for booking</label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-[#B32406] px-4 py-2 text-sm font-medium text-white hover:bg-[#922005]"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
