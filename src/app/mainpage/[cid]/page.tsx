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
import { revalidateTag } from "next/cache"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
export default function CompanyDetailPage({params}:{params:{cid:string}}){

    const urlParams=useSearchParams()
    const reserveDate= urlParams.get('reserve')
    const reserveID= urlParams.get('booking')
    var initialDate:Dayjs= dayjs(new Date())


    if(reserveDate){
        initialDate=dayjs(reserveDate)
    }

  
   const [bookingDate, setBookingDate] = useState<Dayjs>(initialDate);
    const {data:session}=useSession()

 
    
    
    const [companyDetail,setCompanyDetail]=useState<CompanyItem|null>(null)
    useEffect(()=>{
        const fetchData= async()=>{
            const company = await getCompany(params.cid)
            setCompanyDetail(company.data)
        }
        fetchData()
    },[])

    const [myRole,setRoleData]=useState<string>("")
    useEffect(()=>{
        const fetchRole =async()=>{
           
            const roleData=await getUserProfile(session?.user.token??'')
         
            setRoleData(roleData.data.role)
        }
        fetchRole()
    },[])

    const [myQuantityBooking,setQuantityBooking]=useState<number>(0)
    useEffect(()=>{
        const fetchBookings =async()=>{
            const bookData=await getBookings(session?.user.token??'')
            var counter=0
            bookData.data.filter((eachBook: BookingItem) => {
                if (session?.user._id === eachBook.user) {
                  counter++;
                }
              });
            setQuantityBooking(counter)
            // console.log(bookData.data)
        }
        fetchBookings()
    },[])


    async function postBooking(newValue:Dayjs){
        if(reserveID && session){
            try{
                const formattedDate = newValue.format('MM/DD/YYYY')
                const send= await pushingCompany(formattedDate,session?.user.token,reserveID) 
                alert("update success")
            // revalidateTag("companies")
            }catch{
                alert("fail update")
            }
        }
        else if(session){
            if(myQuantityBooking>=3){
                alert("You couldn't book more than 3 places")
                return;
            }
            try{
                const formattedDate = newValue.format('MM/DD/YYYY')
                const send= await bookingCompany(formattedDate,session.user.token,params.cid) 
                alert("success")
            // revalidateTag("companies")
            }catch{
                alert("fail")
            }
    }
        

    }
    if(!companyDetail || !session) return(<Suspense><p className="text-center text-lg mt-20">Loading Company...</p></Suspense>)
        return (
            <main className="p-6 bg-gray-100 min-h-screen text-gray-800">
                <div className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
                        {companyDetail.name}
                    </h1>
                    <h2 className="text-xl sm:text-2xl font-medium text-gray-600">
                        Manage Your Booking
                    </h2>
                </div>
    
                <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                    <Image
                        src={companyDetail.picture}
                        alt={`${companyDetail.name} Picture`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="rounded-lg shadow-md bg-gray-300 w-full md:w-1/3"
                    />
                    <div className="w-full md:w-1/3 space-y-4">
                        <p className="text-gray-600">
                            <strong>Telephone:</strong> {companyDetail.tel}
                        </p>
                        <p className="text-gray-600">
                            <strong>Business:</strong> {companyDetail.business}
                        </p>
                        <p className="text-gray-600">
                            <strong>Address:</strong> {companyDetail.address}
                        </p>
                        <p className="text-gray-600">
                            <strong>Province:</strong> {companyDetail.province}
                        </p>
                        <p className="text-gray-600">
                            <strong>Postal Code:</strong> {companyDetail.postalcode}
                        </p>
                    </div>
                    <div className="w-full md:w-1/4">
                        <DateReserve
                            initialDate={bookingDate}
                            onDateChange={(value: Dayjs) => setBookingDate(value)}
                        />
                    </div>
                </div>
    
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
                    {myRole === "admin" && (
                        <Link href={`/edit/${companyDetail.id}`}>
                            <button className="rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white font-medium shadow-md transition-all w-full sm:w-auto">
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