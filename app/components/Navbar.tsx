import React from "react";
import { TbHome, TbTruckDelivery } from "react-icons/tb";
import { BsBusFront } from "react-icons/bs";
import { HiTicket, HiReceiptRefund } from "react-icons/hi2";
import { CgFileDocument } from "react-icons/cg";
import { RiGuideLine } from "react-icons/ri";
import { MdContactSupport, MdOutlineSupportAgent, MdEventRepeat, MdGroups2, MdQuestionAnswer } from "react-icons/md";

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100 w-full fixed top-0 z-50 rounded-b-full shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li><a> <TbHome /> Awal</a></li>
            <li>
              <a><BsBusFront />Booking</a>
              <ul className="p-2">
                <li><a><HiTicket />Tiket Bus</a></li>
                <li><a><TbTruckDelivery/>Pengiriman</a></li>
              </ul>
            </li>
            <li><a><CgFileDocument/>Cara Pesan</a></li>
            <li><a><MdGroups2/>Tentang Kami</a></li>
            <li>
              <a><MdContactSupport/>Pusat Bantuan</a>
              <ul className="p-2">
                <li><a><MdOutlineSupportAgent/>Hubungi Kami</a></li>
                <li><a><MdQuestionAnswer/>FAQ</a></li>
                <li><a><MdEventRepeat/>Reschedule</a></li>
                <li><a><HiReceiptRefund/>Refund</a></li>
              </ul>
            </li>
            <li><a><CgFileDocument/>Syarat & Ketentuan</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Sumatra</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a><TbHome />Awal</a></li>
          <li>  
            <details>
              <summary><BsBusFront /> Booking</summary>
              <ul className="p-2">
                <li><a><HiTicket />Tiket Bus</a></li>
                <li><a><TbTruckDelivery/>Pengiriman</a></li>
              </ul>
            </details>
          </li>
          <li><a><CgFileDocument/>Cara Pesan</a></li>
          <li><a><MdGroups2/>Tentang Kami</a></li>
          <li>
            <details>
              <summary><MdContactSupport/>Pusat Bantuan</summary>
              <ul className="p-2">
                <li><a><MdOutlineSupportAgent/>Hubungi Kami</a></li>
                <li><a><MdQuestionAnswer/>FAQ</a></li>
                <li><a><MdEventRepeat/>Reschedule</a></li>
                <li><a><HiReceiptRefund/>Refund</a></li>
              </ul>
            </details>
          </li>
            <li><a><CgFileDocument/>Syarat & Ketentuan</a></li>
        </ul>
      </div>
      <div className="navbar-end pr-10">
        <a className="btn btn-sm btn-accent rounded-full">Masuk/Daftar</a>
      </div>
    </div>
  );
};

export default Navbar;
