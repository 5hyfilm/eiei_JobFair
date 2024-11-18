import CompanyCatalogue from "@/components/CompanyCatalog";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import Link from "next/link";
import getCompanies from "@/libs/getCompanies";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import getBookings from "@/libs/getBookings";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;
  const profile = await getUserProfile(session.user.token);
  const role = profile.data.role;
  // sessionStorage.setItem('token',session.user.token)
  // console.log(sessionStorage.getItem('token'))
  console.log(profile.data);
  console.log("OK");

  const companies = await getCompanies();
  const booking = await getBookings(session.user.token);
  return (
    <main className="text-center p-5 text-black">
      <h1 className="text-4xl sm:text-5xl font-bold text-green-600 mb-4">
        🌟 All Companies List
      </h1>
      <p className="text-sm text-gray-600 mt-2">
        Explore the list of companies and manage them effectively.
      </p>
      <Suspense
        fallback={
          <p>
            Loading...
            <LinearProgress />
          </p>
        }
      >
        <CompanyCatalogue companiesJson={companies} />
      </Suspense>

      {
        // may be move to topmenu
        role == "admin" ? (
          <Link href={"/manage"}>
            <button>Create</button>
          </Link>
        ) : null
      }
    </main>
  );
}
