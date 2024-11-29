import { Booking, Payment } from "@/app/(common)/checkout/success/[payment_id]/page";
import { ContentItem } from "@/components/guide/table/partials/TableContents";
import { HeadItem } from "@/components/guide/table/partials/TableHeading";
import Table from "@/components/guide/table/table";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import Pagination from "@/components/shared/Pagination";
import { TourMeta } from "@/data/tours";
import { getImage } from "@/lib/assets";
import { get } from "@/lib/restApi";
import moment from "moment";
import Image from "next/image";
import React from "react";



interface BookingResponse {
  data: Booking[];
  meta: TourMeta;
  links: object;
}

const headings: HeadItem[] = [
  {
    title: "ID",
  },
  {
    title: "Tour Image",
  },
  {
    title: "Tour Name",
  },
  {
    title: "Customer",
  },
  {
    title: "Booking Date",
  },
  {
    title: "Amount",
  },
  {
    title: "Payment Status",
  },
  {
    title: "Action",
  },
];

const BookingPage = async () => {
  const bookings = (await getPayments()) as unknown as BookingResponse;
  const { data, meta } = bookings;

  const contents: ContentItem[][] = [];

  if (data.length > 0) {
    data.map((item: any, index: number) => {
      contents.push([
        { value: "#" + item.id },
        {
          value: (
            <Image
              src={getImage(item?.tour?.images[0]?.thumbnail) || ""}
              width={100}
              height={100}
              alt="tour image"
              className="object-cover"
            />
          ),
        },
        { value: item.tour.title },
        { value: item.user.name },
        { value: moment(item.booking_date).format("DD MMM, YYYY") },
        { value: item.total },
        { value: item.status === 1 ? "Paid" : "Unpaid" },
        { value: <ButtonSecondary href={`/dashboard/bookings/${item.id}`}>View</ButtonSecondary> },
      ]);
    });
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <h2 className="text-3xl font-semibold">Bookings</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            {
              <div className="overflow-hidden bg-white dark:bg-neutral-800 border border-gray-200 dark:border-gray-700 md:rounded-lg mb-10">
                <Table headItems={headings} contents={contents} />
              </div>
            }
            {contents.length === 0 && (
              <div className="text-center my-5">No booking found!</div>
            )}
            {data.length > 0 && (
              <Pagination pagination={meta} pageUrl="/dashboard/bookings" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const getPayments = async () => {
  try {
    const response = await get("/guides/bookings");
    return response;
  } catch (error) {
    throw error;
  }
};

export default BookingPage;
