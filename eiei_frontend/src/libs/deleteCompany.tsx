export default async function deleteCompany(token:string,companyID:string){
    const response= await fetch(`https://eiei-jobfair-backend.vercel.app/api/v1/companies/${companyID}`,{
        method:"DELETE",
        headers:{
            authorization: `Bearer ${token}`
        }
    })
    if(!response.ok){
        throw new Error("Failed to Delete Company")
    }
    return await response.json()
}
