"use client";
import React, { FC } from "react";
import MenuBar from "@/components/shared/MenuBar";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import HeroSearchForm2MobileFactory from "./HeroSearchForm2MobileFactory";
import Link from "next/link";
import { Route } from "@/types/router";
import LogoSvg from "../LogoSvg";
import SwitchDarkMode from "@/components/shared/SwitchDarkMode";
import SearchDropdown from "./SearchDropdown";

export interface AuthNavProps {
  className?: string;
}

const AuthNav: FC<AuthNavProps> = ({ className = "" }) => {
  return (
    <div className={`MainNav2 relative z-10 ${className}`}>
      <div className="px-4 h-20 lg:container flex justify-between">
        <div className="hidden md:flex justify-start flex-1 space-x-3 sm:space-x-8 lg:space-x-10">
          <div className="w-100 self-center">
            <LogoSvg />
          </div>
          <div className="hidden lg:block self-center h-10 border-l border-neutral-300 dark:border-neutral-500"></div>
        </div>

        <div className="self-center lg:hidden flex-[3] max-w-lg !mx-auto md:px-3">
          <HeroSearchForm2MobileFactory />
        </div>

        <div className="hidden md:flex flex-shrink-0 justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
          <div className="hidden lg:flex space-x-1">
            <Link
              href={"/add-listing" as Route<string>}
              className="self-center text-opacity-90 group px-4 py-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full inline-flex items-center text-sm text-gray-700 dark:text-neutral-300 font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              List your property
            </Link>
            <SwitchDarkMode />
            <SearchDropdown className="flex items-center" />
            <NotifyDropdown />
            <AvatarDropdown />
          </div>
          <div className="flex space-x-2 lg:hidden">
            <NotifyDropdown />
            <AvatarDropdown />
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthNav;
