import Link from "next/link";

export default function TopMenuItem({title,pageRef}:{title:string,pageRef:string}){
    return(
    <Link className="h-14 text-center my-auto font-serif font-bold text-md text-black w-40 content-center   mx-0" href={pageRef}>
        {title}
    </Link>
    )
}