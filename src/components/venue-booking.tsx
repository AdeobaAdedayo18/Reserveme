import { useToast } from "@/hooks/use-toast";
import useAdd from "@/hooks/useAdd";
import useFetchData from "@/hooks/useFetchData";
import { Booking } from "@/interfaces/Booking";
import { getSession } from "@/utils/session";
import { format, isWithinInterval, parseISO } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SpaceBookingTimeSlot } from "../interfaces/Spaces";
interface VenueBookingProps {
  price: number | undefined;
  id: string | undefined;
}

const VenueBooking = ({ price, id }: VenueBookingProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const queryParams = new URLSearchParams(location.search);

  const [date, setDate] = useState<Date | undefined>(
    queryParams.get("date") ? parseISO(queryParams.get("date")!) : undefined
  );
  const [purpose, setPurpose] = useState(queryParams.get("purpose") || "");
  const [selectedSlots, setSelectedSlots] = useState<
    { start: string; end: string }[]
  >(() => {
    const slotsFromUrl = queryParams.get("selectedSlots");
    return slotsFromUrl
      ? slotsFromUrl.split(",").map((slot) => {
          const [start, end] = slot.split("-");
          return { start, end };
        })
      : [];
  });

  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      setUser(session?.user_id || null);
    };
    checkSession();
  }, []);

  const { mutateAsync } = useAdd<Booking, any>();
  const { spaceId } = useParams<{ spaceId: string }>();

  const { data: bookedSlots } = useFetchData<SpaceBookingTimeSlot[]>(
    `/bookings/taken/${spaceId}/`
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate total amount whenever slots change
  useEffect(() => {
    setTotalAmount(selectedSlots.length * price!);
  }, [selectedSlots, price]);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const newDate = queryParams.get("date")
      ? parseISO(queryParams.get("date")!)
      : undefined;
    setDate(newDate);
    setPurpose(queryParams.get("purpose") || "");
  }, [location.search]);

  // Get booked time ranges for selected date
  const bookedTimeRanges = useMemo(() => {
    if (!date || !bookedSlots) return [];

    return bookedSlots
      .map((slot) => ({
        start: parseISO(slot.start_time),
        end: parseISO(slot.end_time),
      }))
      .filter(
        ({ start, end }) =>
          start.toDateString() === date.toDateString() ||
          end.toDateString() === date.toDateString()
      );
  }, [date, bookedSlots]);

  // Modified slot reconstruction useEffect
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlStartTime = queryParams.get("startTime");
    const urlEndTime = queryParams.get("endTime");

    if (urlStartTime && urlEndTime && date) {
      const startHour = parseInt(urlStartTime.split(":")[0], 10);
      const endHour = parseInt(urlEndTime.split(":")[0], 10);

      // Generate all slots between start and end times
      const slots = [];
      for (let hour = startHour; hour < endHour; hour++) {
        const slot = {
          start: `${hour}:00`,
          end: `${hour + 1}:00`,
        };
        // Only add if slot exists in TIME_SLOTS and is available
        if (
          TIME_SLOTS.some(
            (ts) => ts.start === slot.start && isSlotAvailable(slot)
          )
        ) {
          slots.push(slot);
        }
      }
      setSelectedSlots(slots);
    }
  }, [date, location.search, bookedTimeRanges]); // Include bookedTimeRanges

  // Generate time slots
  const TIME_SLOTS = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        start: `${i + 8}:00`,
        end: `${i + 9}:00`,
        available: true,
      })),
    []
  );

  // Check if time slot is available
  const isSlotAvailable = (slot: { start: string; end: string }) => {
    if (!date) return true;

    const slotStart = new Date(date);
    const [startHour, startMinute] = slot.start.split(":").map(Number);
    slotStart.setHours(startHour, startMinute);

    const slotEnd = new Date(date);
    const [endHour, endMinute] = slot.end.split(":").map(Number);
    slotEnd.setHours(endHour, endMinute);

    return !bookedTimeRanges.some(
      ({ start, end }) =>
        isWithinInterval(slotStart, { start, end }) ||
        isWithinInterval(slotEnd, { start, end })
    );
  };

  const handleBooking = async () => {
    if (!date || !purpose || selectedSlots.length === 0) {
      toast({ title: "Missing required fields", variant: "destructive" });
      return;
    }

    const sortedSlots = [...selectedSlots].sort((a, b) =>
      a.start.localeCompare(b.start)
    );
    const startTime = sortedSlots[0].start;
    const endTime = sortedSlots[sortedSlots.length - 1].end;

    const bookingPayload = {
      space_id: id,
      start_time: combineDateTime(date, startTime),
      end_time: combineDateTime(date, endTime),
      purpose,
    };

    setLoading(true);
    try {
      const session = await getSession();
      if (session?.user_id) {
        const response = await mutateAsync({
          postData: bookingPayload,
          endpoint: "/bookings/",
        });
        navigate(`/payment-confirmation/${response.id}`);
      } else {
        // Convert selectedSlots to a comma-separated string
        const slotParams = selectedSlots
          .map((s) => `${s.start}-${s.end}`)
          .join(",");

        const params = new URLSearchParams({
          purpose,
          date: date.toISOString(),
          selectedSlots: slotParams, // Include all slots
        });
        navigate(
          `/login?${params.toString()}&callbackUrl=${location.pathname}`
        );
      }
    } catch (error) {
      toast({ title: "Booking failed", variant: "destructive" });
    }
    setLoading(false);
  };

  const combineDateTime = (date: Date, time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);
    return newDate.toISOString();
  };

  const toggleSlot = (slot: { start: string; end: string }) => {
    setSelectedSlots((prev) => {
      const exists = prev.some((s) => s.start === slot.start);
      const newSlots = exists
        ? prev.filter((s) => s.start !== slot.start)
        : [...prev, slot];

      // Sort and ensure continuity
      const sorted = newSlots.sort((a, b) => a.start.localeCompare(b.start));
      const isContinuous = sorted.every(
        (s, i) => i === 0 || parseInt(s.start) === parseInt(sorted[i - 1].end)
      );

      return isContinuous ? sorted : [slot];
    });
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
            disabled={{ before: today }}
            // disabled={[...bookedTimeRanges].map((d) => new Date(d))}
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
              {TIME_SLOTS.map((slot, i) => {
                const isAvailable = isSlotAvailable(slot);
                return (
                  <button
                    key={i}
                    disabled={!isAvailable}
                    onClick={() => isAvailable && toggleSlot(slot)}
                    className={`w-full rounded-lg border p-3 text-left transition-all ${
                      !isAvailable
                        ? "cursor-not-allowed border-neutral-200 bg-neutral-50 opacity-50"
                        : selectedSlots.some((s) => s.start === slot.start)
                        ? "border-rose-500 bg-rose-50 text-rose-900 shadow-sm"
                        : "border-neutral-200 hover:border-rose-300 hover:shadow-md"
                    }`}
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
                );
              })}
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
                <span>Total:</span>
                <span>${isNaN(totalAmount) ? 0 : totalAmount}</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-neutral-700">
              Purpose<span className="text-rose-500">*</span>
            </label>
            <input
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Booking purpose"
              required
              className="mt-1 block w-full rounded-md border border-neutral-300 shadow-sm p-2"
            />
          </div>
          <button
            onClick={handleBooking}
            disabled={totalAmount === 0 || isNaN(totalAmount)}
            className={`w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all ${
              totalAmount === 0 || isNaN(totalAmount)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-rose-600 hover:bg-rose-700 hover:shadow-md"
            }`}
          >
            {loading ? "Loading..." : user ? "Book Now" : "Login to Book"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenueBooking;
