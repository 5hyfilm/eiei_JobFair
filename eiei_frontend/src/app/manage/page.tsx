import { dbConnect } from "@/db/dbConnect"
import { authOptions } from "../api/auth/[...nextauth]/authOptions"
import getUserProfile from "@/libs/getUserProfile"
// import Car from "@/db/Car"
// import { dbConnect } from "@/db/dbConnect"
import { getServerSession } from "next-auth"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import Company from "@/db/Company"

export default async function AdminCreatePage(){
    const session= await getServerSession(authOptions)
    if(!session || !session.user) return null

    const profile =await getUserProfile(session.user.token)
    var createdAt= new Date (profile.data.createdAt);
    if(profile.data.role!="admin"){
        redirect("/mainpage")
    }
    const addCompany= async (addCompanyForm:FormData)=>{
        "use server"
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


    return(
        <main className="bg-white rounded my-10 p-5">
            <div className="flex text-xl text-center font-bold justify-center my-2 pb-10">
                Create Jobfair Company
            </div>
            <div className="border-2 border-gray-200 rounded-xl p-10">
                {
                    (profile.data.role=="admin")?
                        <form action={addCompany}>

                    <div className="grid grid-cols-3 flex gap-2 m-2">
                        <div className="col-span-1 font-bold   text-center">
                            Name
                        </div>
                         <div className="col-span-2">
                            <input type="text" required id="name" name="name" placeholder="ABC Coporation"
                                className="bg-slate-300 border-black-200 rounded w-full p-2
                                text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="col-span-1 font-bold   text-center">
                            Business
                        </div>
                         <div className="col-span-2">
                            <input type="text" required id="business" name="business" placeholder="IT Company"
                                className="bg-slate-300 border-black-200 rounded w-full p-2
                                text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="col-span-1 font-bold   text-center">
                            Address
                        </div>
                         <div className="col-span-2">
                            <textarea  required id="building" name="building" placeholder="Building 3"
                                className="bg-slate-300 border-black-200 rounded w-full p-2
                                text-gray-700 focus:outline-none focus:border-blue-400 resize-none"/>
                        </div>
                        <div className="col-span-1 font-bold   text-center">
                            Province
                        </div>
                         <div className="col-span-2">
                            <input type="text" required id="province" name="province" placeholder="Bangkok"
                                className="bg-slate-300 border-black-200 rounded w-full p-2
                                text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="col-span-1 font-bold   text-center">
                            PostalCode
                        </div>
                         <div className="col-span-2">
                            <input type="text" required id="postal" name="postal" placeholder="10800"
                                className="bg-slate-300 border-black-200 rounded w-full p-2
                                text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="col-span-1 font-bold   text-center">
                            Telephone
                        </div>
                         <div className="col-span-2">
                            <input type="text" required id="tel" name="tel" placeholder="08xxxxxxxx"
                                className="bg-slate-300 border-black-200 rounded w-full p-2
                                text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                        <div className="col-span-1 font-bold   text-center">
                            PictureURL
                        </div>
                         <div className="col-span-2">
                            <input type="text" required id="pic" name="pic" placeholder="http//drive:xxx"
                                className="bg-slate-300 border-black-200 rounded w-full p-2
                                text-gray-700 focus:outline-none focus:border-blue-400"/>
                        </div>
                    </div>

                    <div className="flex justify-center items-center my-5">
                            <button type="submit" className="bg-green-700 hover:bg-green-950 text-white p-2 rounded-lg w-[25%]">Save</button>
                    </div>
                            {/* <div className="flex item-center w-auto px-4 my-2 content-center items-center">
                                <label className="w-auto block text-gray-700 p-4 text-black" htmlFor="name">
                                    Name
                                </label>
                                <input type="text" required id="name" name="name" placeholder="ABC Coporation"
                                    className="bg-slate-300 border-black-200 rounded w-full p-2
                                    text-gray-700 focus:outline-none focus:border-blue-400">
                                </input>
                            </div> 
                            <div className="flex item-center w-auto px-4 my-2 content-center items-center">
                                <label className="w-auto block text-gray-700 p-4 text-black" htmlFor="model">
                                    Business
                                </label>
                                <input type="text" required id="business" name="business" placeholder="IT Company"
                                    className="bg-slate-300 border-black-200 rounded w-full p-2
                                    text-gray-700 focus:outline-none focus:border-blue-400">
                                </input>
                            </div>  */}
                            
                        </form>
                        :null
                }
            </div>
        </main>
    )
}