'use client';

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import Link from "next/link";
import getCompany from "@/libs/getCompany";
import bookingCompany from "@/libs/postBooking";
import pushingCompany from "@/libs/pushBooking";
import DateReserve from "@/components/DateReserve";

export default function CompanyDetailPage({ params }: { params: { cid: string } }) {
    const urlParams = useSearchParams();
    const reserveDate = urlParams.get("reserve");
    const reserveID = urlParams.get("booking");
    const initialDate: Dayjs = reserveDate ? dayjs(reserveDate) : dayjs();

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
    }, [params.cid]);

    async function postBooking(newValue: Dayjs) {
        try {
            const formattedDate = newValue.format("MM/DD/YYYY");
            if (reserveID && session) {
                await pushingCompany(formattedDate, session.user.token, reserveID);
                alert("Update successful!");
            } else if (session) {
                await bookingCompany(formattedDate, session.user.token, params.cid);
                alert("Booking successful!");
            }
        } catch {
            alert("Action failed. Please try again.");
        }
    }

    if (!companyDetail || !session) return <p className="text-center text-lg mt-20">Loading Company...</p>;

    return (
        <main className="p-6 bg-gray-100 min-h-screen text-gray-800">
            <div className="text-center mb-10">
                <h1 className="text-4xl sm:text-5xl font-bold text-green-600 mb-4">
                    {companyDetail.data.name}
                </h1>
                <h2 className="text-2xl sm:text-3xl font-medium text-gray-700">
                    Manage Your Booking
                </h2>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-start gap-10">
                <Image
                    src={companyDetail.data.picture}
                    alt={`${companyDetail.data.name} Picture`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="rounded-lg shadow-lg bg-gray-200 w-full md:w-1/3"
                />
                <div className="text-left w-full md:w-2/3 space-y-4">
                    <p className="text-gray-600"><strong>Name:</strong> {companyDetail.data.name}</p>
                    <p className="text-gray-600"><strong>Business:</strong> {companyDetail.data.business}</p>
                    <p className="text-gray-600"><strong>Address:</strong> {companyDetail.data.address}</p>
                    <p className="text-gray-600"><strong>Postal Code:</strong> {companyDetail.data.postalcode}</p>
                    <p className="text-gray-600"><strong>Telephone:</strong> {companyDetail.data.tel}</p>
                </div>
                <div className="w-full md:w-1/4 md:ml-auto">
                    <DateReserve
                        initialDate={bookingDate}
                        onDateChange={(value: Dayjs) => setBookingDate(value)}
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                {roleUser === "admin" && (
                    <Link href={`/edit/${companyDetail.data.id}`}>
                        <button className="rounded-lg bg-green-600 hover:bg-green-700 px-6 py-3 text-white font-medium shadow-md transition-all w-full sm:w-auto">
                            Edit Company
                        </button>
                    </Link>
                )}
                <button
                    onClick={() => postBooking(bookingDate)}
                    className="rounded-lg bg-green-600 hover:bg-green-700 px-6 py-3 text-white font-medium shadow-md transition-all w-full sm:w-auto"
                >
                    Make Reservation
                </button>
            </div>
        </main>
    );
}
