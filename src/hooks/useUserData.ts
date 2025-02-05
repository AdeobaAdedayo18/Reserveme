import { UserBooking } from "@/interfaces/User";
import useData from "./useData";

export const useUserBookings = () => {
    return useData<UserBooking[]>(`/bookings/`);
 };