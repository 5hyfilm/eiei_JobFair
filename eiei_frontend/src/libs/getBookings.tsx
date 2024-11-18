export default async function getBookings(token:string){
    const response = await fetch("https://eiei-jobfair-backend.vercel.app/api/v1/bookings",{
        method:"GET",
        headers:{
            authorization: `Bearer ${token}`
        },
        next:{tags:['bookings']}
    })
    if(!response.ok){
        console.log(response)
        throw new Error("Failed to fetch booking")
    }
    return response.json()
}
