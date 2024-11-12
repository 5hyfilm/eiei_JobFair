'use client'
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
type CarResponse={
    data: CompanyItem[];
};
export default function MyBookingCatalogue({Profile_id,token}:{Profile_id:string,token:string}){
    const [bookingResponse, setBookingResponse] = useState<BookingResponse | null>(null);
    // const [companyResponse, setCompanyResponse] = useState<CarResponse| null> (null);
    useEffect(()=>{
        const fetchData=async()=>{
            const booking = await getBookings(token)
            setBookingResponse(booking)
        }
        fetchData()

    },[])  
 
    async function removeBooking(Booking_ID: string) {
        console.log(Booking_ID);
        await deleteBooking(token, Booking_ID);

        // Update the state to remove the deleted booking
        setBookingResponse((prevState) => ({
            ...prevState,
            data: prevState?.data.filter((bookingItem) => bookingItem._id !== Booking_ID) || []
        }));
    }
    if(bookingResponse==null) return <>NOW LOADING...</>
    return(
        //รูปภาพ รอแก้ไป get รูปภาพมา น่าจะต้อง useEffect อีกตัว ไม่งั้นคงใช้ custom hook
        <div>
            <div className={styles.card_layout}>
            {
                    bookingResponse.data.map((bookingItem:BookingItem)=>( //ตอนนี้ข้อมูลมาจาก API ตอนนี้เป็น child ต่อจาก flexs
                        <Link href={`/mainpage/${bookingItem.company.id}?reserve=${bookingItem.bookingDate}&booking=${bookingItem._id}`} className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8" key={`${bookingItem._id}`} > 
                        <BookingCard companyName={bookingItem.company.name} id={bookingItem._id} reservationDate={bookingItem.bookingDate.slice(0,10)} 
                        onRemoveReservation={(id:string)=>removeBooking(id)}/>
                         </Link>
                    
                       
                    ))
                }
            </div>
             
        </div>
    )
}