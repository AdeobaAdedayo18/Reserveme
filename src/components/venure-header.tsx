import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Black and Red Minimal Calendar with Clock Logo (2).svg";

const VenueHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="flex h-16 w-full items-center justify-between border-b bg-white px-6">
      {/* <div className="flex items-center gap-2" onClick={() => navigate("/")}>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600">
          <span className="text-sm font-bold text-white">VB</span>
        </div>
        <span className="text-lg font-semibold text-gray-900">VenueBook</span>
      </div> */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div>
          <img src={logo} alt="" className="w-10 h-10" />
        </div>
        <span className="text-lg font-semibold text-gray-900">ReserveMe</span>
      </div>
      <div
        onClick={() => navigate("/")}
        className="inline-flex items-center cursor-pointer gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
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
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Dashboard
      </div>
    </header>
  );
};
export default VenueHeader;
