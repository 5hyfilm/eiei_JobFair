export default async function getCompanies(){
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/companies`,{next:{tags:['companies']}})
    if(!response.ok){
        throw new Error("Failed to fetch hospitals")
    }
    return response.json()
}