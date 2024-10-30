"use client";
import React, { FC, memo, useEffect, useState } from "react";
import MainNav from "./partials/MainNav";
import AuthNav from "./partials/AuthNav";
import { useAppSelector } from "@/services/redux/hooks";

export interface HeaderProps {
  className?: string;
  logged?: boolean;
}

const Header: FC<HeaderProps> = ({ className = "", logged = false }) => {
  const [isLogged, setIsLogged] = useState<boolean>(logged);
  const auth = useAppSelector((state) => state.auth.isAuthenticated);

  const getNav = () => {
    return isLogged ? <AuthNav /> : <MainNav />;
  };

  useEffect(() => {
    setIsLogged(auth);
  }, [auth]);

  return (
    <div
      className={`nc-Header sticky top-0 w-full left-0 right-0 z-40 nc-header-bg ${className}`}
    >
      {getNav()}
    </div>
  );
};

export default memo(Header);
