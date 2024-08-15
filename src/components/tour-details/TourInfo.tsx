import StartRating from "../home/partials/StartRating";
import Avatar from "../shared/Avatar";
import Badge from "../shared/Badge";

const TourInfo = () => {
  return (
    <div className="listingSection__wrap !space-y-6">
      {/* 1 */}
      <div className="flex justify-between items-center">
        <Badge color="pink" name="Specific Tour" />
        {/* <LikeSaveBtns /> */}
      </div>

      {/* 2 */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
        Trang An Boat Tour & Mua Cave
      </h2>

      {/* 3 */}
      <div className="flex items-center space-x-4">
        <StartRating />
        <span>·</span>
        <span>
          <i className="las la-map-marker-alt"></i>
          <span className="ml-1"> Kandy, Sri Lanka</span>
        </span>
      </div>

      {/* 4 */}
      <div className="flex items-center">
        <Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
        <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
          Tour by{" "}
          <span className="text-neutral-900 dark:text-neutral-200 font-medium">
            John Doe
          </span>
        </span>
      </div>

      {/* 5 */}
      <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

      {/* 6 */}
      <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
          <i className="las la-clock text-2xl"></i>
          <span className="">3.5 hours</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
          <i className="las la-user-friends text-2xl"></i>
          <span className="">Up to 10 people</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 text-center sm:text-left sm:space-x-3 ">
          <i className="las la-language text-2xl"></i>
          <span className="">English, Tamil & Sinhala</span>
        </div>
      </div>
    </div>
  );
};

export default TourInfo;