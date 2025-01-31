import { Search, UserPlus } from "lucide-react";

export default function AdminUsersPage() {
  // Sample data - replace with actual data
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      joinedDate: "Jan 15, 2024",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Inactive",
      joinedDate: "Jan 20, 2024",
    },
    // Add more users as needed
  ];

  return (
    <div className="flex-1 p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Users</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage user accounts and permissions
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-[#B32406] px-4 py-2 text-sm font-medium text-white hover:bg-[#922005]">
          <UserPlus className="h-4 w-4" />
          Add New User
        </button>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 focus:border-[#B32406] focus:outline-none focus:ring-1 focus:ring-[#B32406]"
          />
        </div>
        <select className="rounded-lg border border-gray-200 px-4 py-2 focus:border-[#B32406] focus:outline-none focus:ring-1 focus:ring-[#B32406]">
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="grid grid-cols-6 gap-4 border-b border-gray-200 px-6 py-3 text-sm font-medium text-gray-500">
          <div>Name</div>
          <div>Email</div>
          <div>Role</div>
          <div>Status</div>
          <div>Joined Date</div>
          <div>Actions</div>
        </div>
        {users.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-6 gap-4 border-b border-gray-200 px-6 py-4 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600">
                {user.name.charAt(0)}
              </div>
              <span className="font-medium text-gray-900">{user.name}</span>
            </div>
            <div className="text-gray-500">{user.email}</div>
            <div>
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                  user.role === "Admin"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {user.role}
              </span>
            </div>
            <div>
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                  user.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {user.status}
              </span>
            </div>
            <div className="text-gray-500">{user.joinedDate}</div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-gray-200 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-50">
                Edit
              </button>
              <button className="rounded-lg border border-red-200 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
