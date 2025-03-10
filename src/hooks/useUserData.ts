import { UserBookingOriginal } from "@/interfaces/User";
import useFetchData from "./useFetchData";

export const useUserBookings = () => {
    return useFetchData<UserBookingOriginal>(`/bookings/`);
 };