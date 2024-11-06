import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import getCompany from "@/libs/getCompany"
import getUserProfile from "@/libs/getUserProfile"
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"
export default async function CompanyDetailPage({params}:{params:{cid:string}}){

    const session = await getServerSession(authOptions) 
    if(!session || !session.user.token) return null
    const profile= await getUserProfile(session.user.token)
    const roleUser= profile.data.role
    const companyDetail= await getCompany(params.cid)
    console.log(companyDetail)
    return (
        
        <main className="text-center p-5">
                {/* <h1 className="text-lg font-medium"> Model {carDetail.data.model}</h1> */}
                {/* <div className="flex flex-row my-5">
                        <Image src={carDetail.data.picture}
                        alt='Product Picture'
                        width={0} height={0} sizes="100vw"
                        className="rounded-lg w-[30%] bg-black"
                        />
                        <div className="text-md mx-5 text-left">
                            <div className="text-md mx-5">Description{carDetail.data.description}</div>
                            <div className="text-md mx-5">Doors:{carDetail.data.doors}</div>
                            <div className="text-md mx-5">Doors:{carDetail.data.seats}</div>
                            <div className="text-md mx-5">Largebags{carDetail.data.largebags}</div>
                            <div className="text-md mx-5">Smallbags:{carDetail.data.smallbags}</div>
                            <div className="text-md mx-5">DayRate:{carDetail.data.dayRate}</div>
                        </div>
                </div> */}
                {/* <Link href={`/reservations?id=${params.cid}&model=${carDetail.data.model}`}>
                <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white">
                    Make Reservation
                </button>
                </Link> */}
                {
                    (roleUser=='admin')?
                    <Link href={`/edit/${companyDetail.data.id}`}>
                    <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white">
                        Edit Company
                    </button>
                    </Link>
                    :null
                }
        </main>
    )
}

export async function generateStaticParams() {
    return [{cid:"001"},{cid:"002"},{cid:"003"}]
}