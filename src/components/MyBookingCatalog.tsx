"use client";
import Link from "next/link";
import styles from "../app/page.module.css";
import CompanyCard from "./CompanyCard";
import { useEffect, useState } from "react";
import Image from "next/image";
import getBookings from "@/libs/getBookings";
import deleteBooking from "@/libs/deleteBooking";
import BookingCard from "./BookingCard";

type BookingResponse = {
  data: BookingItem[];
};
type BookingItem = {
  _id: string;
  user: string;
  company: {
    id: string;
    name: string;
  };
  bookingDate: string;
};

export default function MyBookingCatalogue({
  Profile_id,
  token,
}: {
  Profile_id: string;
  token: string;
}) {
  const [bookingResponse, setBookingResponse] = useState<BookingResponse>({ data: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booking = await getBookings(token);
        setBookingResponse(booking); // Ensure `booking` is in the expected format
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookingResponse({ data: [] });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  async function removeBooking(Booking_ID: string) {
    try {
      await deleteBooking(token, Booking_ID);
      setBookingResponse((prevState) =>
        prevState && prevState.data
          ? {
              ...prevState,
              data: prevState.data.filter((bookingItem) => bookingItem._id !== Booking_ID),
            }
          : prevState
      );
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  }

  if (loading) return <>NOW LOADING...</>;

  if (!bookingResponse || !bookingResponse.data || bookingResponse.data.length === 0) {
    return <div>No bookings available.</div>;
  }

  return (
    <div>
      <div className={styles.card_layout}>
        {bookingResponse.data.map((bookingItem: BookingItem) => {
          const { _id, user, company, bookingDate } = bookingItem;

          if (user === Profile_id) {
            return (
              <Link
                href={`/mainpage/${company.id}?reserve=${bookingDate}&booking=${_id}`}
                className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8"
                key={_id}
              >
                <BookingCard
                  companyName={company.name}
                  id={_id}
                  reservationDate={bookingDate.slice(0, 10)}
                  onRemoveReservation={removeBooking}
                  nowRole={Profile_id}
                />
              </Link>
            );
          }

          return (
            <Link
              href={`/mainpage/${company.id}?reserve=${bookingDate}&booking=${_id}`}
              className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8"
              key={_id}
            >
              <BookingCard
                companyName={company.name}
                id={_id}
                reservationDate={bookingDate.slice(0, 10)}
                onRemoveReservation={removeBooking}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
