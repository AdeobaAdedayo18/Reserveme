import {
  Calendar,
  Clock,
  CreditCard,
  Globe2,
  MessageSquare,
  Search,
  Shield,
  Sparkles,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { FeatureCard } from "../components/ui/featureCard";
import { TestimonialCard } from "../components/ui/testimonialCard";
import dashboard from "../assets/pexels-pixabay-269140.jpg";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-gradient-to-br from-rose-500 to-rose-700 p-2">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">
                ReserveMe
              </span>
            </div>
            <div className="hidden gap-6 md:flex">
              <a href="#features">Features</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#pricing">Pricing</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
            <button
              className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-rose-700 hover:shadow-md"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-white" />
        <div className="relative">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
              <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
                  Book your perfect venue{" "}
                  <span className="text-rose-600">hassle-free</span>
                </h1>
                <p className="mt-4 text-lg text-gray-600 sm:mt-6">
                  Streamline your venue booking experience with our intuitive
                  platform. Find and reserve the perfect space for your next
                  event in minutes.
                </p>
                <div className="mt-8 flex flex-wrap gap-4 sm:mt-10">
                  <button
                    className="rounded-lg bg-rose-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-rose-700 hover:shadow-md"
                    onClick={() => navigate("/locations")}
                  >
                    Start Booking
                  </button>
                  <button className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-rose-600 hover:text-rose-600 hover:shadow-md">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <img
                  src={dashboard}
                  alt="Platform preview"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
                  <Calendar className="h-6 w-6 text-rose-600" />
                </div>
                <div className="absolute -right-4 top-1/4 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
                  <Clock className="h-6 w-6 text-rose-600" />
                </div>
                <div className="absolute -right-4 bottom-1/4 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">
                  <CreditCard className="h-6 w-6 text-rose-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage bookings
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Our platform provides all the tools you need to efficiently manage
              your venue bookings and deliver exceptional experiences.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Search className="h-6 w-6" />}
              title="Easy Search"
              description="Find the perfect venue with our powerful search and filtering system."
            />
            <FeatureCard
              icon={<Calendar className="h-6 w-6" />}
              title="Smart Scheduling"
              description="Manage your bookings with an intelligent calendar system."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Secure Payments"
              description="Process payments securely with our integrated payment system."
            />
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6" />}
              title="Instant Communication"
              description="Stay connected with venue owners through our messaging system."
            />
            <FeatureCard
              icon={<Globe2 className="h-6 w-6" />}
              title="Global Access"
              description="Access your bookings from anywhere in the world."
            />
            <FeatureCard
              icon={<Sparkles className="h-6 w-6" />}
              title="Smart Analytics"
              description="Get insights into your booking patterns and preferences."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Loved by users worldwide
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Don't just take our word for it — hear from some of our satisfied
              users.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="The booking process is incredibly smooth. I found and booked my ideal venue in minutes!"
              author="Sarah Johnson"
              role="Event Planner"
              image="/placeholder.svg?height=100&width=100"
            />
            <TestimonialCard
              quote="As a venue owner, this platform has made managing bookings so much easier."
              author="Michael Chen"
              role="Venue Owner"
              image="/placeholder.svg?height=100&width=100"
            />
            <TestimonialCard
              quote="The customer support is exceptional. They helped me every step of the way."
              author="Emma Davis"
              role="Corporate Manager"
              image="/placeholder.svg?height=100&width=100"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-rose-600" />
        <div className="relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to streamline your bookings?
              </h2>
              <p className="mt-4 text-lg text-rose-100">
                Join thousands of satisfied users and start managing your venue
                bookings more efficiently today.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <button className="rounded-lg bg-white px-6 py-3 text-sm font-medium text-rose-600 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md">
                  Get Started
                </button>
                <button className="rounded-lg border border-white px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-gradient-to-br from-rose-500 to-rose-700 p-2">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">
                  ReserveMe
                </span>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Making venue booking simple and efficient for everyone.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Product</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <NavLink href="#features">Features</NavLink>
                </li>
                <li>
                  <NavLink href="#pricing">Pricing</NavLink>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <NavLink href="#about">About</NavLink>
                </li>
                <li>
                  <NavLink href="#contact">Contact</NavLink>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <NavLink href="#privacy">Privacy</NavLink>
                </li>
                <li>
                  <NavLink href="#terms">Terms</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} ReserveMe. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
