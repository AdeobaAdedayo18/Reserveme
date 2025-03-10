import { BookingTrendsChart } from "@/components/BookingTrendsChart";
import DataTable from "@/components/DataTable";
import { RevenueAnalyticsChart } from "@/components/RevenueAnalytics";
import StatCard from "@/components/statCard";
import { useAllBookings } from "@/hooks/useAdminData";
import useFetchData from "@/hooks/useFetchData";
import type { Space } from "@/interfaces/Spaces";
import { Building2, Calendar, DollarSign } from "lucide-react";

const AdminMainDashboard = () => {
  const { data } = useAllBookings();
  const { data: Venues } = useFetchData<Space[]>("/spaces");
  const recentBookings = data?.data;

  const revenue =
    recentBookings?.reduce((total, booking) => total + booking.total_cost, 0) ||
    0;

  return (
    <main className="flex-1 p-4 sm:p-8">
      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          title="Revenue"
          value={`$${revenue}`}
          icon={DollarSign}
          trend={{ value: 23, isPositive: true }}
        />
      </div>

      {/* Charts Section */}
      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
          <BookingTrendsChart bookings={recentBookings || []} />
        </div>
        <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
          <RevenueAnalyticsChart bookings={recentBookings || []} />
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Bookings
          </h2>
          <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
            View all
          </button>
        </div>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <DataTable data={recentBookings} />
        </div>
      </div>
    </main>
  );
};

export default AdminMainDashboard;
