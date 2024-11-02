export default async function getCompany(cid:string){
    const companyResponse= await fetch(`http://localhost:5000/api/v1/companies/${cid}`)
    if(!companyResponse.ok){
        throw new Error("Failed to GET company")
    }
    return companyResponse.json()
}