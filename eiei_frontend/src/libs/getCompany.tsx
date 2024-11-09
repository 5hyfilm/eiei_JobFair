export default async function getCompany(cid:string){
    const companyResponse= await fetch(`https://eiei-jobfair-backend.vercel.app/api/v1/companies/${cid}`)
    if(!companyResponse.ok){
        throw new Error("Failed to GET company")
    }
    return companyResponse.json()
}