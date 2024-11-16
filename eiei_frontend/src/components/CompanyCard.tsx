import Image from "next/image";

export default function CompanyCard({
  companyName,
  imgSrc,
  id,
  onRemoveReservation,
  onEditReservation,
}: {
  companyName: string;
  imgSrc: string;
  id: string;
  onRemoveReservation?: Function;
  onEditReservation?: Function;
}) {
  return (
    <div className="w-full h-[500px] rounded-lg shadow-lg bg-white border hover:border-green-500">
      <div className="w-full h-[40%] relative rounded-t-lg">
        <Image
          src={imgSrc}
          alt={companyName}
          fill={true}
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="w-full h-[60%] p-[10px] text-black">
        <div className="font-bold font-serif text-center p-2">
          {companyName}
        </div>
        <div className="px-5 py-5 justify-center flex"></div>
        {onRemoveReservation ? (
          <button
            className="block h-[10%] rounded-md bg-[#4BA24D] hover:bg-indigo-600 mx-2 px-1 py-1 
            text-white shadow-sm items-center"
            onClick={(e) => {
              e.preventDefault();
              onRemoveReservation(id);
            }}
          >
            Remove
          </button>
        ) : (
          ""
        )}
        {onEditReservation ? (
          <button
            className="block h-[10%] rounded-md bg-[#4BA24D] hover:bg-indigo-600 mx-2 px-1 py-1 
            text-white shadow-sm items-center"
            onClick={(e) => {
              e.preventDefault();
              onEditReservation(id);
            }}
          >
            Edit
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
