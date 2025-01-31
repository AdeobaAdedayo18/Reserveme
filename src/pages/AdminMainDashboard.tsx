import { BookingTrendsChart } from "@/components/BookingTrendsChart";
import DataTable from "@/components/DataTable";
import { RevenueAnalyticsChart } from "@/components/RevenueAnalytics";
import StatCard from "@/components/statCard";

import { useAllBookings } from "@/hooks/useAdminData";
import useData from "@/hooks/useData";
import type { Space } from "@/interfaces/Spaces";
import { Building2, Calendar, DollarSign } from "lucide-react";

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
          title="Revenue"
          value={"$" + revenue}
          icon={DollarSign}
          trend={{ value: 23, isPositive: true }}
        />
      </div>

      {/* Charts Section */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <BookingTrendsChart bookings={recentBookings || []} />
        <RevenueAnalyticsChart bookings={recentBookings || []} />
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
