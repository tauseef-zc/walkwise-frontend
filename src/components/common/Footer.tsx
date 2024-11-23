import React from "react";
import { WidgetFooterMenu, widgetMenus } from "@/data/footer";
import FooterNav from "./partials/FooterNav";
import SocialsList1 from "../shared/SocialsList1";
import LogoSvg from "./LogoSvg";

const Footer = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? "";

  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <FooterNav />

      <div className="nc-Footer relative py-24 lg:py-28 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
          <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
            <div className="col-span-4 justify-self-center items-center md:col-span-1">
              <LogoSvg />
            </div>
            <div className="col-span-4 justify-self-center flex items-center md:col-span-3">
              <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start" />
            </div>
          </div>
          {widgetMenus.map(renderWidgetMenuItem)}
        </div>
      </div>
      <script
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,marker,places&v=quarterly`}
        type="text/javascript"
        async
        defer
      ></script>
    </>
  );
};

export default Footer;
