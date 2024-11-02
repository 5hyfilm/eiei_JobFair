export default async function editCompany(token:string,cid:string,companyData: { 
    name: string; 
    address: string; 
    business: string; 
    province: string; 
    postalcode: string; 
    tel: string; 
    picture: string 
}){
    const response= await fetch(`http://localhost:5000/api/v1/companies/${cid}`,{
        method:"PUT",
        headers:{
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(companyData)
    })
    if(!response.ok){
        throw new Error("Failed to Edit Company")
    }
    return await response.json()
}
