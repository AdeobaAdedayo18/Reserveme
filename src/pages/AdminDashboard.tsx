import { useAllBookings } from "@/hooks/useAdminData";
import { getSession } from "@/utils/session";
import { Building2, Calendar, ChevronLeft, Home, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminBookingsPage from "./AdminBookingsPage";
import AdminMainDashboard from "./AdminMainDashboard";
import AdminVenuesPage from "./AdminVenues";
import { Oval } from "react-loader-spinner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigation = [
  { name: "Dashboard", icon: Home, path: "/admin" },
  { name: "Venues", icon: Building2, path: "/admin/venues" },
  { name: "Bookings", icon: Calendar, path: "/admin/bookings" },
];

export default function AdminDashboard() {
  const [session, setSession] = useState<{
    access_token: string;
    user_id: string;
    role: string;
  } | null>(null);
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(false);
  const [currentTab, setCurrentTab] = useState<string>("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      }
    };

    checkSession();
  }, [navigate]);

  // Handle window resize for sidebar collapse
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!session) {
    return <div>Loading...</div>;
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900">
            <span className="text-sm font-bold text-white">RM</span>
          </div>
          <span
            className={`text-lg font-semibold transition-opacity duration-300 ${
              isCollapsed ? "lg:hidden" : ""
            }`}
          >
            ReserveMe
          </span>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:block rounded-lg p-2 hover:bg-gray-100"
        >
          <ChevronLeft
            className={`h-5 w-5 transform transition-transform ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = currentTab === item.name;
          return (
            <button
              key={item.name}
              onClick={() => {
                setCurrentTab(item.name);
                setIsMobileMenuOpen(false);
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
                  isCollapsed ? "lg:hidden" : ""
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );

  return isChecking ? (
    <Oval
      height="60"
      width="60"
      color="black"
      secondaryColor="gray"
      ariaLabel="loading"
      wrapperClass="flex justify-center items-center h-screen"
    />
  ) : (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:block fixed inset-y-0 z-50 border-r border-gray-200 bg-white transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <button className="lg:hidden fixed top-3 left-4 z-50 rounded-lg p-2 bg-white shadow-sm">
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        {/* Top Navigation */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 ml-12 lg:ml-0">
            {currentTab}
          </h1>
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
