import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserBooking } from "@/interfaces/User";
import { Banknote, Calendar, Printer } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserBookingsListProps {
  bookings: UserBooking[] | null;
}

export function UserBookingsList({ bookings }: UserBookingsListProps) {
  const navigate = useNavigate();
  const [selectedBooking, setSelectedBooking] = useState<UserBooking | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = bookings ? Math.ceil(bookings.length / itemsPerPage) : 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = bookings?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const calculateTimeRemaining = (createdAt: string) => {
    const bookingTime = new Date(createdAt).getTime();
    const currentTime = new Date().getTime();
    const hoursPassed = Math.floor(
      (currentTime - bookingTime) / (1000 * 60 * 60)
    );
    return Math.max(24 - hoursPassed, 0); // 24 hour limit
  };

  const handlePrint = () => {
    navigate(`/receipt/${selectedBooking?.id}`);
  };

  const handlePayment = () => {
    navigate(`/payment-confirmation/${selectedBooking?.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Venue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Amount
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {paginatedBookings?.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {/* {booking.space_name} */}
                        HSL Studio
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(booking.created_at).toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium
                        ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {booking.status}
                    </span>
                    {booking.status === "pending" && (
                      <div className="mt-1 text-sm text-red-500">
                        {calculateTimeRemaining(booking.created_at)} hours
                        remaining before booking expires
                      </div>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    ${booking.total_cost}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedBooking(booking)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(startIndex + itemsPerPage, bookings?.length || 0)}
                </span>{" "}
                of <span className="font-medium">{bookings?.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <Button
                  variant="outline"
                  className="rounded-l-md"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  className="rounded-r-md"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Booking Details Dialog */}
      <Dialog
        open={!!selectedBooking}
        onOpenChange={() => setSelectedBooking(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Venue</p>
                  <p className="text-sm">
                    {/* {selectedBooking.space_name} */}
                    HSL Stufio
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">
                    Date & Time
                  </p>
                  <p className="text-sm">
                    {new Date(selectedBooking.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium
                      ${
                        selectedBooking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {selectedBooking.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Amount</p>
                  <p className="text-sm">${selectedBooking.total_cost}</p>
                </div>
              </div>
              {selectedBooking.status === "confirmed" && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handlePrint}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print Booking Details
                </Button>
              )}
              {selectedBooking.status === "pending" && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handlePayment}
                >
                  <Banknote className="mr-2 h-4 w-4" />
                  Complete Payment
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
