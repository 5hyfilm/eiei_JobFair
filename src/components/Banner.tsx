"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./banner.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Banner() {
  const covers = ["/img/banner1.png", "/img/banner2.png", "/img/banner3.png"];
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();

  const nextImage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIndex((prevIndex) => (prevIndex + 1) % covers.length);
  };

  const navigateToCompanies = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push("/companies");
    router.prefetch("/companies"); // Prefetching the route for smooth transition
  };

  return (
    <div
      className={`${styles.bannerContainer} relative w-full h-[500px]`}
      onClick={nextImage}
    >
      <Image
        src={covers[index]}
        alt="cover"
        fill
        priority
        className={`${styles.bannerImage} object-cover transition-opacity duration-500 ease-in-out`} // Adds smooth transition effect
      />
      <div className={`${styles.bannerOverlay} absolute inset-0 flex flex-col justify-center items-center p-6 text-white text-center`}>
        <h1 className="text-4xl mb-4 font-sans">EiEi Job Fair</h1>
        <h2>The Return Everyone’s Been Waiting For! Join us at the INTANIA Job Fair 2024!</h2>
        <h3 className="text-xl mb-2 font-sans">
          For all INTANIA students, from every year!
        </h3>
        <h3>
          Meet: Over 100 top companies and organizations gathered just for you across three full days!
        </h3>
        <h3 className="text-lg font-sans">
          Opportunities for internships, jobs, part-time work, career advice, and more!
        </h3>
      </div>
      {session && (
        <div className="z-30 absolute top-5 right-10 font-semibold text-red-500 text-xl">
          Welcome {session.user?.name}
        </div>
      )}
      <button
        className={`${styles.bannerButton} bg-white text-cyan-600 border border-cyan-600 font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-0 hover:bg-cyan-600 hover:text-white hover:border-transparent`}
        onClick={navigateToCompanies}
      >
        See all companies
      </button>
    </div>
  );
}
