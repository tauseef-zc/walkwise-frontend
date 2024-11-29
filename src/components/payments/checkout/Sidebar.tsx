import StartRating from '@/components/home/partials/StartRating';
import { getImage } from '@/lib/assets';
import { Checkout } from '@/services/app/CheckoutService';
import Image from 'next/image';
import React, { FC } from 'react'

interface SidebarProps {
  checkout: Checkout
}

const Sidebar: FC<SidebarProps> = ({ checkout }) => {

  if (Object.keys(checkout).length === 0) {
    return null;
  }

  return (
    checkout &&
    checkout?.tour && (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <Image
                alt=""
                fill
                sizes="200px"
                className="object-cover"
                src={getImage("/" + checkout?.tour?.images[0]?.image) || ""}
              />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                {checkout && checkout?.tour?.category?.category}
              </span>
              <span className="text-base font-medium mt-1 block">
                {checkout?.tour?.title}
              </span>
            </div>
            <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
              {checkout?.tour?.location?.address}
            </span>
            <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
            <StartRating />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">Price detail</h3>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>
              ${checkout.tourPrice} x {checkout.totalGuests} guests
            </span>
            <span>${checkout.totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Service charge</span>
            <span>$0</span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${checkout.totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    )
  );
}

export default Sidebar
