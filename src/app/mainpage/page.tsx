import CompanyCatalogue from "@/components/CompanyCatalog";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import Link from "next/link";
import getCompanies from "@/libs/getCompanies";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import getBookings from "@/libs/getBookings";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"; // Import the icon

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
  const role = profile.data.role;
  // sessionStorage.setItem('token',session.user.token)
  // console.log(sessionStorage.getItem('token'))
  console.log(profile.data);
  console.log("OK");

  const companies = await getCompanies();
  // const booking = await getBookings(session.user.token);
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
          <Link href="/manage">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleOutlineIcon />}
              style={{
                backgroundColor: "#4CAF50", // Custom green color
                padding: "10px 20px",
                fontSize: "16px",
                textTransform: "none",
              }}
            >
              Create
            </Button>
          </Link>
        ) : null
      }
    </main>
  );
}
