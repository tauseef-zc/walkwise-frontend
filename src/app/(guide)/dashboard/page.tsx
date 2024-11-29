import { get } from "@/lib/restApi";
import {
  CalendarIcon,
  CurrencyDollarIcon,
  MapIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

interface DashboardResponse {
  bookingCount: number;
  toursCount: number;
  earnings: number;
  rating: number;
}

const getDashboardStats = async () => {
  try {
    const response = await get("/guides/dashboard");
    return response;
  } catch (error) {
    throw error;
  }
};

const Dashboard = async () => {
  const response = (await getDashboardStats()) as unknown as DashboardResponse;
  return (
    <>
      <h2 className="text-3xl font-semibold mb-8">Dashboard</h2>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4">
        <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3]  dark:border-[#ffffff33] dark:bg-neutral-900 dark:text-white dark:shadow-none">
          <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
            <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
              <span className="flex items-center text-brand-500 dark:text-white">
                <MapIcon className="h-12 w-12" />
              </span>
            </div>
          </div>
          <div className="h-50 ml-4 flex w-auto flex-col justify-center">
            <p className="font-dm text-sm font-medium text-gray-600 dark:text-gray-300">
              Total Tours
            </p>
            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
              {response?.toursCount ?? 0}
            </h4>
          </div>
        </div>
        <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-neutral-900 dark:text-white dark:shadow-none">
          <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
            <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
              <span className="flex items-center text-brand-500 dark:text-white">
                <CalendarIcon className="h-12 w-12" />
              </span>
            </div>
          </div>
          <div className="h-50 ml-4 flex w-auto flex-col justify-center">
            <p className="font-dm text-sm font-medium text-gray-600 dark:text-gray-300">
              Total Bookings
            </p>
            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
              {response?.bookingCount ?? 0}
            </h4>
          </div>
        </div>
        <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-neutral-900 dark:text-white dark:shadow-none">
          <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
            <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
              <span className="flex items-center text-brand-500 dark:text-white">
                <CurrencyDollarIcon className="h-12 w-12" />
              </span>
            </div>
          </div>
          <div className="h-50 ml-4 flex w-auto flex-col justify-center">
            <p className="font-dm text-sm font-medium text-gray-600 dark:text-gray-300">
              Your Earnings
            </p>
            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
              ${response?.earnings ?? 0}
            </h4>
          </div>
        </div>
        <div className="relative flex flex-grow !flex-row flex-col items-center rounded-[10px] rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:bg-neutral-900 dark:text-white dark:shadow-none">
          <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
            <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
              <span className="flex items-center text-brand-500 dark:text-white">
                {/* Star rating icon */}
                <StarIcon className="h-12 w-12" />
              </span>
            </div>
          </div>
          <div className="h-50 ml-4 flex w-auto flex-col justify-center">
            <p className="font-dm text-sm font-medium text-gray-600 dark:text-gray-300">
              Your Rating
            </p>
            <h4 className="text-xl font-bold text-navy-700 dark:text-white">
              {Number(response?.rating).toFixed(1) ?? 0}/5
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
