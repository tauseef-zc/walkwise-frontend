import GuideDetails from "@/components/guide/GuideDetails";
import GuideTours from "@/components/guide/GuideTours";
import { TourGuide } from "@/data/tours";
import { getGuide } from "@/services/server/guideActions";
import { notFound } from "next/navigation";
import React, { FC } from "react";

interface GuideDetailProps {
  params: { guide_id: number };
  searchParams: { [key: string]: number | string | string[] | undefined };
}

interface GuideResponse {
  data: any;
  meta: any;
  guide: TourGuide;
}

const GuideDetailPage: FC<GuideDetailProps> = async ({
  params,
  searchParams: { page = 1 },
}) => {
  if (
    params.guide_id == undefined ||
    params.guide_id == null ||
    isNaN(params.guide_id)
  ) {
    return notFound();
  }
  const response = (await getGuide(params.guide_id, page).catch(() => {
    return notFound();
  })) as unknown as GuideResponse;
  const { data, meta, guide } = response;

  return (
    <div className={`nc-AuthorPage `}>
      <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
        <div className="block flex-grow mb-24 lg:mb-0">
          <div className="lg:sticky lg:top-24">
            <GuideDetails guide={guide} />
          </div>
        </div>
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
          <GuideTours guide={guide} data={data} meta={meta} />
        </div>
      </main>
    </div>
  );
};

export default GuideDetailPage;
