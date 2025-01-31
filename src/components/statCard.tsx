import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number | undefined;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard = ({ title, value, icon: Icon, trend }: StatCardProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <div className="mt-2 flex items-baseline">
        <span className="text-2xl font-semibold text-gray-900">{value}</span>
        {trend && (
          <span
            className={`ml-2 text-sm ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.isPositive ? "+" : "-"}
            {trend.value}%
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
