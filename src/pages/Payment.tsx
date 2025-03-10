import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import useAdd from "@/hooks/useAdd";
import useFetchData from "@/hooks/useFetchData";
import {
  BookingPayment,
  BookingPaymentResponse,
  BookingResponse,
  BookingResponsePaymentConfirmed,
} from "@/interfaces/Booking";
import {
  differenceInHours,
  differenceInMinutes,
  format,
  parseISO,
} from "date-fns";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const { spaceID } = useParams<{ spaceID: string }>();
  const { data } = useFetchData<BookingPayment>(
    `/bookings/${spaceID}/payment/`
  );
  const [flutterLoading, setFlutterLoading] = useState(false);

  const {
    data: booking,
    // isLoading: bookingLoading,
    // error: bookingError,
  } = useFetchData<BookingResponse>(`/bookings/${spaceID}`);
  const { mutateAsync } = useAdd<
    BookingPaymentResponse,
    BookingResponsePaymentConfirmed
  >();

  const getBookingDetails = (booking: BookingResponse) => {
    const startDate = parseISO(booking.start_time);
    const endDate = parseISO(booking.end_time);

    return {
      formattedDate: format(startDate, "MMMM d, yyyy"),
      formattedTime: `${format(startDate, "h:mm a")} - ${format(
        endDate,
        "h:mm a"
      )}`,
      duration: calculateDuration(startDate, endDate),
    };
  };

  const calculateDuration = (start: Date, end: Date) => {
    const hours = differenceInHours(end, start);
    const minutes = differenceInMinutes(end, start) % 60;

    if (hours === 0) return `${minutes} minutes`;
    if (minutes === 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
    return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minutes`;
  };
  const bookingDetails = booking ? getBookingDetails(booking) : null;
  const config = {
    public_key: "FLWPUBK_TEST-3aa975702aa5d44b3b39177f21d1c628-X",
    tx_ref: data?.tx_ref!,
    amount: data?.amount!,
    currency: data?.currency!,
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: data?.customer.email!,
      phone_number: data?.customer.phonenumber!,
      name: data?.customer.name!,
    },
    customizations: {
      title: data?.customizations.title!,
      description: data?.customizations.description!,
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };
  const handleFlutterPayment = useFlutterwave(config);
  // const verifyPaymentFlutterwave = async (transaction_id: number) => {
  //   try {
  //     const response = await fetch(
  //       `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer FLWSECK_TEST-0f9582caca544f84d030d2395b8d7702-X`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const result = await response.json();
  //     return result.status === "success" && result.data.status === "successful";
  //   } catch (error) {
  //     toast({
  //       title: "Verification Error",
  //       description: "Could not verify transaction with Flutterwave",
  //       variant: "destructive",
  //     });
  //     return false;
  //   }
  // };

  const verifyPaymentServer = async (
    transaction_id: number,
    tx_ref: string
  ) => {
    try {
      const res = await mutateAsync({
        endpoint: `/bookings/${spaceID}/confirm`,
        postData: {
          tx_ref: tx_ref,
          transaction_id: transaction_id,
        },
      });

      return res?.status === "confirmed";
    } catch (error) {
      toast({
        title: "Server Error",
        description: "Could not communicate with our servers",
        variant: "destructive",
      });
      return false;
    }
  };

  const Submit = async () => {
    setFlutterLoading(true);
    handleFlutterPayment({
      callback: async (response) => {
        try {
          console.log(response);

          if (response.status !== "successful") {
            toast({
              title: "Payment Failed",
              description: "Transaction was not successful. Please try again.",
              variant: "destructive",
            });
            return;
          }

          // Verify with Flutterwave first
          // const flutterwaveVerified = await verifyPaymentFlutterwave(
          //   response.transaction_id
          // );
          // if (!flutterwaveVerified) {
          //   toast({
          //     title: "Verification Failed",
          //     description: "Payment verification with Flutterwave failed",
          //     variant: "destructive",
          //   });
          //   return;
          // }

          // Then verify with our server
          const serverVerified = await verifyPaymentServer(
            response.transaction_id,
            response.tx_ref
          );

          if (!serverVerified) {
            console.log(serverVerified);

            toast({
              title: "Server Verification Failed",
              description: "Could not confirm payment with our servers",
              variant: "destructive",
            });
            return;
          }

          // Both verifications successful
          toast({
            title: "Payment Successful",
            description: "Your payment has been confirmed!",
          });
          closePaymentModal();
          navigate(`/receipt/${spaceID}`);
        } catch (error) {
          toast({
            title: "Error",
            description:
              "An unexpected error occurred. Please contact support.",
            variant: "destructive",
          });
        } finally {
          closePaymentModal();
        }
      },
      onClose: () => {
        toast({
          title: "Payment Cancelled",
          description: "Payment process was cancelled",
          variant: "destructive",
        });
      },
    });
    setFlutterLoading(false);
  };
  // if (flutterLoading) return;
  // <Oval
  //   height="60"
  //   width="60"
  //   // radius="9"
  //   color="black"
  //   secondaryColor="gray"
  //   ariaLabel="three-dots-loading"
  //   // wrapperStyle
  //   wrapperClass="flex justify-center items-center h-screen"
  // />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/50 to-white">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-rose-600 p-2">
              <span className="text-sm font-bold text-white">RM</span>
            </div>
            <span className="text-lg font-semibold">ReserveMe</span>
          </a>
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </header>
      <main className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-8">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Confirm Your Booking</CardTitle>
            <CardDescription>
              Please check the details of your booking then confirm payment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Venue</span>
                <span className="font-medium">Cucrid Building</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">
                  {" "}
                  {bookingDetails?.formattedDate || "Loading..."}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Time</span>
                <span className="font-medium">
                  {" "}
                  {bookingDetails?.formattedTime || "Loading..."}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">
                  {" "}
                  {bookingDetails?.duration || "Loading..."}
                </span>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between font-medium">
                <span>Total Amount</span>
                <span className="text-lg font-bold text-green-600">
                  ${data?.amount}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" size="lg" onClick={Submit}>
              {!flutterLoading ? "Proceed to Payment" : "Loading..."}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              By proceeding, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Payment;
