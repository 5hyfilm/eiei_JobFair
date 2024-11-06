import CompanyCatalogue from "@/components/CompanyCatalog";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import Link from "next/link";
import getCompanies from "@/libs/getCompanies";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default async function Page(){
    const session = await getServerSession(authOptions) 
    if(!session || !session.user.token) return null
    const profile= await getUserProfile(session.user.token)
    console.log(profile.data)
    console.log("OK")

    const companies= getCompanies()
    return(
        <main className="text-center p-5 text-black">
            <h1 className="text-xl font-medium">All Companies List</h1>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
                <CompanyCatalogue companiesJson={companies}/>
            </Suspense>
            
            { // may be move to topmenu
                (profile.data.role=="admin")?
                <Link href={"/manage"}>
                    <button>Create</button>
                </Link>
                :null
            }
        </main>
    )
}