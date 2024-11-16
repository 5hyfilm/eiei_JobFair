import Image from "next/image";

export default function BookingCard({companyName,id,reservationDate,onRemoveReservation,onEditReservation,nowRole}:{companyName:string,id:string,reservationDate:string,onRemoveReservation?:Function,onEditReservation?:Function,nowRole?:string}){
    return(
  <div className="w-full h-[300px] rounded-xl shadow-lg bg-white">
    <div className="w-full h-[60%] p-[10px] text-black align-center item-center">
        <div className="font-bold font-serif text-center p-2">
            {companyName}
        </div>
        <div className="px-5 py-5 justify-center flex"> 
            {reservationDate}
        </div>
        {onRemoveReservation ? (
            <button 
                className="block h-[20%] rounded-md bg-sky-600 hover:bg-indigo-600 mx-auto px-1 py-1 
                text-white shadow-sm items-center justify-center"
                onClick={(e) => { e.preventDefault(); onRemoveReservation(id); }}
            > 
                Remove
            </button>
        ) : ''}
  
         {nowRole ? (
            <div className="font-bold font-serif text-center p-2">
                    Your  Reservation
            </div>
        ) : ''}



        {onEditReservation ? (
            <button 
                className="block h-[10%] rounded-md bg-sky-600 hover:bg-indigo-600 mx-auto px-1 py-1 
                text-white shadow-sm items-center"
                onClick={(e) => { e.preventDefault(); onEditReservation(id); }}
            >  
                Edit
            </button>
        ) : ''}
    </div>
</div>
    )
}