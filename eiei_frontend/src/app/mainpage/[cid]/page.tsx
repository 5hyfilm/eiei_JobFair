'use client'
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import DateReserve from "@/components/DateReserve"
import getBookings from "@/libs/getBookings"
import getCompany from "@/libs/getCompany"
import getUserProfile from "@/libs/getUserProfile"
import bookingCompany from "@/libs/postBooking"
import pushingCompany from "@/libs/pushBooking"
import { DatePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
export default function CompanyDetailPage({ params }: { params: { cid: string } }) {
    const urlParams = useSearchParams();
    const reserveDate = urlParams.get("reserve");
    const reserveID = urlParams.get("booking");
    var initialDate: Dayjs = dayjs(new Date());

    if (reserveDate) {
        initialDate = dayjs(reserveDate);
    }

    const [bookingDate, setBookingDate] = useState<Dayjs>(initialDate);
    const { data: session } = useSession();
    const roleUser = session?.user.role;

    const [companyDetail, setCompanyDetail] = useState<CompanyItem | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const company = await getCompany(params.cid);
            setCompanyDetail(company);
        };
        fetchData();
    }, []);

    async function postBooking(newValue: Dayjs) {
        if (reserveID && session) {
            try {
                const formattedDate = newValue.format("MM/DD/YYYY");
                await pushingCompany(formattedDate, session.user.token, reserveID);
                alert("Update success");
            } catch {
                alert("Fail update");
            }
        } else if (session) {
            try {
                const formattedDate = newValue.format("MM/DD/YYYY");
                await bookingCompany(formattedDate, session.user.token, params.cid);
                alert("Success");
            } catch {
                alert("Fail");
            }
        }
    }

    if (!companyDetail || !session) return <p>Loading Company</p>;

    return (
        <main className="text-center p-5 bg-gray-100 min-h-screen">
            <h1 className="text-2xl sm:text-3xl font-medium mb-5">
                Company: {companyDetail.data.name}
            </h1>
            <h2 className="text-lg sm:text-xl font-medium mb-5">
                Edit your Information
            </h2>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-5 mb-5">
                <Image
                    src={companyDetail.data.picture}
                    alt="Product Picture"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="rounded-xl bg-black w-full md:w-1/3"
                />
                <div className="text-left w-full md:w-2/3 space-y-3">
                    <p>Name: {companyDetail.data.name}</p>
                    <p>Business: {companyDetail.data.business}</p>
                    <p>Address: {companyDetail.data.address}</p>
                    <p>Postal Code: {companyDetail.data.postalcode}</p>
                    <p>Telephone: {companyDetail.data.tel}</p>
                    <DateReserve
                        initialDate={bookingDate}
                        onDateChange={(value: Dayjs) => setBookingDate(value)}
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-5">
                {roleUser === "admin" && (
                    <Link href={`/edit/${companyDetail.data.id}`}>
                        <button className="rounded-md bg-sky-600 hover:bg-indigo-600 px-4 py-2 shadow text-white w-full sm:w-auto">
                            Edit Company
                        </button>
                    </Link>
                )}
                <button
                    className="rounded-md bg-sky-600 hover:bg-indigo-600 px-4 py-2 shadow text-white w-full sm:w-auto"
                    onClick={() => postBooking(bookingDate)}
                >
                    Reservation
                </button>
            </div>
        </main>
    );
}
