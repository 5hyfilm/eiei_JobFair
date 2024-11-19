'use client';
import Link from "next/link";
import styles from "../app/page.module.css";
import BookingCard from "./BookingCard";
import { useEffect, useState } from "react";
import getBookings from "@/libs/getBookings";
import deleteBooking from "@/libs/deleteBooking";

type BookingItem = {
    _id: string;
    user: string;
    bookingDate: string;
    company: { id: string; name: string };
};

type BookingResponse = {
    data: BookingItem[];
};

export default function MyBookingCatalogue({ Profile_id, token }: { Profile_id: string; token: string }) {
    const [bookingResponse, setBookingResponse] = useState<BookingResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const booking = await getBookings(token);
                setBookingResponse(booking);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };
        fetchData();
    }, [token]);

    async function removeBooking(Booking_ID: string) {
        try {
            await deleteBooking(token, Booking_ID);
            setBookingResponse((prevState) =>
                prevState
                    ? {
                          ...prevState,
                          data: prevState.data.filter((bookingItem) => bookingItem._id !== Booking_ID),
                      }
                    : null
            );
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    }

    if (!bookingResponse) return <>NOW LOADING...</>;

    return (
        <div>
            <div className={styles.card_layout}>
                {bookingResponse.data.map((bookingItem: BookingItem) => {
                    const linkProps = {
                        href: `/mainpage/${bookingItem.company.id}?reserve=${bookingItem.bookingDate}&booking=${bookingItem._id}`,
                        className: "w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8",
                        key: bookingItem._id,
                    };

                    return (
                        <Link {...linkProps}>
                            <BookingCard
                                companyName={bookingItem.company.name}
                                id={bookingItem._id}
                                reservationDate={bookingItem.bookingDate.slice(0, 10)}
                                onRemoveReservation={removeBooking}
                                nowRole={Profile_id}
                            />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}