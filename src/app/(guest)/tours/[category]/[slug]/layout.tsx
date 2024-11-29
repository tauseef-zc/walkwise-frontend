import React, { ReactNode } from "react";

const DetailLayout = ({ children }: { children: ReactNode }) => {

  return (
    <div className="ListingDetailPage mt-10">
      <div className="container ListingDetailPage__content">{children}</div>
    </div>
  );
};

export default DetailLayout;
