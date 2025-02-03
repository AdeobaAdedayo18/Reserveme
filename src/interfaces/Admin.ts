export interface AdminBookings{
    id: string,
    space_id: string,
    start_time: string,
    end_time: string,
    purpose: string,
    status: string,
    total_cost: number;
    created_at: string,
    user_id: string;
    username: string,
    space_name: string,
    receipt_id: string | null,
    tx_ref: string,
    transaction_id: string | null

}