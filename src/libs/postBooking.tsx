 

export default async function bookingCompany(bookingDate:string,token:string,companyID:string){
    const response= await fetch(`${process.env.BACKEND_URL}/api/v1/companies/${companyID}/bookings`,{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ bookingDate: bookingDate })
    })
    if(!response.ok){
        throw new Error("Failed to Booking")
    }
    return await response.json()
}



