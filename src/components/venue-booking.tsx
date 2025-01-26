import { format } from "date-fns";
import { useState, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import { useLocation, useNavigate } from "react-router-dom";
import { SpaceBookingTimeSlot } from "../interfaces/Spaces";
import useData from "../hooks/useData";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";
import useAdd from "@/hooks/useAdd";
import { Booking } from "@/interfaces/Booking";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
interface VenueBookingProps {
  price: number;
  user: string;
  id: string | undefined;
}

const VenueBooking = ({ price, user, id }: VenueBookingProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const config = {
    public_key: "FLWPUBK_TEST-e7c8f332b9d34b01b958cf4f4f643018-X",
    tx_ref: Date.now(),
    amount: amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "adeobaadedayo18@gmail.com",
      // phone_number: phone,
      name: name,
    },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);
  const location = useLocation(); // To handle query params after login
  const [bookings, setBookings] = useState<Booking>({
    space_id: id,
    start_time: "",
    end_time: "",
    purpose: "",
  });

  // Pre-fill data from query params if coming back after login
  const queryParams = new URLSearchParams(location.search);
  const prefilledPurpose = queryParams.get("prefilledPurpose") || "";
  const prefilledStartTime = queryParams.get("startTime") || "";
  const prefilledEndTime = queryParams.get("endTime") || "";

  const [purpose, setPurpose] = useState<string>(prefilledPurpose);

  const [selectedSlots, setSelectedSlots] = useState(
    prefilledStartTime && prefilledEndTime
      ? [{ start: prefilledStartTime, end: prefilledEndTime, available: true }]
      : []
  );

  const { data, isLoading, error } = useData<SpaceBookingTimeSlot[]>(
    `/bookings/taken/${id}`
  );

  const {
    addData,
    responseData,
    error: addError,
    isLoading: addLoading,
  } = useAdd<Booking, any>("/bookings/");

  const bookedDates = useMemo(() => {
    const dates =
      data?.map((booking) => new Date(booking.start_time).toDateString()) || [];
    return new Set(dates);
  }, [data]);

  const TIME_SLOTS = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const hour = i + 8;
      return {
        start: `${hour}:00`,
        end: `${hour + 1}:00`,
        available: true,
      };
    });
  }, []);

  const ValidateInputs = () => {
    if (!purpose.trim()) {
      toast({
        title: "Validation Error",
        description: "Purpose is required.",
        variant: "destructive",
      });
      return;
    }

    const formatTime = (time: string) => {
      const [hours, minutes] = time.split(":").map(Number);
      if (!date) throw new Error("Date is undefined");
      const newDate = new Date(date);
      newDate.setHours(hours, minutes, 0, 0);
      return newDate.toISOString();
    };

    setBookings({
      space_id: id,
      start_time: formatTime(selectedSlots[0].start),
      end_time: formatTime(selectedSlots[selectedSlots.length - 1].end),
      purpose: purpose,
    });
  };

  const handleSubmit = () => {
    ValidateInputs();

    if (user) {
      addData(bookings);
      toast({
        title: "Scheduled: Catch up",
        description: "Your booking is being processed.",
        action: (
          <ToastAction altText="Goto schedule to undo">
            Go to schedule
          </ToastAction>
        ),
      });
      navigate("/receipt");
    } else {
      // Redirect to login with booking details in query params
      toast({
        title: "Authentication Required",
        description: "You need to be logged in to proceed.",
        variant: "destructive",
      });
      const callbackUrl = `/location/${id}`;
      const searchParams = new URLSearchParams({
        purpose: purpose,
        startTime: selectedSlots[0]?.start || "",
        endTime: selectedSlots[selectedSlots.length - 1]?.end || "",
      });
      navigate(`/login?${searchParams.toString()}&callbackUrl=${callbackUrl}`);
    }
  };
  const [date, setDate] = useState<Date>();

  const [totalAmount, setTotalAmount] = useState<number>(0);

  const calculateAmount = (slots: (typeof TIME_SLOTS)[0][]) => {
    setTotalAmount(slots.length * price);
  };

  const areSlotsSequential = (slots: (typeof TIME_SLOTS)[0][]) => {
    if (slots.length < 2) return true;
    const sortedSlots = [...slots].sort(
      (a, b) => parseInt(a.start) - parseInt(b.start)
    );
    for (let i = 1; i < sortedSlots.length; i++) {
      const prevEnd = parseInt(sortedSlots[i - 1].end);
      const currStart = parseInt(sortedSlots[i].start);
      if (prevEnd !== currStart) return false;
    }
    return true;
  };

  const toggleSlot = (slot: (typeof TIME_SLOTS)[0]) => {
    let updatedSlots;
    if (selectedSlots.includes(slot)) {
      updatedSlots = selectedSlots.filter((s) => s !== slot);
    } else {
      updatedSlots = [...selectedSlots, slot];
    }
    if (areSlotsSequential(updatedSlots)) {
      setSelectedSlots(updatedSlots);
      calculateAmount(updatedSlots);
    } else {
      alert("Selected slots must be sequential.");
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-200 bg-neutral-50/50 p-6">
        <h2 className="text-lg font-semibold text-neutral-900">
          Book Your Slot
        </h2>
        <p className="mt-1 text-sm text-neutral-600">
          Select your preferred date and time
        </p>
      </div>
      <div className="grid gap-6 p-6">
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white p-3 shadow-sm">
          <DayPicker
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={
              bookedDates.size > 0
                ? Array.from(bookedDates).map((d) => new Date(d))
                : []
            }
            className="mx-auto"
            classNames={{
              months:
                "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button:
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell:
                "text-neutral-600 rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "h-9 w-9 text-center text-sm p-0 relative",
              day: "h-9 w-9 p-0 font-normal hover:bg-neutral-100 rounded-md",
              day_selected: "bg-rose-600 text-white hover:bg-rose-600",
              day_today: "bg-neutral-50 text-neutral-900",
              day_outside: "text-neutral-400",
              day_disabled: "text-neutral-400 opacity-50",
              day_hidden: "invisible",
            }}
          />
        </div>
        {date && (
          <div className="space-y-4">
            <div className="font-medium text-neutral-900">
              Available times for {format(date, "MMMM do, yyyy")}:
            </div>
            <div className="h-[300px] space-y-2 overflow-auto rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
              {TIME_SLOTS.map((slot, i) => (
                <button
                  key={i}
                  disabled={!slot.available}
                  onClick={() => toggleSlot(slot)}
                  className={`
                    w-full rounded-lg border p-3 text-left transition-all
                    ${
                      !slot.available
                        ? "cursor-not-allowed border-neutral-200 bg-neutral-50 opacity-50"
                        : "border-neutral-200 hover:border-rose-500 hover:shadow-md"
                    }
                    ${
                      selectedSlots.includes(slot)
                        ? "border-rose-500 bg-rose-50 text-rose-900 shadow-sm"
                        : "bg-white"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {slot.start} - {slot.end}
                    </span>
                    {selectedSlots.includes(slot) && (
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
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
            {/* {selectedSlots.length > 0 &&( */}
            {/* )} */}
          </div>
        )}
        <div className="space-y-4 rounded-xl border border-neutral-200 bg-neutral-50/50 p-4">
          <div>
            <h4 className="font-medium text-neutral-900">Booking Summary</h4>
            <div className="mt-2 space-y-1">
              {selectedSlots.map((slot, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-neutral-600">
                    {slot.start} - {slot.end}
                  </span>
                  <span className="font-medium text-neutral-900">${price}</span>
                </div>
              ))}
              <div className="mt-2 flex justify-between border-t border-neutral-200 pt-2 font-medium">
                <span>Total Amount</span>
                <span>${totalAmount}</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-neutral-700">
              Purpose<span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-neutral-300 shadow-sm p-2"
              placeholder="Enter the purpose of booking"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-rose-700 hover:shadow-md"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenueBooking;
