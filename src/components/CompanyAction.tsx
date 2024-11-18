"use server"

import Company from "@/db/Company"
import { dbConnect } from "@/db/dbConnect"
import { revalidateTag } from "next/cache"
import { redirect } from "next/dist/server/api-utils"

export async function addCompany(addCompanyForm:FormData){
    const name= addCompanyForm.get("name")
    const business= addCompanyForm.get("business")
    const building= addCompanyForm.get("building")
    const tel= addCompanyForm.get("tel")
    const province= addCompanyForm.get("province")
    const pic= addCompanyForm.get("pic")
    const postal= addCompanyForm.get("postal")


    try{
        await dbConnect() //to connect backend
        const company=await Company.create(
         {   "name":name,
            "business":business,
            "address":building,
            "province":province,
            "postalcode":postal,
            "tel":tel,
            "picture":pic
        })
        console.log("success")
        
    }catch(error){
        console.log(error)
    }
    revalidateTag("companies")
 
}