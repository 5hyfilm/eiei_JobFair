export default async function getCompany(cid:string){
    const companyResponse= await fetch(`${process.env.BACKEND_URL}/api/v1/companies/${cid}`)
    if(!companyResponse.ok){
        throw new Error("Failed to GET company")
    }
    return companyResponse.json()
}