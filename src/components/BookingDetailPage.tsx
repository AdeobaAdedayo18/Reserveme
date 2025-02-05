import { X } from "lucide-react";
import type { AdminBookings } from "@/interfaces/Admin";
import { useEffect, useRef } from "react";
import {
  differenceInHours,
  differenceInMinutes,
  format,
  parseISO,
} from "date-fns";

interface BookingDetailsSidebarProps {
  booking: AdminBookings | null;
  onClose: () => void;
}

const BookingDetailsSidebar = ({
  booking,
  onClose,
}: BookingDetailsSidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const getBookingDetails = (booking: AdminBookings) => {
    const startDate = parseISO(booking.start_time);
    const endDate = parseISO(booking.end_time);

    return {
      formattedDate: format(startDate, "MMMM d, yyyy"),
      formattedTime: `${format(startDate, "h:mm a")} - ${format(
        endDate,
        "h:mm a"
      )}`,
      duration: calculateDuration(startDate, endDate),
    };
  };
  const calculateDuration = (start: Date, end: Date) => {
    const hours = differenceInHours(end, start);
    const minutes = differenceInMinutes(end, start) % 60;

    if (hours === 0) return `${minutes} minutes`;
    if (minutes === 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
    return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minutes`;
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const bookingDetails = booking ? getBookingDetails(booking) : null;

  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div
        ref={sidebarRef}
        className="absolute right-0 h-full w-full max-w-md transform bg-white shadow-xl transition-transform duration-200 ease-in-out"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <h2 className="text-lg font-semibold">Booking Details</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Venue</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {booking.space_name}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">User</h3>
                <p className="mt-1 text-sm text-gray-900">{booking.username}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Purpose</h3>
                <p className="mt-1 text-sm text-gray-900">{booking.purpose}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Date Created
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(booking.created_at).toLocaleString()}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Start - End Time
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {bookingDetails?.formattedDate}{" "}
                  {bookingDetails?.formattedTime}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Receipt ID
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {booking.receipt_id}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <span
                  className={`mt-1 inline-flex rounded-full px-2 py-1 text-xs font-medium
                    ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >
                  {booking.status}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                <p className="mt-1 text-sm text-gray-900">
                  ${booking.total_cost}
                </p>
              </div>

              {/* Additional booking details can be added here */}
            </div>
          </div>

          <div className="border-t border-gray-200 p-4">
            <button
              onClick={onClose}
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSidebar;
