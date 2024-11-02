"use client"
import Link from "next/link"
import Image from "next/image"
import styles from "./topmenu.module.css"
import TopMenuItem from "./TopMenuItem"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"

export default function TopMenu(){
    const { data: session } = useSession();
    return(
 
        // <div className="h-14 bg-white fixed top-0 left-0 right-0 z-30 flex items-center justify-end border-y-2 border-slate-300">
        <div className={styles.menucontainer}>
            <Image src={'/img/logo.png'}
                className="h-[100%] w-auto ml-1 right-100"
                width={0}
                height={0}
                sizes="100vh"
                alt="logo"
            />     
            <TopMenuItem title="Companies" pageRef="/mainpage"/>    
            <TopMenuItem title="My Booking" pageRef="/myBooking"/>    
            
            {/* <div className="flex-1 flex items-center justify-start space-x-4">
                <TopMenuItem title="Home" pageRef="/" />
            </div> */}
            
            <div className="ml-auto mr-4 p-2 flex items-center  my-auto font-serif font-bold text-md text-white  content-center  border-2 border-cyan-500 rounded-lg bg-green-500"> 
            {   session?<Link href='/api/auth/signout'><div className="text-sm">
                        Sign-Out</div>
                        </Link>
                :<Link href='/api/auth/signin'><div className="flex items-center  px-2 text-sm ">
                        Sign-In</div>
                </Link>
            }
            </div>

        </div>
    )
}
 

 