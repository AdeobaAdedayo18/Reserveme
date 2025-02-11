import type { AdminBookings } from "@/interfaces/Admin";

interface DataTableProps {
  data: AdminBookings[] | undefined;
}

const DataTable = ({ data }: DataTableProps) => {
  const bookings = data;

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden sm:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                Venue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                User
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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {bookings?.map((booking) => (
              <tr key={booking.id}>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {booking.space_name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {booking.username}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {new Date(booking.created_at).toDateString()}{" "}
                  {new Date(booking.created_at).toLocaleTimeString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
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
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  ${booking.total_cost}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 sm:hidden">
        {bookings?.map((booking) => (
          <div
            key={booking.id}
            className="rounded-lg border border-gray-200 bg-white p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">
                {booking.space_name}
              </span>
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
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">User:</span>
                <span className="text-gray-900">{booking.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date:</span>
                <span className="text-gray-900">
                  {new Date(booking.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Time:</span>
                <span className="text-gray-900">
                  {new Date(booking.created_at).toLocaleTimeString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount:</span>
                <span className="text-gray-900">${booking.total_cost}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DataTable;
