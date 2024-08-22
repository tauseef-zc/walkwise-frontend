"use client";

import { Route } from "@/types/router";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface RouteList {
  [key: string]: string;
}
export const DashboardNav = () => {
  const pathname = usePathname();

  const listNav: RouteList = {
    "/dashboard": "Dashboard",
    "/dashboard/tours": "Tours",
    "/dashboard/bookings": "Bookings",
    "/dashboard/payments": "Payments",
    "/dashboard/messages": "Messages",
    "/dashboard/update-profile": "Profile Update",
    "/dashboard/account-password": "Update Password",
  };

  return (
    <div className="container">
      <div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
        {Object.keys(listNav).map((item: Route) => {
          const isActive = pathname === item;
          return (
            <Link
              key={item}
              href={item}
              className={`block py-5 md:py-8 border-b-2 flex-shrink-0 capitalize ${
                isActive
                  ? "border-primary-500 font-medium"
                  : "border-transparent"
              }`}
            >
              {listNav[item]}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
