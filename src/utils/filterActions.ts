"use client";
import { useState, useCallback, useEffect } from "react";
import { ICategory } from "@/services/redux/reducers/slices/TourCategorySlice";
import { createSearchUrl } from "@/services/server/tourActions";
import { useSearchParams } from "next/navigation";

export interface FilterType {
  key: string;
  value: string;
}

const useFilters = (categories: ICategory[], router: any) => {
  const [filters, setFilters] = useState<FilterType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);
  const [rangePrices, setRangePrices] = useState([0, 0]);
  const searchParams = useSearchParams();
  let updatedSearchParams = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    if (searchParams && categories) {
      setFilters(getFilters());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, categories]);

  const getFilters = useCallback(() => {
    const filtersItems: FilterType[] = [];

    if (searchParams.has("byCategories")) {
      const categoryIds = JSON.parse(searchParams.get("byCategories") || "[]");
      let updatedCategories = [...selectedCategories];
      if (Array.isArray(categoryIds) && categoryIds.length > 0) {
        categoryIds.forEach((value: string) => {
          const category = categories.find(
            (category) => category.id == parseInt(value)
          );
          if (category) {
            if (!updatedCategories.includes(category)) {
              setSelectedCategories([...updatedCategories, category]);
            }
            filtersItems.push({
              key: "byCategories",
              value: category.category,
            });
          }
        });
      }
    }

    if (searchParams.has("minPrice")) {
      filtersItems.push({
        key: "minPrice",
        value:
          "Price range : USD " +
          searchParams.get("minPrice") +
          " - " +
          searchParams.get("maxPrice"),
      });
    }

    if (searchParams.has("search")) {
      filtersItems.push({
        key: "search",
        value: searchParams.get("search") || "",
      });
    }

    return filtersItems;
  }, [categories, searchParams, selectedCategories]);

  const onFilterRemove = useCallback(
    async (filter: FilterType) => {
      const newFilters = filters.filter((item: FilterType) => item !== filter);
      setFilters(newFilters);

      let filterValue: any = searchParams.get(filter.key);

      if (
        filter.key === "byCategories" &&
        Array.isArray(JSON.parse(filterValue))
      ) {
        const category = categories.find(
          (cat: ICategory) => cat.category === filter.value
        );

        if (category) {
          const updatedCategoryIds = JSON.parse(filterValue).filter(
            (value: string) => parseInt(value) !== category.id
          );

          filterValue =
            updatedCategoryIds.length > 0
              ? JSON.stringify(updatedCategoryIds)
              : undefined;
          setSelectedCategories(
            selectedCategories.filter((cat: ICategory) => cat !== category)
          );
        }

        updatedSearchParams[filter.key] = filterValue;
      }

      if (["minPrice", "maxPrice"].includes(filter.key)) {
        delete updatedSearchParams.minPrice;
        delete updatedSearchParams.maxPrice;
        setRangePrices([0, 0]);
      }

      if (filter.key === "search") {
        delete updatedSearchParams.search;
      }

      // Remove undefined or empty parameters from searchParams
      Object.keys(updatedSearchParams).forEach(
        (key) =>
          updatedSearchParams[key] === undefined &&
          delete updatedSearchParams[key]
      );

      router.push("/tours?" + await createSearchUrl(updatedSearchParams));
    },
    [
      filters,
      searchParams,
      updatedSearchParams,
      router,
      categories,
      selectedCategories,
    ]
  );

  const onCategoryChange = (item: ICategory) => {
    if (selectedCategories.includes(item)) {
      setSelectedCategories(selectedCategories.filter((i) => i !== item));
    } else {
      setSelectedCategories([...selectedCategories, item]);
    }
  };

  const clearSelectedCategories = () => {
    setSelectedCategories([]);
  };

  const reset = () => {
    setFilters([]);
    setSelectedCategories([]);
    setRangePrices([0, 0]);
  };

  return {
    filters,
    rangePrices,
    selectedCategories,
    onFilterRemove,
    onCategoryChange,
    clearSelectedCategories,
    setRangePrices,
    reset,
  };
};

export default useFilters;
