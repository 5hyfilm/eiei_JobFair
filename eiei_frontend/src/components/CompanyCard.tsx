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
    <div className="w-full h-[250px] rounded-lg shadow-lg bg-white border hover:border-green-500">
      <div className="w-full h-full flex flex-col items-center justify-center">
        {/* Image Section */}
        <div className="relative w-[120px] h-[120px]">
          <Image
            src={imgSrc}
            alt={companyName}
            fill={true}
            className="object-contain"
          />
        </div>
        {/* Name Section */}
        <div className="mt-4 font-bold font-serif text-center text-lg">
          {companyName}
        </div>
      </div>
      {/* Buttons Section */}
      <div className="w-full p-4 flex justify-center gap-2">
        {onRemoveReservation && (
          <button
            className="h-10 px-4 rounded-md bg-green-500 hover:bg-green-600 text-white shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              onRemoveReservation(id);
            }}
          >
            Remove
          </button>
        )}
        {onEditReservation && (
          <button
            className="h-10 px-4 rounded-md bg-green-500 hover:bg-green-600 text-white shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              onEditReservation(id);
            }}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
