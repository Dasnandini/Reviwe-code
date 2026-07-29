import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "@/app/login/LoginForm";

export default async function LoginPage() {
  const token = (await cookies()).get("token")?.value;
  if (token) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
