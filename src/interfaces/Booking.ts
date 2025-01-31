export interface Booking{
    
        space_id: string | undefined,
        start_time: string,
        end_time: string,
        purpose: string
      
}

export interface BookingResponse{
        id: string;
        space_id: string;
        start_time: string;
        end_time: string;
        purpose: string;
        status: string;
        total_cost: number;
}
export interface BookingResponsePaymentConfirmed{
       message: string,
       booking_id: string;
        status: string;
        transaction_id: number
}




export interface BookingPayment 
{                tx_ref: string,
                amount: number,
                currency: string,
                redirect_url: string,
                customer: {
                        email: string,
                        phonenumber: string;
                        name: string
                },
                customizations: {
                        title: string,
                        description: string
                }
        }

export interface BookingPaymentResponse{
        tx_ref: string;
        transaction_id: number;
}


export interface BookingPaymentReceipt{
        receipt_no: string;
        company_name: string;
        user: {
                name: string;
                email: string;
                phone_number: string;
        };
        space: {
                name: string;
                location: string;
        };
        booking: {
                date: string;
                time: string;
                duration: string;
                purpose: string;
        };
        payment: {
                amount: number;
                status: string;
                transaction_id: number;
                payment_date: string;
        };
        footer: {
                thank_you_message: string;
                support_email: string;
                terms_and_conditions: string;
        };
}