export default async function getCompanies(){
    const response = await fetch("http://localhost:5001/api/v1/companies",{next:{tags:['companies']}})
    if(!response.ok){
        throw new Error("Failed to fetch hospitals")
    }
    return response.json()
}