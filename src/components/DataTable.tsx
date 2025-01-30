import { AdminBookings } from "@/interfaces/Admin";

interface DataTableProps {
  data: AdminBookings[] | null;
}

const DataTable = ({ data }: DataTableProps) => {
  console.log(data);

  // Component logic here
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Venue
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                User
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data?.map((booking) => (
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {/* {booking.space_id} */}
                  Cucrid Auditorium
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {/* {booking.user_id} */}
                  Jane Doe
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  {/* {booking.created_at} */}
                  {new Date(booking.created_at).toDateString()}{" "}
                  {new Date(booking.created_at).toLocaleTimeString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium
          ${
            booking.status === "Confirmed"
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
    </div>
  );
};

export default DataTable;
