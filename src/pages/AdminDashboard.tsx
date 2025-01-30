import {
  BarChart3,
  Building2,
  Calendar,
  ChevronDown,
  DollarSign,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";
import DataTable from "../components/DataTable";
import SidebarNav from "../components/SidebarNav";
import StatCard from "../components/statCard";
import { getSession } from "@/utils/session";
import { useNavigate } from "react-router-dom";
import { useAllBookings } from "@/hooks/useAdminData";
import useData from "@/hooks/useData";
import { Space } from "@/interfaces/Spaces";

// Sample data - In a real app, this would come from an API
// const recentBookings = [
//   {
//     id: 1,
//     venue: "Cucrid Auditorium",
//     user: "John Doe",
//     date: "2024-01-20",
//     status: "Confirmed",
//     amount: 450,
//   },
//   {
//     id: 2,
//     venue: "HSL Studio",
//     user: "Jane Smith",
//     date: "2024-01-21",
//     status: "Pending",
//     amount: 300,
//   },
//   // Add more bookings as needed
// ];

const session = await getSession();
const role = (await session)?.role;
console.log(role);

export default function AdminDashboard() {
  const navigate = useNavigate();
  console.log(role);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>("dashboard");
  const {
    data: recentBookings,
    //  isLoading, error
  } = useAllBookings();
  const {
    data: Venues,
    //  isLoading, error
  } = useData<Space[]>("/spaces/");
  console.log(role?.value);

  const isadmin = role === "admin";
  if (!isadmin) {
    navigate("/locations");
    console.log("true ooo");
  }

  let revenue = 0;

  const CalculateRevenue = () => {
    for (let i = 0; i < recentBookings?.length!; i++) {
      revenue += recentBookings![i]?.total_cost;
    }
    return revenue;
  };
  revenue = CalculateRevenue();

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
          <SidebarNav />
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
        <main className="flex-1 p-8">
          {/* Stats Grid */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Bookings"
              value={recentBookings?.length}
              icon={Calendar}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Active Venues"
              value={Venues?.length}
              icon={Building2}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Total Users"
              value="892"
              icon={Users}
              trend={{ value: 15, isPositive: true }}
            />
            <StatCard
              title="Revenue"
              value={"$" + revenue}
              icon={DollarSign}
              trend={{ value: 23, isPositive: true }}
            />
          </div>

          {/* Charts Section */}
          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Booking Trends
                </h2>
                <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="h-[300px] w-full">
                <BarChart3 className="h-full w-full text-gray-300" />
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Revenue Analytics
                </h2>
                <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="h-[300px] w-full">
                <BarChart3 className="h-full w-full text-gray-300" />
              </div>
            </div>
          </div>

          {/* Recent Bookings Table */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Bookings
              </h2>
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                View all
              </button>
            </div>
            <DataTable data={recentBookings} />
          </div>
        </main>
      </div>
    </div>
  );
}
