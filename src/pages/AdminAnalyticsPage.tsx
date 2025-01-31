import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  Users,
  Calendar,
  Building2,
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$24,567",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Total Users",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Total Bookings",
      value: "856",
      change: "-3.1%",
      trend: "down",
      icon: Calendar,
    },
    {
      title: "Active Venues",
      value: "12",
      change: "+2",
      trend: "up",
      icon: Building2,
    },
  ];

  return (
    <div className="flex-1 p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Analytics</h2>
        <p className="mt-1 text-sm text-gray-500">
          Monitor key metrics and performance indicators
        </p>
      </div>

      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-lg border border-gray-200 bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <stat.icon className="h-5 w-5 text-gray-400" />
              <span
                className={`flex items-center text-sm font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUp className="mr-1 h-4 w-4" />
                ) : (
                  <ArrowDown className="mr-1 h-4 w-4" />
                )}
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">
                {stat.title}
              </h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts would go here - using placeholder for now */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-medium text-gray-900">
            Revenue Overview
          </h3>
          <div className="aspect-[4/3] rounded-lg bg-gray-100"></div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-medium text-gray-900">
            Booking Trends
          </h3>
          <div className="aspect-[4/3] rounded-lg bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}
