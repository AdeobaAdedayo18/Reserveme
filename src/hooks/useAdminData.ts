import { AdminBookings } from "@/interfaces/Admin";
import useData from "./useData";

export const useAllBookings = () => {
    return useData<AdminBookings[]>(`/bookings/admin/all`);
 };