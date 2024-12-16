import React from 'react';
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";

export default function GuestAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = JSON.parse(getCookie("user", { cookies }) || "{}");

  if (Object.keys(user).length > 0) {
    return <div>
      <h1 className="text-center p-10 ">Already logged in</h1>
    </div>;
  }

  return <>{children}</>;
};