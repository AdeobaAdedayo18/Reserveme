import { format } from "date-fns";
import { Printer } from "lucide-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface ReceiptPageProps {
  orderDetails: {
    orderId: string;
    userName: string;
    date: Date;
    timeSlot: string;
    amount: number;
    venueName: string;
  };
}

const ReceiptPage = () => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const orderDetails = {
    orderId: "ORD-2024-001",
    userName: "John Doe",
    date: new Date("2024-01-15"),
    timeSlot: "10:00 AM - 12:00 PM",
    amount: 900,
    venueName: "Cucrid Auditorium",
  };

  const handlePrint = useReactToPrint({
    getContent: () => receiptRef.current,
    documentTitle: `Receipt-${orderDetails.orderId}`,
    onAfterPrint: () => alert("Receipt has been successfully printed!"),
  });
  //   console.log(receiptRef.current);

  //   const handlePrint = useReactToPrint({
  //     getContent: () => {
  //       if (!receiptRef.current) {
  //         console.error("There is nothing to print");
  //         return null;
  //       }
  //       return receiptRef.current;
  //     },
  //     documentTitle: `Receipt-${orderDetails.orderId}`,
  //   });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Booking Receipt</h1>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            aria-label="Print Receipt"
          >
            <Printer className="h-4 w-4" />
            Print Receipt
          </button>
        </div>

        {/* Printable Receipt Content */}
        <div ref={receiptRef} className="rounded-lg bg-white p-8 shadow-sm">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-6">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-600">
                <span className="text-lg font-bold text-white">VB</span>
              </div>
              <div className="mt-2 text-sm text-gray-500">VenueBook.com</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-500">
                Receipt No.
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {orderDetails.orderId}
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              User Information
            </h2>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="grid gap-4 text-sm">
                <div>
                  <div className="font-medium text-gray-500">Name</div>
                  <div className="text-gray-900">{orderDetails.userName}</div>
                </div>
                <div>
                  <div className="font-medium text-gray-500">Venue</div>
                  <div className="text-gray-900">{orderDetails.venueName}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Booking Details
            </h2>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="grid gap-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium text-gray-500">Date</div>
                    <div className="text-gray-900">
                      {format(orderDetails.date, "MMMM d, yyyy")}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-500">Time</div>
                    <div className="text-gray-900">{orderDetails.timeSlot}</div>
                  </div>
                </div>
                <div>
                  <div className="font-medium text-gray-500">Duration</div>
                  <div className="text-gray-900">2 hours</div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Payment Information
            </h2>
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="grid gap-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="font-medium text-gray-500">Amount</div>
                    <div className="text-gray-900">
                      ${orderDetails.amount.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-500">Status</div>
                    <div className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-green-700">
                      Paid
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            <p>Thank you for booking with VenueBook!</p>
            <p className="mt-1">
              For any questions, please contact support@venuebook.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
