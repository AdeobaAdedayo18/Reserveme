import { AdminBookingsResponse } from "@/interfaces/Admin";
import useFetchData from "./useFetchData";

export const useAllBookings = () => {
    return useFetchData<AdminBookingsResponse>(`/bookings/admin/all`);
 };
export const usePage = (endpoint: string | undefined) => {
    return useFetchData<AdminBookingsResponse>(endpoint!);
 };