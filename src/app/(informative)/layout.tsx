import SectionSubscribe from "@/components/home/sections/SectionSubscribe";
import React from "react";

const InformativeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-24 mt-16">
        {children}
        <SectionSubscribe />
      </div>
    </main>
  );
};

export default InformativeLayout;
