import TourCreateForm from "@/components/guide/tour/TourCreateForm";

const CreateTour = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* HEADING */}
      <div className="flex justify-center">
        <div className="flex-grow mt-10 md:mt-0 max-w-3xl">
          <h2 className="text-3xl font-semibold">Add New Tour</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex-grow mt-10 md:mt-0 max-w-3xl">
          <TourCreateForm />
        </div>
      </div>
    </div>
  );
};

export default CreateTour;
