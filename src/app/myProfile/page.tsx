import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileDetails from "@/components/ProfileDetails";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default async function Page() {
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

  // Prepare profile details
  const details = [
    { label: "Name", value: profile.data.name },
    { label: "Email", value: profile.data.email },
    { label: "Phone", value: profile.data.tel },
  ];

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white shadow-md rounded-lg max-w-lg w-full p-6">
        <ProfileHeader />
        <Suspense
          fallback={
            <p>
              Loading...
              <LinearProgress />
            </p>
          }
        >
          <ProfileDetails details={details} />
        </Suspense>
      </div>
    </main>
  );
}
