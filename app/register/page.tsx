import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RegisterForm from "@/app/register/RegisterForm";

export default async function RegisterPage() {
  const token = (await cookies()).get("token")?.value;
  if (token) {
    redirect("/dashboard");
  }

  return <RegisterForm />;
}
