import DataTable from "@/components/DataTable";
import StatCard from "@/components/statCard";
import { useAllBookings } from "@/hooks/useAdminData";
import useData from "@/hooks/useData";
import { Space } from "@/interfaces/Spaces";
import {
  BarChart3,
  Building2,
  Calendar,
  DollarSign,
  Users,
} from "lucide-react";

const AdminMainDashboard = () => {
  const {
    data: recentBookings,
    //  isLoading, error
  } = useAllBookings();
  const {
    data: Venues,
    //  isLoading, error
  } = useData<Space[]>("/spaces/");
  let revenue = 0;

  const CalculateRevenue = () => {
    for (let i = 0; i < recentBookings?.length!; i++) {
      revenue += recentBookings![i]?.total_cost;
    }
    return revenue;
  };
  revenue = CalculateRevenue();
  return (
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
  );
};

export default AdminMainDashboard;
