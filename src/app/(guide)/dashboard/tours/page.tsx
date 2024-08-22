"use client";
import { ContentItem } from "@/components/guide/table/partials/TableContents";
import { HeadItem } from "@/components/guide/table/partials/TableHeading";
import Table from "@/components/guide/table/table";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const headings: HeadItem[] = [
  {
    title: "#",
    children: (
      <input
        type="checkbox"
        className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
      />
    ),
  },
  {
    title: "Cover",
  },
  {
    title: "Tour Name",
  },
  {
    title: "Category",
  },
  {
    title: "Price",
  },
  {
    title: "Status",
  },
  {
    title: "Action",
  },
];

const contents: ContentItem[][] = [
  [
    {
      value: "#781",
    },
    {
      value: <img src="https://picsum.photos/100?random=1" />,
    },
    {
      value: "Polonnaruwa Tour 3 days / 2 nights",
    },
    {
      value: "Historical Heritage",
    },
    {
      value: "$100",
    },
    {
      value: "Active",
    },
    {
      value: (
        <Link
          href="/dashboard/tours/1"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          View
        </Link>
      ),
    },
  ],
  [
    {
      value: "#781",
    },
    {
      value: <img src="https://picsum.photos/100?random=1" />,
    },
    {
      value: "Polonnaruwa Tour 3 days / 2 nights",
    },
    {
      value: "Historical Heritage",
    },
    {
      value: "$100",
    },
    {
      value: "Active",
    },
    {
      value: (
        <Link
          href="/dashboard/tours/1"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          View
        </Link>
      ),
    },
  ],
];

const DashboardTours = () => {
  const { push } = useRouter();
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="flex-grow ">
          <h2 className="text-3xl font-semibold ">Tours</h2>
        </div>
        <div className="flex-shrink-0 flex">
          <ButtonSecondary
            className="text-sm"
            onClick={() => push('/dashboard/create-tour')}
          >
            Add New
          </ButtonSecondary>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <Table headItems={headings} contents={contents} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <a
          href="#"
          className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>

          <span>previous</span>
        </a>

        <div className="items-center hidden md:flex gap-x-3">
          <Link
            href="#"
            className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
          >
            1
          </Link>
          <Link
            href="#"
            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          >
            2
          </Link>
          <Link
            href="#"
            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          >
            3
          </Link>
          <Link
            href="#"
            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          >
            ...
          </Link>
          <Link
            href="#"
            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          >
            12
          </Link>
          <Link
            href="#"
            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          >
            13
          </Link>
          <Link
            href="#"
            className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
          >
            14
          </Link>
        </div>

        <a
          href="#"
          className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <span>Next</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </a>
      </div>
    </>
  );
};

export default DashboardTours;
