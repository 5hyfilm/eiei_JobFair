export default async function getBookings(token:string){
    const response = await fetch("http://localhost:5001/api/v1/bookings",{
        method:"GET",
        headers:{
            authorization: `Bearer ${token}`
        }
    })
    if(!response.ok){
        console.log(response)
        throw new Error("Failed to fetch booking")
    }
    return response.json()
}
