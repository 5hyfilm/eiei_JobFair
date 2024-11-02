import Link from "next/link";
import styles from "../app/page.module.css";
import CompanyCard from "./CompanyCard";

export default async function CompanyCatalogue({companiesJson}:{companiesJson:Promise<CompanyJson>}){
    const companyJsonReady=await companiesJson
    console.log(companyJsonReady)
    return(
        <div>
            <div className={styles.card_layout}>
            {
                    companyJsonReady.data.map((companyitem:CompanyItem)=>( //ตอนนี้ข้อมูลมาจาก API ตอนนี้เป็น child 
                        <Link href={`/mainpage/${companyitem._id}`} className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8" key={companyitem.id}> 
                        <CompanyCard imgSrc={companyitem.picture} companyName={companyitem.name} id={companyitem.id}/>
                         </Link>
                    ))
                }
            </div>
        </div>
    )
}

// Hello Pokasdsdasdasadasdasdsadsdasad