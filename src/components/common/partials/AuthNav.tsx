"use client";
import React, { FC } from "react";
import MenuBar from "@/components/shared/MenuBar";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import HeroSearchForm2MobileFactory from "./HeroSearchForm2MobileFactory";
import LogoSvg from "../LogoSvg";
import SwitchDarkMode from "@/components/shared/SwitchDarkMode";
import SearchDropdown from "./SearchDropdown";
import Navigation from "@/components/shared/Navigation/Navigation";


const AuthNav: FC = () => {
  return (
    <div className={`MainNav2 relative z-10`}>
      <div className="px-4 h-20 lg:container flex justify-between">
        <div
          className={
            "hidden md:flex justify-start flex-1 space-x-3 sm:space-x-8 lg:space-x-10"
          }
        >
          <div className="w-100 self-center">
            <LogoSvg />
          </div>
          <Navigation />
        </div>

        <div className="self-center lg:hidden flex-[3] max-w-lg !mx-auto md:px-3">
          <HeroSearchForm2MobileFactory />
        </div>

        <div className="hidden md:flex flex-shrink-0 justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
          <div className="hidden lg:flex space-x-1">
            <SwitchDarkMode />
            <SearchDropdown className="flex items-center" />
            {/* <NotifyDropdown /> */}
            <AvatarDropdown />
          </div>
          <div className="flex space-x-2 lg:hidden">
            {/* <NotifyDropdown /> */}
            <AvatarDropdown />
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthNav;
