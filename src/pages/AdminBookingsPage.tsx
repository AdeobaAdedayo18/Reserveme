import BookingDetailsSidebar from "@/components/BookingDetailPage";
import { usePage } from "@/hooks/useAdminData";
import type { AdminBookings, AdminBookingsResponse } from "@/interfaces/Admin";
import { useState } from "react";

interface AdminBookingsPageProps {
  data: AdminBookingsResponse | undefined;
}

const AdminBookingsPage = ({ data }: AdminBookingsPageProps) => {
  var bookings = data?.data;
  const pagination = data?.pagination;
  const itemsPerPage = 5;
  const [currentPage] = useState(pagination?.current_page);
  const [selectedBooking, setSelectedBooking] = useState<AdminBookings | null>(
    null
  );

  const [searchQuery, setSearchQuery] = useState("");
  const GetPage = async (pageReq: string) => {
    const { data } = await usePage(pageReq);
    bookings = data?.data;
  };
  // Filter locations based on search query

  const totalPages = data ? Math.ceil(bookings?.length! / itemsPerPage) : 1;
  const startIndex = (currentPage! - 1) * itemsPerPage;
  const paginatedData = bookings?.slice(startIndex, startIndex + itemsPerPage);
  const filteredData =
    bookings?.filter(
      (booking) =>
        booking.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.receipt_id?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
  console.log(bookings);

  return (
    <div className="w-full p-4 sm:p-8">
      <div className="mb-6 flex items-center ">
        {/* <Search className="h-5 w-5 text-gray-400" /> */}
        <input
          type="text"
          placeholder="Search bookings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-400px rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent"
        />
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="whitespace-nowrap px-3 py-3 text-left text-xs font-medium text-gray-500 sm:px-6 sm:text-sm">
                  Venue
                </th>
                <th className="whitespace-nowrap px-3 py-3 text-left text-xs font-medium text-gray-500 sm:px-6 sm:text-sm">
                  User
                </th>
                <th className="whitespace-nowrap px-3 py-3 text-left text-xs font-medium text-gray-500 sm:px-6 sm:text-sm">
                  Date
                </th>
                <th className="whitespace-nowrap px-3 py-3 text-left text-xs font-medium text-gray-500 sm:px-6 sm:text-sm">
                  Status
                </th>
                <th className="whitespace-nowrap px-3 py-3 text-left text-xs font-medium text-gray-500 sm:px-6 sm:text-sm">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredData.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">
                    {bookings?.length === 0
                      ? "No bookings yet."
                      : "No bookings matching your search."}
                  </p>
                </div>
              ) : (
                searchQuery !== "" &&
                filteredData?.map((booking) => (
                  <tr
                    key={booking.id}
                    onClick={() => setSelectedBooking(booking)}
                    className="cursor-pointer transition-colors hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-900 sm:px-6 sm:text-sm">
                      {booking.space_name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-900 sm:px-6 sm:text-sm">
                      {booking.username}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-900 sm:px-6 sm:text-sm">
                      <span className="hidden sm:inline">
                        {new Date(booking.created_at).toDateString()}
                      </span>
                      <span className="sm:hidden">
                        {new Date(booking.created_at).toLocaleDateString()}
                      </span>
                      {new Date(booking.created_at).toLocaleTimeString()}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs sm:px-6 sm:text-sm">
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
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-900 sm:px-6 sm:text-sm">
                      ${booking.total_cost}
                    </td>
                  </tr>
                ))
              )}
              {searchQuery === "" &&
                paginatedData?.map((booking) => (
                  <tr
                    key={booking.id}
                    onClick={() => setSelectedBooking(booking)}
                    className="cursor-pointer transition-colors hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-900 sm:px-6 sm:text-sm">
                      {booking.space_name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-900 sm:px-6 sm:text-sm">
                      {booking.username}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-900 sm:px-6 sm:text-sm">
                      <span className="hidden sm:inline">
                        {new Date(booking.created_at).toDateString()}
                      </span>
                      <span className="sm:hidden">
                        {new Date(booking.created_at).toLocaleDateString()}
                      </span>
                      {new Date(booking.created_at).toLocaleTimeString()}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs sm:px-6 sm:text-sm">
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
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-900 sm:px-6 sm:text-sm">
                      ${booking.total_cost}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {searchQuery === "" && totalPages > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
          <button
            onClick={() => GetPage(pagination?.prev_request!)}
            disabled={currentPage === 1}
            className="rounded-md bg-gray-200 px-4 py-2 text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm">
            Page {currentPage} of {pagination?.total_pages}
          </span>
          <button
            onClick={() => GetPage(pagination?.next_request!)}
            disabled={currentPage === totalPages}
            className="rounded-md bg-gray-200 px-4 py-2 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Booking Details Sidebar */}
      <BookingDetailsSidebar
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
};

export default AdminBookingsPage;
