import type { AdminBookings } from "@/interfaces/Admin";

interface AdminBookingsPageProps {
  data: AdminBookings[] | null;
}

const AdminBookingsPage = ({ data }: AdminBookingsPageProps) => {
  return (
    <div className="w-full p-4 sm:p-8">
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
              {data?.map((booking) => (
                <tr key={booking.id}>
                  <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-900 sm:px-6 sm:text-sm">
                    {booking.space_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-900 sm:px-6 sm:text-sm">
                    {booking.username}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-xs text-gray-900 sm:px-6 sm:text-sm">
                    <span className="hidden sm:inline">
                      {new Date(booking.created_at).toDateString()}{" "}
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
    </div>
  );
};

export default AdminBookingsPage;
