"use client";
import TourPagination from "@/components/guide/Pagination";
import { ContentItem } from "@/components/guide/table/partials/TableContents";
import { HeadItem } from "@/components/guide/table/partials/TableHeading";
import Table from "@/components/guide/table/table";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import { getImage } from "@/lib/assets";
import useGuideTours from "@/services/redux/actions/useGuideTours";
import { ITour } from "@/services/redux/reducers/slices/GuideToursSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const headings: HeadItem[] = [
  {
    title: "#",
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

const DashboardTours = () => {
  const { push } = useRouter();
  const { tours, pagination, loading } = useGuideTours();
  const [contents, setContents] = React.useState<ContentItem[][]>([]);

  const generateContent = () => {
    if (tours.length > 0) {
      const items: ContentItem[][] = [];
      tours.forEach((tour: ITour) => {
        const currentImage = tour?.images[0];
        const imagePath = getImage(currentImage.thumbnail);
        items.push([
          { value: tour.id },
          {
            // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
            value: <img width={100} height={100} src={imagePath} />,
          },
          { value: tour.title },
          { value: tour?.category?.category },
          { value: tour?.price },
          { value: tour.status },
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
        ]);
      });
      setContents(items);
    }
  };

  useEffect(() => {
    generateContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tours]);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="flex-grow ">
          <h2 className="text-3xl font-semibold ">Tours</h2>
        </div>
        <div className="flex-shrink-0 flex">
          <ButtonSecondary
            className="text-sm"
            onClick={() => push("/dashboard/create-tour")}
          >
            Add New
          </ButtonSecondary>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            {loading && <div className="text-center my-5">Loading...</div>}
            {!loading && contents.length > 0 && (
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <Table headItems={headings} contents={contents} />
              </div>
            )}
            {!loading && contents.length === 0 && (
              <div className="text-center my-5">No tours found</div>
            )}
          </div>
        </div>
      </div>
      {pagination && Object.keys(pagination).length > 0 && (
        <TourPagination pagination={pagination} pageUrl="/dashboard/tours" />
      )}
    </div>
  );
};

export default DashboardTours;
