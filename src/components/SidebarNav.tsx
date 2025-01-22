import {
  BarChart3,
  Building2,
  Calendar,
  Home,
  Settings,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Dashboard", icon: Home, path: "/admin" },
  { name: "Venues", icon: Building2, path: "/admin/venues" },
  { name: "Bookings", icon: Calendar, path: "/admin/bookings" },
  { name: "Users", icon: Users, path: "/admin/users" },
  { name: "Analytics", icon: BarChart3, path: "/admin/analytics" },
  { name: "Settings", icon: Settings, path: "/admin/settings" },
];

const SidebarNav = () => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  return (
    <nav className="space-y-1">
      {navigation.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
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
  );
};

export default SidebarNav;
