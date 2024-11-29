"use client";

import { Popover, Transition } from "@headlessui/react";
import Input from "@/components/shared/Input";
import React, { FC, Fragment } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  className?: string;
}

const SearchDropdown: FC<Props> = ({ className = "" }) => {
  const inputRef = React.createRef<HTMLInputElement>();
  const [value, setValue] = React.useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/tours?search=${value}`);
    inputRef.current?.blur();
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  React.useEffect(() => {
    if (searchParams.get("search")) {
      setValue(searchParams.get("search") || "");
      inputRef.current?.focus();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <React.Fragment>
      <Popover className={`relative ${className}`}>
        {({ open }) => {
          if (open) {
            setTimeout(() => {
              inputRef.current?.focus();
            }, 100);
          }

          return (
            <>
              <Popover.Button className="text-2xl md:text-[28px] w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center">
                <i className="las la-search"></i>
              </Popover.Button>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel
                  static
                  className="absolute right-0 z-10 top-full w-screen max-w-sm"
                >
                  <form action="/tours" method="GET" onSubmit={handleSubmit}>
                    <Input
                      ref={inputRef}
                      rounded="rounded-full"
                      type="search"
                      placeholder="Type and press enter"
                      value={value}
                      onChange={handleSearch}
                      name="search"
                    />
                    <input type="submit" hidden value="" />
                  </form>
                </Popover.Panel>
              </Transition>
            </>
          );
        }}
      </Popover>
    </React.Fragment>
  );
};

export default SearchDropdown;
