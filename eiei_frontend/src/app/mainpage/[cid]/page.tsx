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
export default function CompanyDetailPage({params}:{params:{cid:string}}){

    // const session = await getServerSession(authOptions) 
    // if(!session || !session.user.token) return null
    // const profile= await getUserProfile(session.user.token)
    // const roleUser= profile.data.role
    const urlParams=useSearchParams()
    const reserveDate= urlParams.get('reserve')
    const reserveID= urlParams.get('booking')
    var initialDate:Dayjs= dayjs(new Date())

    // console.log("check",initialDate)
    if(reserveDate){
        initialDate=dayjs(reserveDate)
    }

    // console.log("AFter",initialDate)
   const [bookingDate, setBookingDate] = useState<Dayjs>(initialDate);
    const {data:session}=useSession()
    // console.log(session)
    const roleUser= session?.user.role
    
    const [companyDetail,setCompanyDetail]=useState<CompanyItem|null>(null)
    useEffect(()=>{
        const fetchData= async()=>{
            const company = await getCompany(params.cid)
            setCompanyDetail(company)
        }
        fetchData()
    },[])


    async function postBooking(newValue:Dayjs){
        if(reserveID && session){
            try{
                console.log(reserveID)
                const formattedDate = newValue.format('MM/DD/YYYY')
                const send= await pushingCompany(formattedDate,session?.user.token,reserveID) 
            alert("update success")
            }catch{
                alert("fail update")
            }
        }
        else if(session){
            try{
                const formattedDate = newValue.format('MM/DD/YYYY')
                const send= await bookingCompany(formattedDate,session.user.token,params.cid) 
            alert("success")
            }catch{
                alert("fail")
            }
    }
        

    }
    if(!companyDetail || !session) return(<p>Loading Company</p>)
    return (
        <main className="text-center p-5">
                <h1 className="text-xl font-medium"> Company {companyDetail.data.name}</h1> 
                <h1 className="text-xl font-medium"> Edit you Information {companyDetail.data.name}</h1> 
                <div className="flex flex-row my-5">
                        <Image src={companyDetail.data.picture}
                        alt='Product Picture'
                        width={0} height={0} sizes="100vw"
                        className="rounded-xl w-[40%] bg-black"
                        />
                        <div className="text-md mx-5 text-left w-[60%]">
                            {/* <div className="text-md mx-5">Description{companyDetail.data.description}</div> */}
                            <div className="text-md mx-5">Name: {companyDetail.data.name}</div>
                            <div className="text-md mx-5">Business:{companyDetail.data.business}</div>
                           <div className="text-md mx-5">Address {companyDetail.data.address}</div>
                            <div className="text-md mx-5">PostalCode: {companyDetail.data.postalcode}</div> 
                            <div className="text-md mx-5">Telephone: {companyDetail.data.tel}</div>
                            <DateReserve initialDate={bookingDate} onDateChange={(value:Dayjs)=>setBookingDate(value)}></DateReserve>
                        </div>
                </div>

            <div className="flex flex-row justify-center p-5">
                <div className="px-5">
                {
                    (roleUser=='admin')?
                    <Link href={`/edit/${companyDetail.data.id}`}>
                    <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white">
                        Edit Company
                    </button>
                    </Link>
                    :null
                }
                </div>
                <div className="px-5">
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white" onClick={()=>{postBooking(bookingDate)}}>
                            Reservation
                        </button>
                </div>
            </div>

        </main>
    )
}

 