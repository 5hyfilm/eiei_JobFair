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

    // console.log("check",initialDate)
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
            // console.log(session?.user.token)
            const roleData=await getUserProfile(session?.user.token??'')
            console.log(roleData)
            setRoleData(roleData.data.role)
        }
        fetchRole()
        console.log(myRole)
    },[])

    const [myQuantityBooking,setQuantityBooking]=useState<number>(0)
    useEffect(()=>{
        const fetchBookings =async()=>{
            const bookData=await getBookings(session?.user.token??'')
            console.log(bookData)
            // setQuantityBooking(bookData.count)
            setQuantityBooking(bookData.data.length)
        }
        fetchBookings()
        // setQuantityBooking(bookData)
        // console.log(myQuantityBooking)
    },[])


    async function postBooking(newValue:Dayjs){
        if(myQuantityBooking>=3){
            alert("You couldn't book more than 3 places")
            return;
        }
        if(reserveID && session){
            try{
                console.log(reserveID)
                const formattedDate = newValue.format('MM/DD/YYYY')
                const send= await pushingCompany(formattedDate,session?.user.token,reserveID) 
            alert("update success")
            revalidateTag("companies")
            }catch{
                alert("fail update")
            }
        }
        else if(session){
            try{
                const formattedDate = newValue.format('MM/DD/YYYY')
                const send= await bookingCompany(formattedDate,session.user.token,params.cid) 
            alert("success")
            revalidateTag("companies")
            }catch{
                alert("fail")
            }
    }
        

    }
    if(!companyDetail || !session) return(<Suspense>Loading Company</Suspense>)
    return (
        <main className="text-center p-5">
                <h1 className="text-xl font-medium"> Company {companyDetail.name}</h1> 
                <h1 className="text-xl font-medium"> Edit you Information {companyDetail.name}</h1> 
                <div className="flex flex-row my-5">
                        <Image src={companyDetail.picture}
                        alt='Product Picture'
                        width={0} height={0} sizes="100vw"
                        className="rounded-xl w-[40%] bg-black"
                        />
                        <div className="text-md mx-5 text-left w-[60%]">
                            {/* <div className="text-md mx-5">Description{companyDetail.data.description}</div> */}
                            <div className="text-md mx-5">Name: {companyDetail.name}</div>
                            <div className="text-md mx-5">Business:{companyDetail.business}</div>
                           <div className="text-md mx-5">Address {companyDetail.address}</div>
                            <div className="text-md mx-5">PostalCode: {companyDetail.postalcode}</div> 
                            <div className="text-md mx-5">Telephone: {companyDetail.tel}</div>
                            <DateReserve initialDate={bookingDate} onDateChange={(value:Dayjs)=>setBookingDate(value)}></DateReserve>
                        </div>
                </div>

            <div className="flex flex-row justify-center p-5">
                <div className="px-5">
                {
                    (myRole=='admin')?
                    <Link href={`/edit/${companyDetail.id}`}>
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
                <div>ALL {myQuantityBooking}</div>
        </main>
    )
}

 