"use client"; 

import { useState } from "react";
import editCompany from "@/libs/pushCompany";
import deleteCompany from "@/libs/deleteCompany";
import { redirect } from "next/navigation";


export default function CompanyEditForm({ initialData, token, cid }:{initialData:CompanyItem,token:string,cid:string}){
    const [formData, setFormData] = useState(initialData);
    // const router=useRouter()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    async function deleteCompanyID(){
        try {
            await deleteCompany(token,initialData.id);
            alert("Company details updated successfully!");
            location.href='/mainpage'
        } catch (error) {
            console.error("Failed to update company:", error);
            alert("Error updating company details. Please try again.");
        }
    }

    const submitEditData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await editCompany(token, cid, formData);
            alert("Company details updated successfully!");
            location.href='/mainpage'
        } catch (error) {
            console.error("Failed to update company:", error);
            alert("Error updating company details. Please try again.");
        }
    };

    return (
        <div>
        <form onSubmit={submitEditData}>
            <div className="grid grid-cols-3 flex gap-2 m-2">
                <div className="col-span-1 font-bold text-center">Name</div>
                <div className="col-span-2">
                    <input
                        type="text"
                        required
                        id="name"
                        name="name"
                        placeholder="ABC Corporation"
                        className="bg-slate-300 border-black-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                
                <div className="col-span-1 font-bold text-center">Business</div>
                <div className="col-span-2">
                    <input
                        type="text"
                        required
                        id="business"
                        name="business"
                        placeholder="IT Company"
                        className="bg-slate-300 border-black-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                        value={formData.business}
                        onChange={handleChange}
                    />
                </div>
                
                <div className="col-span-1 font-bold text-center">Address</div>
                <div className="col-span-2">
                    <textarea
                        required
                        id="address"
                        name="address"
                        placeholder="Building 3"
                        className="bg-slate-300 border-black-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400 resize-none"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-span-1 font-bold text-center">Province</div>
                <div className="col-span-2">
                    <input
                        type="text"
                        required
                        id="province"
                        name="province"
                        placeholder="Bangkok"
                        className="bg-slate-300 border-black-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                        value={formData.province}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-span-1 font-bold text-center">Postal Code</div>
                <div className="col-span-2">
                    <input
                        type="text"
                        required
                        id="postalcode"
                        name="postalcode"
                        placeholder="10800"
                        className="bg-slate-300 border-black-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                        value={formData.postalcode}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-span-1 font-bold text-center">Telephone</div>
                <div className="col-span-2">
                    <input
                        type="text"
                        required
                        id="tel"
                        name="tel"
                        placeholder="08xxxxxxxx"
                        className="bg-slate-300 border-black-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                        value={formData.tel}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-span-1 font-bold text-center">Picture URL</div>
                <div className="col-span-2">
                    <input
                        type="text"
                        required
                        id="picture"
                        name="picture"
                        placeholder="http://drive:xxx"
                        className="bg-slate-300 border-black-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
                        value={formData.picture}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="flex justify-center items-center my-5">
                <button type="submit" className="bg-green-700 hover:bg-green-950 text-white p-2 rounded-lg w-[25%]">
                    Save
                </button>
            </div>

        </form>
        <div className="flex justify-center items-center my-5">
                <button className="bg-green-700 hover:bg-green-950 text-white p-2 rounded-lg w-[25%]" onClick={()=>{deleteCompanyID()}}>
                    Delete This Company
                </button>
            </div>
        </div>
        
    );
};

