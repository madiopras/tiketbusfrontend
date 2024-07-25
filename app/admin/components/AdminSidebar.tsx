"use client";
import React from 'react'

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "../../logo1.png"; // Import the logo
import { ChartBarSquareIcon, ShoppingCartIcon, CalendarDaysIcon, BanknotesIcon, CircleStackIcon, TruckIcon, CalendarDateRangeIcon, TicketIcon, CalendarIcon, MapIcon, MapPinIcon, PuzzlePieceIcon, DocumentCurrencyDollarIcon, UsersIcon, AdjustmentsHorizontalIcon,  } from "@heroicons/react/16/solid";



export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="drawer-side shadow-lg">
        <label
          htmlFor="drawer-sidebar"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-100 min-h-full w-80 p-4">
          {/* Sidebar header */}
          <div className="sticky top-0 bg-base-100 p-4 mb-4 shadow-md flex items-center justify-center z-10">
            <Image className='rounded-b-full shadow-xl' src={logo} alt="Logo" width={250} height={250} />
          </div>
          {/* Sidebar content here */}
          <li
            className={`mb-2 ${
              pathname === "/admin/dashboard" ? "bg-base-300" : ""
            }`}
          >
            <Link
              href="/admin/dashboard"
              className="flex items-center py-2 px-4 hover:bg-base-300 rounded"
            >
              <ChartBarSquareIcon className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
          </li>
          <li
            className={`mb-2 ${
              pathname === "/admin/orders" ? "bg-base-300" : ""
            }`}
          >
            <Link
              href="/admin/orders"
              className="flex items-center py-2 px-4 hover:bg-base-300 rounded"
            >
              <TicketIcon className="h-5 w-5 mr-2" />
              Order
            </Link>
          </li>
          <li
            className={`mb-2 ${
              pathname === "/admin/schedule" ? "bg-base-300" : ""
            }`}
          >
            <Link
              href="/admin/schedule"
              className="flex items-center py-2 px-4 hover:bg-base-300 rounded"
            >
              <CalendarIcon className="h-5 w-5 mr-2" />
              Schedule
            </Link>
          </li>
          <li
            className={`mb-2 ${
              pathname === "/admin/payment" ? "bg-base-300" : ""
            }`}
          >
            <Link
              href="/admin/payment"
              className="flex items-center py-2 px-4 hover:bg-base-300 rounded"
            >
              <BanknotesIcon className="h-5 w-5 mr-2" />
              Payment
            </Link>
          </li>
          <li className="mb-2">
            <details className="group">
              <summary className="flex items-center justify-between py-2 px-4 cursor-pointer hover:bg-base-300 rounded">
                <div className="flex items-center">
                <CircleStackIcon className="h-5 w-5 mr-2" />
                  Master
                </div>
                <span className="group-open:rotate-180 transition-transform">
                  &#9662;
                </span>
              </summary>
              <ul className="pl-4 shadow-md">
                <li
                  className={`mb-2 ${
                    pathname === "/admin/master/bus" ? "bg-base-300" : ""
                  }`}
                >
                  <Link
                    href="/admin/master/bus"
                    className="flex items-center py-2 px-4 hover:bg-base-300 rounded"
                  >
                    <TruckIcon className="h-5 w-5 mr-2" />
                    Bus
                  </Link>
                </li>
                <li
                  className={`mb-2 ${
                    pathname === "/admin/master/seat" ? "bg-base-300" : ""
                  }`}
                >
                  <Link
                    href="/admin/master/seat"
                    className="flex items-center py-2 px-4 hover:bg-base-300 rounded"
                  >
                    <PuzzlePieceIcon className="h-5 w-5 mr-2"/>
                    Seat
                  </Link>
                </li>
                <li
                  className={`mb-2 ${
                    pathname === "/admin/master/specialdays"
                      ? "bg-base-300"
                      : ""
                  }`}
                >
                  <Link
                    href="/admin/master/specialdays"
                    className="flex items-center py-2 px-4 hover:bg-base-300 rounded"
                  >
                    <CalendarDateRangeIcon className="h-5 w-5 mr-2" />
                    Special Days
                  </Link>
                </li>
                <li
                  className={`mb-2 ${
                    pathname === "/admin/master/kelas"
                      ? "bg-base-300"
                      : ""
                  }`}
                >
                  <Link
                    href="/admin/master/kelas"
                    className="flex items-center py-2 px-4 hover:bg-base-300 rounded"
                  >
                    <CalendarDateRangeIcon className="h-5 w-5 mr-2" />
                    Kelas
                  </Link>
                </li>
                <li
                  className={`mb-2 ${
                    pathname === "/admin/master/passanger"
                      ? "bg-base-300"
                      : ""
                  }`}
                >
                  <Link
                    href="/admin/master/passanger"
                    className="flex items-center py-2 px-4 hover:bg-base-300 rounded"
                  >
                    <CalendarDateRangeIcon className="h-5 w-5 mr-2" />
                    Passanger
                  </Link>
                </li>
                <li
                  className={`mb-2 ${
                    pathname === "/admin/master/voucher" ? "bg-base-300" : ""
                  }`}
                >
                  <Link
                    href="/admin/master/voucher"
                    className="flex items-center py-2 px-4 hover:bg-base-300 rounded"
                  >
                    <DocumentCurrencyDollarIcon className="h-5 w-5 mr-2" />
                    Voucher
                  </Link>
                </li>
                <li
                  className={`mb-2 ${
                    pathname === "/admin/master/rutes" ? "bg-base-300" : ""
                  }`}
                >
                  <Link
                    href="/admin/master/rutes"
                    className="flex items-center py-2 px-4 hover:bg-base-300 rounded"
                  >
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    Routes
                  </Link>
                </li>
                <li
                  className={`mb-2 ${
                    pathname === "/admin/master/location" ? "bg-base-300" : ""
                  }`}
                >
                  <Link
                    href="/admin/master/location"
                    className="flex items-center py-2 px-4 hover:bg-base-300 rounded"
                  >
                    <MapIcon className="h-5 w-5 mr-2" />
                    Location
                  </Link>
                </li>
                <li
                  className={`mb-2 ${
                    pathname === "/admin/master/event" ? "bg-base-300" : ""
                  }`}
                >
                  <Link
                    href="/admin/master/event"
                    className="flex items-center py-2 px-4 hover:bg-base-300 rounded"
                  >
                    <CalendarDaysIcon className="h-5 w-5 mr-2" />
                    Event
                  </Link>
                </li>
                <li
                  className={`mb-2 ${
                    pathname === "/admin/master/users" ? "bg-base-300" : ""
                  }`}
                >
                  <Link
                    href="/admin/master/users"
                    className="flex items-center py-2 px-4 hover:bg-base-300 rounded"
                  >
                    <UsersIcon className="h-5 w-5 mr-2" />
                    Users
                  </Link>
                </li>
                <li
                  className={`mb-2 ${
                    pathname === "/admin/master/role" ? "bg-base-300" : ""
                  }`}
                >
                  <Link
                    href="/admin/master/role"
                    className="flex items-center py-2 px-4 hover:bg-base-300 rounded"
                  >
                    <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                    Role
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
  )
}
