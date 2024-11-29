import React, { FC } from "react";
import twFocusClass from "@/utils/twFocusClass";
import Link from "next/link";
import { TourMeta } from "@/data/tours";
import { getRoute } from "@/lib/urls";

export interface PaginationProps {
  className?: string;
  pagination: TourMeta;
  pageUrl?: string;
}

const Pagination: FC<PaginationProps> = ({ className = "", pagination, pageUrl = "/" }) => {

  const PageItem = ({pag, index}: { pag: any; index: number }) => {
    if (pag.active) {
      // RETURN ACTIVE PAGINATION
      return (
        <span
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
        >
          {pag.label}
        </span>
      );
    }
    // RETURN UNACTIVE PAGINATION
    return (
      <Link
        key={index}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 `}
        href={getRoute(pageUrl + "?page=" + Number(pag.label))}
      >
        {pag?.label}
      </Link>
    );
  };

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      {pagination.links.filter((pag) => Number(pag.label)).map((pag, index) => <PageItem key={index} pag={pag} index={index} />)}
    </nav>
  );
};

export default Pagination;
