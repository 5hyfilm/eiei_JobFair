export default async function userSignUp(name: string, email: string, tel: string, password: string) {
  const response = await fetch("https://eiei-jobfair-backend.vercel.app/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "name": name,
      "email": email,
      "tel": tel,
      "password": password,
      "role": 'user', // Ensure the role is always set to "user"
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to sign up");
  }
  
  return await response.json();
}
