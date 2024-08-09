import React, { FC } from 'react'

export interface CommonLayoutProps {
  children: React.ReactNode;
  params: {
    stepIndex: string;
  };
}

const layout: FC<CommonLayoutProps> = ({ children }) => {
  return (
    <div className={`nc-PageLogin`}>
      <div className="container">
        <div
          className={`nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

layout.propTypes = {

}

export default layout

