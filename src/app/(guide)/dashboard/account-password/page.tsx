import UpdatePassword from '@/components/my-account/UpdatePassword';
import React from 'react'

const UpdatePasswordPage = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      <h2 className="text-3xl font-semibold">Account Password</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 md:px-6 lg:px-8">
            <UpdatePassword />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePasswordPage
