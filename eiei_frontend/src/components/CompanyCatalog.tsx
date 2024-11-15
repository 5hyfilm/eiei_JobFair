import Link from "next/link";
import styles from "../app/page.module.css";
import CompanyCard from "./CompanyCard";
import { redirect } from "next/navigation";

export default  function CompanyCatalogue({companiesJson,booking}:{companiesJson:CompanyJson,booking:BookingJson}){
    const companyJsonReady=companiesJson
    // console.log(booking)

    const companiesWithBookings = companyJsonReady.data.map((companyItem: CompanyItem) => {
        const bookingMatch = booking.data.find((bookingItem: any) => {
            return bookingItem.company.name === companyItem.name;
        });

        return {
            ...companyItem,
            bookingDate: bookingMatch ? bookingMatch.bookingDate : null,
            bookingId: bookingMatch ? bookingMatch._id : null
        };
    });
    // console.log(companiesWithBookings)

    return(
        <div>
            <div className={styles.card_layout}>
            {
                    companyJsonReady.data.map((companyitem:CompanyItem)=>( //ตอนนี้ข้อมูลมาจาก API ตอนนี้เป็น child 
                        <Link href={`/mainpage/${companyitem.id}`} className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8" key={companyitem.id}> 
                        <CompanyCard imgSrc={companyitem.picture} companyName={companyitem.name} id={companyitem.id} />
                         </Link>
                    ))
                }
             {/* {companiesWithBookings.map((companyItem: CompanyItem & { bookingDate?: string | null, bookingId?: string | null }) => {
                    let href = `/mainpage/${companyItem.id}`;
                    if (companyItem.bookingDate && companyItem.bookingId) {
                        href += `?reserve=${companyItem.bookingDate}&booking=${companyItem.bookingId}`;
                    }
                    return (
                        <Link
                            href={href}
                            className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8"
                            key={companyItem.id}
                        >
                            <CompanyCard
                                imgSrc={companyItem.picture}
                                companyName={companyItem.name}
                                id={companyItem.id}
                            />
                        </Link>
                    );
                })} */}



            </div>
        </div>
    )
}

