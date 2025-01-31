import { useAllBookings } from "@/hooks/useAdminData";
import { getSession } from "@/utils/session";
import {
  Building2,
  Calendar,
  ChevronDown,
  Home,
  LogOut,
  Settings,
} from "lucide-react";
import { useState } from "react";
import AdminBookingsPage from "./AdminBookingsPage";
import AdminMainDashboard from "./AdminMainDashboard";
import AdminVenuesPage from "./AdminVenues";

const session = await getSession();
const role = (await session)?.role;
const navigation = [
  { name: "Dashboard", icon: Home, path: "/admin" },
  { name: "Venues", icon: Building2, path: "/admin/venues" },
  { name: "Bookings", icon: Calendar, path: "/admin/bookings" },
  // { name: "Users", icon: Users, path: "/admin/users" },
  // { name: "Analytics", icon: BarChart3, path: "/admin/analytics" },
  // { name: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function AdminDashboard() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>("Dashboard");
  const {
    data: recentBookings,
    //  isLoading, error
  } = useAllBookings();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 z-50 w-64 border-r border-gray-200 bg-white">
        <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900">
            <span className="text-sm font-bold text-white">RM</span>
          </div>
          <span className="text-lg font-semibold">ReserveMe</span>
        </div>
        <div className="p-4">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = currentTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setCurrentTab(item.name);

                    console.log(item.name);
                  }}
                  className={`
              flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
              ${
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }
            `}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex flex-1 flex-col">
        {/* Top Navigation */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="Admin"
                className="h-8 w-8 rounded-full"
              />
              <span>Admin User</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Dashboard Content */}

        {currentTab === "Dashboard" && <AdminMainDashboard />}
        {currentTab === "Bookings" && (
          <AdminBookingsPage data={recentBookings} />
        )}
        {/* {currentTab === "Users" && <AdminUsersPage />} */}
        {currentTab === "Venues" && <AdminVenuesPage />}
        {/* {currentTab === "Analytics" && <AdminAnalyticsPage />} */}
      </div>
    </div>
  );
}
