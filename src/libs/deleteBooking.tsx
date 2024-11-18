export default async function deleteBooking(token:string,bookingID:string){
    const response= await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${bookingID}`,{
        method:"DELETE",
        headers:{
            authorization: `Bearer ${token}`
        }
    })
    if(!response.ok){
        throw new Error("Failed to Delete Booking")
    }
    return await response.json()
}
