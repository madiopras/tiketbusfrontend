"use client";
import { useRouter } from "next/navigation";
import { UserProvider } from "../admin/context/UserContext";
import AdminNavbar from "./components/AdminNavbar";
import AdminSidebar from "./components/AdminSidebar";
import AdminFooter from "./components/AdminFooter";
import Cookies from "js-cookie";
import axios from "@/lib/axios";



  export default function RootLayout({children} : {
    children : React.ReactNode
  }) {

    const router = useRouter();
    
    const handleLogout = async () => {
        const token = Cookies.get("token"); 
    
        const res = await axios.post("/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        Cookies.remove("token");
        router.push("/loginxsqwt");
      };

  return (
    <div className="drawer lg:drawer-open">
      <input id="drawer-sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col py-3 px-2 bg-base-300">
        {/* Navbar */}
        <UserProvider>
        <AdminNavbar handleLogout={handleLogout} />

        {/* Page content here */}
        <div className="container mx-auto min-h-screen p-2 mt-4">
  
            {children}
         
        </div>
        <AdminFooter />
        {/* Page content here */}
        </UserProvider>
      </div>
        <AdminSidebar />
    </div>
  )
}

