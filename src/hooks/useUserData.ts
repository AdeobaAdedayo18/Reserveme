import { UserBookingOriginal } from "@/interfaces/User";
import useData from "./useData";

export const useUserBookings = () => {
    return useData<UserBookingOriginal>(`/bookings`);
 };