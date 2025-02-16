import { Button } from "@/components/ui/button";
import { UserBookingsList } from "@/components/UserBookingList";
import { useUserBookings } from "@/hooks/useUserData";
import { getSession } from "@/utils/session";
import { Calendar, Clock, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [session, setSession] = useState<{
    access_token: string;
    user_id: string;
    role: string;
  } | null>(null);
  const { data, isLoading } = useUserBookings();
  const bookings = data?.data;
  const [isChecking, setIsChecking] = useState(false);
  const navigate = useNavigate();

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

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-sm text-gray-500">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  const upcomingBookings = bookings?.filter(
    (booking) => new Date(booking.created_at) > new Date()
  );

  const pastBookings = bookings?.filter(
    (booking) => new Date(booking.created_at) <= new Date()
  );
  if (!session) {
    return (
      <Oval
        height="60"
        width="60"
        color="black"
        secondaryColor="gray"
        ariaLabel="loading"
        wrapperClass="flex justify-center items-center h-screen"
      />
    );
  }

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
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      <div className="flex-1">
        {/* Top Navigation */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">
          <h1 className="text-2xl font-semibold text-gray-900">My Bookings</h1>
          <Button
            variant="default"
            size="sm"
            color="rose-500"
            onClick={() => navigate("/locations")}
          >
            <Plus className="h-4 w-4" />
            New Booking
          </Button>
        </header>

        <main className="p-8">
          {/* Stats Grid */}
          <div className="mb-3 grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-rows-2">
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">
                  Total Bookings
                </h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {bookings?.length || 0}
                </p>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">
                  Upcoming Bookings
                </h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {upcomingBookings?.length || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Bookings Lists */}
          <div>
            {upcomingBookings && upcomingBookings.length > 0 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Upcoming Bookings
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    View and manage your upcoming reservations
                  </p>
                </div>
                <UserBookingsList bookings={upcomingBookings} />
              </div>
            )}

            {pastBookings && pastBookings.length > 0 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Past Bookings
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    History of your previous reservations
                  </p>
                </div>
                <UserBookingsList bookings={pastBookings} />
              </div>
            )}

            {(!bookings || bookings.length === 0) && (
              <div className="rounded-lg border border-gray-200 bg-white p-8">
                <div className="text-center">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    No Bookings Found
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    You haven't made any bookings yet. Start by exploring our
                    available venues.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
