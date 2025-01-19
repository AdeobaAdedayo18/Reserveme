import VenueBooking from "../components/venue-booking";
import VenueGallery from "../components/venue-gallery";
import VenueHeader from "../components/venure-header";
import logo from "../assets/pexels-solliefoto-298863.jpg";
import pic1 from "../assets/pexels-daiangan-102129.jpg";
import pic2 from "../assets/pexels-kaip-996329.jpg";
import pic3 from "../assets/pexels-pixabay-325876.jpg";
import pic4 from "../assets/pexels-solliefoto-298863.jpg";
import { getSession } from "../utils/session";

const DEMO_IMAGES = [pic1, pic2, pic3, pic4];

const FACILITIES = [
  { icon: "wifi", label: "Free WiFi" },
  { icon: "parking", label: "Parking Available" },
  // Add more facilities as needed
];

// const { username, user_id } = await getSession();
// console.log(username);
// console.log(user_id);

export default function LocationDetail() {
  return (
    <div className="min-h-screen bg-gray-50">
      <VenueHeader />
      <main className="container mx-auto grid gap-6 px-4 py-6 lg:grid-cols-[1fr_400px] lg:gap-8 lg:px-6">
        <div className="space-y-6">
          <VenueGallery images={DEMO_IMAGES} />
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Cucrid Auditorium
              </h1>
              <div className="mt-2 flex items-center gap-2 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 4.989-4 9-8 9s-8-4.011-8-9a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Cucrid auditorium, 1st floor cucrid</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">$450</div>
              <div className="text-sm text-gray-600">/hour</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Conference", "Events", "Meetings", "Workshops"].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-600"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Description
              </h2>
            </div>
            <div className="space-y-4 p-6">
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <button className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200">
                Read more
              </button>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Facilities
              </h2>
            </div>
            <div className="p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {FACILITIES.map((facility) => (
                  <div
                    key={facility.label}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 p-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-rose-600"
                    >
                      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                      <line x1="12" y1="20" x2="12" y2="20" />
                    </svg>
                    <span className="text-gray-700">{facility.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:sticky lg:top-6">
          <VenueBooking price={450} />
        </div>
      </main>
    </div>
  );
}
