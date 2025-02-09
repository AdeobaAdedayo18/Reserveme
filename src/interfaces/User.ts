
export interface UserBooking {
    id: string;
    space_id: string;
    start_time: string;
    end_time: string;
    purpose: string;
    status: string;
    total_cost: number;
    created_at: string;
}

export interface UserBookingOriginal {
    data: UserBooking[] | null;
    pagination: {
        current_page: number;
        next_page: number | null;
        prev_page: number | null;
        total_pages: number;
        total_records: number;
        next_request: string | null;
        prev_request: string | null;
    }

}