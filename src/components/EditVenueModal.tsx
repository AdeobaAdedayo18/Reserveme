import { X } from "lucide-react";
import VenueForm, { VenueFormData } from "./VenueForm";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "@/hooks/use-toast";

interface VenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
  mode: "add" | "edit";
  initialData?: VenueFormData;
}

export default function VenueModal({
  isOpen,
  onClose,
  mode,
  initialData,
  refetch,
}: VenueModalProps) {
  if (!isOpen) return null;

  const handleSubmit = async (data: VenueFormData) => {
    console.log(
      `${mode === "add" ? "Adding" : "Editing"} venue with data:`,
      data
    );
    try {
      await axiosInstance.put(`/spaces/${initialData?.id}`, data);
      toast({
        title: "Venue Updated",
        description: "Venue has been updated successfully",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Venue Update Failed",
        description: "Failed to update venue",
        variant: "destructive",
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">
            {mode === "add" ? "Add New Venue" : "Edit Venue"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <VenueForm
          onSubmit={handleSubmit}
          onCancel={onClose}
          initialData={initialData}
          submitLabel={mode === "add" ? "Add Venue" : "Save Changes"}
        />
      </div>
    </div>
  );
}
