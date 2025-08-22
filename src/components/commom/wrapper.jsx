"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/commom/Navbar";
import Footer from "@/components/commom/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/Admin");

  return (
    <body
      className={`${
        isAdminRoute ? "" : "mx-2 sm:mx-[10%]"
      } antialiased`}
    >
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </body>
  );
}
