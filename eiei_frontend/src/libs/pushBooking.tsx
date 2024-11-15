 export default async function pushingCompany(bookingDate:string,token:string,bookingID:string){
    const response= await fetch(`https://eiei-jobfair-backend.vercel.app/api/v1/bookings/${bookingID}`,{
        method:"PUT",
        headers:{
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ bookingDate: bookingDate })
    })
    if(!response.ok){
        throw new Error("Fail Update Booking")
    }
    return await response.json()
}



