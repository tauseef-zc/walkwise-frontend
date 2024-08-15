"use client";

import React, { FC, useState } from "react";
import SearchForm from "./SearchForm";

export interface HeroSearchFormProps {
  className?: string;
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
    >
      <SearchForm />
    </div>
  );
};

export default HeroSearchForm;
