// myProfile/Page.tsx

import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import Link from "next/link";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default async function Page() {
  // Get the current user session
  const session = await getServerSession(authOptions);
  
  // If there's no session or token, return null (could be replaced with a redirect if needed)
  if (!session || !session.user.token) return null;

  // Fetch user profile data
  const profile = await getUserProfile(session.user.token);

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white shadow-md rounded-lg max-w-lg w-full p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">My Profile</h1>

        <Suspense fallback={<p>Loading...<LinearProgress /></p>}>
          {/* Display user profile details */}
          <div className="profile-details mb-6 space-y-4 text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">Name:</span> <span>{profile.data.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Email:</span> <span>{profile.data.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Phone:</span> <span>{profile.data.tel}</span>
            </div>
            {/* Add more profile fields as necessary */}
          </div>
        </Suspense>

        {/* Link to manage account or settings */}
        {/* <Link
          href="/manage"
          className="block mt-4 px-6 py-3 text-center text-white font-medium bg-blue-600 rounded hover:bg-blue-500 transition"
        >
          Manage Account
        </Link> */}
      </div>
    </main>
  );
}
