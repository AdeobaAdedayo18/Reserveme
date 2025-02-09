import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { BookingPaymentReceipt } from "@/interfaces/Booking";

const styles = StyleSheet.create({
  page: {
    padding: 36,
    backgroundColor: "#ffffff",
  },
  container: {
    padding: 32,
    border: "1 solid #000000",
  },
  watermarkContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "rotate(-45deg)",
    pointerEvents: "none",
  },
  watermarkText: {
    fontSize: 100,
    color: "#00000010", // Very light black for watermark
    opacity: 0.1,
    fontWeight: "bold",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    paddingBottom: 24,
    marginBottom: 16,
  },
  logoContainer: {
    width: 48,
    height: 48,
    backgroundColor: "#dc2626",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  companyName: {
    marginTop: 4,
    fontSize: 12,
    color: "#000000",
  },
  receiptNoLabel: {
    fontSize: 12,
    color: "#000000",
    textAlign: "right",
  },
  receiptNo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "right",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 16,
  },
  sectionContent: {
    marginBottom: 24,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 12,
    color: "#000000",
    marginBottom: 4,
    fontWeight: "bold",
  },
  fieldValue: {
    fontSize: 12,
    color: "#000000",
  },
  paymentStatus: {
    fontSize: 12,
    fontWeight: "bold",
    padding: "4 10",
    borderRadius: 4,
  },
  paymentStatusPaid: {
    backgroundColor: "#bbf7d0",
    color: "#000000",
  },
  paymentStatusPending: {
    backgroundColor: "#fecaca",
    color: "#000000",
  },
  footer: {
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: "#000000",
    paddingTop: 16,
    marginTop: 12,
  },
  footerText: {
    fontSize: 10,
    color: "#000000",
    marginBottom: 0,
  },
});

interface ReceiptPDFProps {
  orderDetails: BookingPaymentReceipt;
}

const Watermark = () => (
  <View style={styles.watermarkContainer}>
    <Text style={styles.watermarkText}>VenueBook</Text>
  </View>
);

const ReceiptPDF = ({ orderDetails }: ReceiptPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Watermark */}
      <Watermark />

      <View style={styles.container}>
        {/* Header with Logo and Receipt Number */}
        <View style={styles.headerContainer}>
          <View>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>VB</Text>
            </View>
            <Text style={styles.companyName}>VenueBook.com</Text>
          </View>
          <View>
            <Text style={styles.receiptNoLabel}>Receipt No.</Text>
            <Text style={styles.receiptNo}>{orderDetails?.receipt_no}</Text>
          </View>
        </View>

        {/* User Information */}
        <View style={styles.sectionContent}>
          <Text style={styles.sectionTitle}>User Information</Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Name</Text>
            <Text style={styles.fieldValue}>{orderDetails?.user.name}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email</Text>
            <Text style={styles.fieldValue}>{orderDetails?.user.email}</Text>
          </View>
        </View>

        {/* Booking Details */}
        <View style={styles.sectionContent}>
          <Text style={styles.sectionTitle}>Booking Details</Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Venue</Text>
            <Text style={styles.fieldValue}>{orderDetails?.space.name}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Date</Text>
            <Text style={styles.fieldValue}>{orderDetails?.booking.date}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Time</Text>
            <Text style={styles.fieldValue}>{orderDetails?.booking.time}</Text>
          </View>
        </View>

        {/* Payment Information */}
        <View style={styles.sectionContent}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Amount</Text>
            <Text style={[styles.fieldValue, { fontWeight: "bold" }]}>
              ${orderDetails?.payment.amount}
            </Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Status</Text>
            <View
              style={[
                styles.paymentStatus,
                orderDetails?.payment.status === "confirmed"
                  ? styles.paymentStatusPaid
                  : styles.paymentStatusPending,
              ]}
            >
              <Text>{orderDetails?.payment.status}</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Thank you for booking with VenueBook!
          </Text>
          <Text style={styles.footerText}>
            For any questions, please contact support@venuebook.com
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default ReceiptPDF;
