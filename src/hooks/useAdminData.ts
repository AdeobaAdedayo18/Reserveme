import { AdminBookingsResponse } from "@/interfaces/Admin";
import useData from "./useData";

export const useAllBookings = () => {
    return useData<AdminBookingsResponse>(`/bookings/admin/all`);
 };
export const usePage = (endpoint: string | undefined) => {
    return useData<AdminBookingsResponse>(endpoint!);
 };