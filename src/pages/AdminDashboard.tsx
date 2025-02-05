import { useAllBookings } from "@/hooks/useAdminData";
import { getSession } from "@/utils/session";
import { Building2, Calendar, ChevronLeft, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminBookingsPage from "./AdminBookingsPage";
import AdminMainDashboard from "./AdminMainDashboard";
import AdminVenuesPage from "./AdminVenues";
import { toast } from "@/hooks/use-toast";
import { Oval } from "react-loader-spinner";

const navigation = [
  { name: "Dashboard", icon: Home, path: "/admin" },
  { name: "Venues", icon: Building2, path: "/admin/venues" },
  { name: "Bookings", icon: Calendar, path: "/admin/bookings" },
];

export default function AdminDashboard() {
  const [session, setSession] = useState<{
    access_token: string;
    refresh_token: string;
    user_id: string;
    role: string;
  } | null>(null);
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { data: recentBookings } = useAllBookings();

  useEffect(() => {
    const checkSession = async () => {
      setIsChecking(true);
      const sessionData = await getSession();
      setSession(sessionData);

      if (sessionData?.role !== "admin") {
        navigate("/locations");
        setTimeout(() => {
          setIsChecking(false);
        }, 1500);
      } else {
        setIsChecking(false);
        if (window.innerWidth < 768) {
          // 768px is typical tablet breakpoint
          toast({
            title: "Viewing on a small screen",
            description:
              "This page is better viewed on a bigger device or in landscape orientation",
            duration: 5000,
          });
        }
      }
    };

    checkSession();
  }, [navigate]);

  // useEffect(() => {

  // }, []);

  if (!session) {
    return <div>Loading...</div>;
  }
  // if (isChecking) {
  //   <Oval
  //     height="60"
  //     width="60"
  //     // radius="9"
  //     color="black"
  //     secondaryColor="gray"
  //     ariaLabel="three-dots-loading"
  //     // wrapperStyle
  //     wrapperClass="flex justify-center items-center h-screen"
  //   />;
  // }

  return isChecking ? (
    <Oval
      height="60"
      width="60"
      // radius="9"
      color="black"
      secondaryColor="gray"
      ariaLabel="three-dots-loading"
      // wrapperStyle
      wrapperClass="flex justify-center items-center h-screen"
    />
  ) : (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 z-50 border-r border-gray-200 bg-white transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900">
              <span className="text-sm font-bold text-white">RM</span>
            </div>
            <span
              className={`text-lg font-semibold transition-opacity duration-300 ${
                isCollapsed ? "opacity-0" : "opacity-100"
              }`}
            >
              {!isCollapsed && "ReserveMe"}
            </span>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <ChevronLeft
              className={`h-5 w-5 transform transition-transform ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>
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
                  <span
                    className={`transition-opacity duration-300 ${
                      isCollapsed ? "opacity-0 hidden" : "opacity-100"
                    }`}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Top Navigation */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

          <div className="relative"></div>
        </header>

        {/* Dashboard Content */}
        {currentTab === "Dashboard" && <AdminMainDashboard />}
        {currentTab === "Bookings" && (
          <AdminBookingsPage data={recentBookings} />
        )}
        {currentTab === "Venues" && <AdminVenuesPage />}
      </div>
    </div>
  );
}
