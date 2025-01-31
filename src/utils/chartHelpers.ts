import { AdminBookings } from "@/interfaces/Admin"
import { format, subDays, isWithinInterval, startOfDay, endOfDay } from "date-fns"

export const getDateRangeData = (bookings: AdminBookings[], days: number) => {
  const end = new Date()
  const start = subDays(end, days - 1)

  // Create an array of dates for the range
  const dates = Array.from({ length: days }, (_, i) => {
    const date = subDays(end, i)
    return format(date, "MMM dd")
  }).reverse()

  // Initialize data with 0 for all dates
  const bookingsPerDay = dates.reduce(
    (acc, date) => {
      acc[date] = { count: 0, revenue: 0 }
      return acc
    },
    {} as Record<string, { count: number; revenue: number }>,
  )

  // Count bookings and sum revenue for each date
  bookings?.forEach((booking) => {
    const bookingDate = new Date(booking.created_at)

    if (
      isWithinInterval(bookingDate, {
        start: startOfDay(start),
        end: endOfDay(end),
      })
    ) {
      const dateKey = format(bookingDate, "MMM dd")
      if (bookingsPerDay[dateKey]) {
        bookingsPerDay[dateKey].count++
        bookingsPerDay[dateKey].revenue += booking.total_cost
      }
    }
  })

  return {
    dates,
    bookings: dates.map((date) => bookingsPerDay[date].count),
    revenue: dates.map((date) => bookingsPerDay[date].revenue),
  }
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

