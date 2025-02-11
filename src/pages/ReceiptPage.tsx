import useData from "@/hooks/useData";
import { BookingPaymentReceipt } from "@/interfaces/Booking";
import { Download } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReceiptPDF from "@/components/ReceiptPDF";

const ReceiptPage = () => {
  const { bookingID } = useParams<{ bookingID: string }>();
  const navigate = useNavigate();

  const { data: orderDetails } = useData<BookingPaymentReceipt>(
    `/bookings/${bookingID}/receipt`
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Booking Receipt</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("dashboard")}
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
              aria-label="Back to Locations"
            >
              Back
            </button>
            {orderDetails && (
              <PDFDownloadLink
                document={<ReceiptPDF orderDetails={orderDetails} />}
                fileName={`Receipt-${orderDetails.receipt_no || "booking"}.pdf`}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </PDFDownloadLink>
            )}
          </div>
        </div>

        {/* Receipt Content */}
        <div className="rounded-lg bg-white p-8 shadow-md border border-gray-200">
          <div className="mb-8 flex items-center justify-between border-b border-gray-300 pb-6">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-600 text-white font-bold text-xl">
                VB
              </div>
              <div className="mt-2 text-sm text-gray-500">VenueBook.com</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-500">
                Receipt No.
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {orderDetails?.receipt_no}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              User Information
            </h2>
            <div className="grid gap-4 text-sm">
              <div>
                <div className="font-medium text-gray-600">Name</div>
                <div className="text-gray-900 font-medium">
                  {orderDetails?.user.name}
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-600">Email</div>
                <div className="text-gray-900 font-medium">
                  {orderDetails?.user.email}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Booking Details
            </h2>
            <div className="grid gap-4 text-sm">
              <div>
                <div className="font-medium text-gray-600">Venue</div>
                <div className="text-gray-900 font-medium">
                  {orderDetails?.space.name}
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-600">Date</div>
                <div className="text-gray-900 font-medium">
                  {orderDetails?.booking.date}
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-600">Time</div>
                <div className="text-gray-900 font-medium">
                  {orderDetails?.booking.time}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Payment Information
            </h2>
            <div className="grid gap-4 text-sm">
              <div>
                <div className="font-medium text-gray-600">Amount</div>
                <div className="text-gray-900 font-bold">
                  ${orderDetails?.payment.amount}
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-600">Status</div>
                <div
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-bold ${
                    orderDetails?.payment.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {orderDetails?.payment.status}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 border-t pt-4">
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
