import { MyAccountNav } from "@/components/my-account/Nav";
import React, { FC } from "react";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const MyAccountLayout: FC<CommonLayoutProps> = ({ children }) => {

  return (
    <div className="nc-CommonLayoutAccount bg-neutral-50 dark:bg-neutral-900">
      <div className="border-b border-neutral-200 dark:border-neutral-700 pt-12 bg-white dark:bg-neutral-800">
        <MyAccountNav />
      </div>
      <div className="container pt-14 sm:pt-20 pb-24 lg:pb-32">{children}</div>
    </div>
  );
};

export default MyAccountLayout;
