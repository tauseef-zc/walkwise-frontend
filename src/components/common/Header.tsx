"use client";
import React, { FC } from "react";
import MainNav from "./partials/MainNav";
import AuthNav from "./partials/AuthNav";
import { useAppSelector } from "@/services/redux/hooks";

export interface HeaderProps {
  className?: string;
}

const Header: FC<HeaderProps> = ({ className = "" }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return (
    <div
      className={`nc-Header sticky top-0 w-full left-0 right-0 z-40 nc-header-bg ${className}`}
    >
      {isAuthenticated ? <AuthNav /> : <MainNav />}
    </div>
  );
};

export default Header;
