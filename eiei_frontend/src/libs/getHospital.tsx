export default async function getHospital(hid:string){
    const hospitalResponse= await fetch(` `)
    if(!hospitalResponse.ok){
        throw new Error("Failed to GET Hospital")
    }
    return hospitalResponse.json()
    // 
}