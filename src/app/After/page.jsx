// app/after-sign-in/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AfterSignInPage() {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  // check admin role from metadata
  if (user.publicMetadata.role === "admin") {
    redirect("/Admin");
  } else {
    redirect("/");
  }
}
