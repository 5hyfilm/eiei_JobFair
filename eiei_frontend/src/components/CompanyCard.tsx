import Image from "next/image";

export default function CompanyCard({companyName,imgSrc,id,onRemoveReservation}:{companyName:string,imgSrc:string,id:string,onRemoveReservation?:Function}){
    return(
        <div className="w-full h-[500px] rounded-lg shadow-lg bg-white">
            <div className="w-full h-[40%] relative rounded-t-lg">
                <Image src={imgSrc}
                    alt={companyName}
                    fill={true}
                    className="object-cover rounded-t-lg"        
                    />    
                </div>
                <div className="w-full h-[60%] p-[10px] text-black">
                    {/* <div className={style.vaccine_name}>Rabies vaccine</div> */}
                    <div className="font-bold font-serif text-center p-2">
                        {companyName}
                    </div>
                    {/* stoppropagation เพื่อไม่ให้มันขึ้นไปข้างบน */}
                    <div className="px-5 py-5  justify-center  flex"> 
                        
                        
                    </div>
                    {onRemoveReservation? <button className="block h-[10%] rounded-md bg-sky-600 hover:bg-indigo-600 mx-2 px-1 py-1 
                    text-white shadow-sm items-center "
                    onClick={(e)=>{e.preventDefault();onRemoveReservation(id)}} // เพราะมันเป็น button เลยใช้อันนี้ ป้องกันจาก Link คาดว่า
                >   Remove</button>: ''}
                </div>
            </div>
    )
}