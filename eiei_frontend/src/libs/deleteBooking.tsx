export default async function deleteBooking(token:string,bookingID:string){
    const response= await fetch(`http://localhost:5000/api/v1/bookings/${bookingID}`,{
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
