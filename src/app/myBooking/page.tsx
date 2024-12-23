import CompanyCatalogue from "@/components/CompanyCatalog";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import Link from "next/link";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import getBookings from "@/libs/getBookings";
import MyBookingCatalogue from "@/components/MyBookingCatalog";

export default async function myBookngPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token)
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl sm:text-5xl font-bold text-green-600 mb-4">
          🌟 Please Login
        </h1>
      </div>
    );
  const profile = await getUserProfile(session.user.token);

  return (
    <main className="text-center p-5 text-black">
      <h1 className="text-4xl sm:text-5xl font-bold text-green-600 mb-4">
        Your Companies Booking List
      </h1>

      <MyBookingCatalogue
        Profile_id={profile.data._id}
        token={session.user.token}
      />
    </main>
  );
}
