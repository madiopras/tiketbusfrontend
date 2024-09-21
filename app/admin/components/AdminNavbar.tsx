"use client";
import { usePathname} from "next/navigation";
import { useUser } from "../context/UserContext";
import {
  Bars3Icon,
} from "@heroicons/react/16/solid";
import Image from "next/image";
import logo from "../../logo1.png";

const AdminNavbar = ({ handleLogout }: { handleLogout: () => void }) => {
  const { user } = useUser();

  const pathname = usePathname();

  const getTitle = (path: string) => {
    switch (path) {
      case "/admin":
        return "Home";
      case "/admin/master/kelas":
        return "Manajemen Kelas Bus";
      case "/admin/master/kelas/create":
        return "Manajemen Kelas Bus - Create";
        case "/admin/master/location":
          return "Manajemen Lokasi Bus";
        case "/admin/master/location/create":
          return "Manajemen Lokasi Bus - Create";
      case "/admin/master/users":
        return "Manajemen User";
        case "/admin/master/bus":
          return "Manajemen Bus";
      default:
        return "Sumatera Bus";
    }
  };

  return (
    <div className="sticky top-0 navbar bg-base-100 w-full rounded-lg shadow-lg z-10">
      <div className="flex-none lg:hidden">
        <label
          htmlFor="drawer-sidebar"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          <Bars3Icon className="h-5 w-5" />
        </label>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">{getTitle(pathname)}</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              
              <Image src={logo} alt="Logo" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                {user ? <p>Welcome, {user.name}</p> : <p>Loading...</p>}
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
