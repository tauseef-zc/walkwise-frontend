"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ButtonThird from "@/components/shared/ButtonThird";
import ButtonClose from "@/components/shared/ButtonClose";
import Checkbox from "@/components/shared/Checkbox";
import convertNumbThousand from "@/utils/convertNumbThousand";
import Slider from "rc-slider";
import useTourCategory from "@/services/redux/actions/useTourCategory";
import { ICategory } from "@/services/redux/reducers/slices/TourCategorySlice";
import { createSearchUrl } from "@/services/server/tourActions";
import { useRouter } from "next/navigation";
import { TourProps } from "@/app/(guest)/tours/page";
import useFilters from "@/utils/filterActions";

interface FilterType {
  key: string;
  value: string;
}

const TabFilters = ({
  searchParams,
  defaultCategory,
}: {
  searchParams: TourProps;
  defaultCategory?: any;
}) => {
  const { categories } = useTourCategory();
  const [isOpenMoreFilter, setIsOpenMoreFilter] = useState(false);

  const closeModalMoreFilter = () => setIsOpenMoreFilter(false);
  const openModalMoreFilter = () => setIsOpenMoreFilter(true);
  const router = useRouter();
  const {
    filters,
    rangePrices,
    selectedCategories,
    onFilterRemove,
    onCategoryChange,
    clearSelectedCategories,
    setRangePrices,
    reset,
  } = useFilters(categories, router);

  const renderXClear = () => {
    return (
      <span className="w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  const renderTabsTypeOfPlace = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-6000 focus:outline-none ${
                open ? "!border-primary-500 " : ""
              }`}
            >
              <span>Type of experiences</span>
              <i className="las la-angle-down ml-2"></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-5">
                    {categories.length > 0 &&
                      categories.map((item) => (
                        <div key={item.category} className="">
                          <Checkbox
                            name={`category-${item.id}`}
                            label={item.category}
                            subLabel={item.info}
                            onChange={() => onCategoryChange(item)}
                            defaultChecked={
                              filters.length > 0 &&
                              filters.find(
                                (filter) =>
                                  filter.key === "byCategories" &&
                                  filter.value === item.category
                              ) &&
                              selectedCategories.includes(item)
                            }
                          />
                        </div>
                      ))}
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={() => {
                        clearSelectedCategories();
                        close();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={async () => {
                        close();
                        if (selectedCategories.length > 0) {
                          const categoryIds = selectedCategories.map(
                            (item) => item.id
                          );
                          searchParams.byCategories =
                            JSON.stringify(categoryIds);
                          router.push(
                            `/tours?${await createSearchUrl(searchParams)}`
                          );
                        } else {
                          delete searchParams.byCategories;
                          router.push(
                            `/tours?${await createSearchUrl(searchParams)}`
                          );
                        }
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderTabsPriceRage = () => {
    return (
      <Popover className="relative">
        {({ close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-6000 focus:outline-none `}
            >
              {rangePrices[0] >= 0 && rangePrices[1] > 0 ? (
                <span>
                  {`$${convertNumbThousand(
                    rangePrices[0]
                  )} - $${convertNumbThousand(rangePrices[1])}`}{" "}
                </span>
              ) : (
                <span>Price range</span>
              )}
              {rangePrices[0] >= 0 && rangePrices[1] > 0 && renderXClear()}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0 ">
                <div className="overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
                  <div className="relative flex flex-col px-5 py-6 space-y-8">
                    <div className="space-y-5">
                      <span className="font-medium">Price in USD</span>
                      <Slider
                        range
                        min={0}
                        max={2000}
                        defaultValue={[rangePrices[0], rangePrices[1]]}
                        allowCross={false}
                        onChange={(e) => setRangePrices(e as number[])}
                      />
                    </div>

                    <div className="flex justify-between space-x-5">
                      <div>
                        <label
                          htmlFor="minPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          Min price
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-neutral-500 sm:text-sm">
                              $
                            </span>
                          </div>
                          <input
                            type="text"
                            name="minPrice"
                            disabled
                            id="minPrice"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                            value={rangePrices[0]}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="maxPrice"
                          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                          Max price
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-neutral-500 sm:text-sm">
                              $
                            </span>
                          </div>
                          <input
                            type="text"
                            disabled
                            name="maxPrice"
                            id="maxPrice"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                            value={rangePrices[1]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={async () => {
                        close();
                        setRangePrices([0, 0]);
                        delete searchParams.minPrice;
                        delete searchParams.maxPrice;
                        router.push(
                          `/tours?${await createSearchUrl(searchParams)}`
                        );
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={async () => {
                        close();
                        if (rangePrices[0] >= 0 && rangePrices[1] > 0) {
                          searchParams.minPrice = rangePrices[0];
                          searchParams.maxPrice = rangePrices[1];
                          router.push(
                            `/tours?${await createSearchUrl(searchParams)}`
                          );
                        }
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderMoreFilterItem = (
    data: ICategory[],
    selectedCategories: ICategory[]
  ) => {
    const list1 = data.filter((_, i) => i < data.length / 2);
    const list2 = data.filter((_, i) => i >= data.length / 2);
    return (
      <div className="grid sm:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-5">
          {list1.map((item) => (
            <Checkbox
              key={`category-${item.id}`}
              name={`category-${item.id}`}
              subLabel={item.info}
              label={item.category}
              defaultChecked={selectedCategories.includes(item)}
              onChange={() => onCategoryChange(item)}
            />
          ))}
        </div>
        <div className="flex flex-col space-y-5">
          {list2.map((item) => (
            <Checkbox
              key={`category-${item.id}`}
              name={`category-${item.id}`}
              subLabel={item.info}
              label={item.category}
              defaultChecked={selectedCategories.includes(item)}
              onChange={() => onCategoryChange(item)}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderTabMobileFilter = () => {
    const activeFilters =
      selectedCategories.length +
      (rangePrices[0] > 0 && rangePrices[1] > 0 ? 1 : 0);
    return (
      <div>
        <div
          className={`flex items-center justify-center px-4 py-2 text-sm rounded-full border focus:outline-none cursor-pointer ${
            activeFilters > 0
              ? "border-primary-500 bg-primary-50 text-primary-700"
              : ""
          }`}
          onClick={openModalMoreFilter}
        >
          <span>
            <span className="hidden sm:inline">Experiences</span> filters 
            {activeFilters > 0 ? " (" + activeFilters + ")" : ""}
          </span>
          {activeFilters > 0 && renderXClear()}
        </div>

        <Transition appear show={isOpenMoreFilter} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={closeModalMoreFilter}
          >
            <div className="min-h-screen text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                className="inline-block py-8 px-2 h-screen w-full max-w-4xl"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Experiences filters
                    </Dialog.Title>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalMoreFilter} />
                    </span>
                  </div>

                  <div className="flex-grow overflow-y-auto">
                    <div className="px-4 sm:px-6 divide-y divide-neutral-200 dark:divide-neutral-800">
                      <div className="py-7">
                        <h3 className="text-xl font-medium">
                          Type of experiences
                        </h3>
                        <div className="mt-6 relative ">
                          {renderMoreFilterItem(categories, selectedCategories)}
                        </div>
                      </div>
                      {/* ---- */}
                      <div className="py-7">
                        <h3 className="text-xl font-medium">Range Prices</h3>
                        <div className="mt-6 relative ">
                          <div className="relative flex flex-col space-y-8">
                            <div className="space-y-5">
                              <Slider
                                range
                                min={0}
                                max={2000}
                                defaultValue={[rangePrices[0], rangePrices[1]]}
                                allowCross={false}
                                onChange={(e) => setRangePrices(e as number[])}
                              />
                            </div>

                            <div className="flex justify-between space-x-5">
                              <div>
                                <label
                                  htmlFor="minPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  Min price
                                </label>
                                <div className="mt-1 relative rounded-md">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      $
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    name="minPrice"
                                    disabled
                                    id="minPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                    value={rangePrices[0]}
                                  />
                                </div>
                              </div>
                              <div>
                                <label
                                  htmlFor="maxPrice"
                                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                >
                                  Max price
                                </label>
                                <div className="mt-1 relative rounded-md">
                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-neutral-500 sm:text-sm">
                                      $
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    disabled
                                    name="maxPrice"
                                    id="maxPrice"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900"
                                    value={rangePrices[1]}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between">
                    <ButtonThird
                      onClick={async () => {
                        clearSelectedCategories();
                        setRangePrices([0, 0]);
                        delete searchParams.minPrice;
                        delete searchParams.maxPrice;
                        router.push(
                          `/tours?${await createSearchUrl(searchParams)}`
                        );
                        closeModalMoreFilter();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={async () => {
                        if (rangePrices[0] >= 0 && rangePrices[1] > 0) {
                          searchParams.minPrice = rangePrices[0];
                          searchParams.maxPrice = rangePrices[1];
                        }

                        if (selectedCategories.length > 0) {
                          const categoryIds = selectedCategories.map(
                            (item) => item.id
                          );
                          searchParams.byCategories =
                            JSON.stringify(categoryIds);
                        } else {
                          delete searchParams.byCategories;
                        }

                        router.push(
                          `/tours?${await createSearchUrl(searchParams)}`
                        );

                        closeModalMoreFilter();
                      }}
                      sizeClass="px-4 py-2 sm:px-5"
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  const filterPills = ({
    filters,
    onRemoveFilter,
  }: {
    filters: FilterType[];
    onRemoveFilter: any;
  }) => {
    return (
      <>
        <div className="border-b border-neutral-200 dark:border-neutral-700 my-5"></div>
        <h5 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200 mb-4">
          Active filters
        </h5>
        <div className="flex flex-wrap gap-2">
          {filters.length > 0 &&
            filters.map((filter, index) => (
              <div
                key={index}
                className="bg-blue-100 rounded-full px-4 py-2 flex items-center"
              >
                <span className="text-sm text-blue-600">{filter.value}</span>
                <button
                  className="ml-2 text-gray-400 hover:text-gray-600 transition duration-300"
                  onClick={() => onRemoveFilter(filter)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="flex lg:space-x-4">
        <div className="hidden lg:flex space-x-4">
          {!defaultCategory && renderTabsTypeOfPlace()}
          {renderTabsPriceRage()}
        </div>
        <div className="flex lg:hidden space-x-4">
          {renderTabMobileFilter()}
        </div>
      </div>
      {filters.length > 0 &&
        filterPills({
          filters,
          onRemoveFilter: onFilterRemove,
        })}
    </>
  );
};

export default TabFilters;
