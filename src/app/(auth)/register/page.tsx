import ButtonPrimary from '@/components/shared/ButtonPrimary';
import Input from '@/components/shared/Input';
import Link from 'next/link';
import React from 'react'

function Register() {
  return (
    <div className={`nc-PageSignUp  `}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Sign up
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                First Name
              </span>
              <Input type="text" placeholder="John" className="mt-1" />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Last Name
              </span>
              <Input type="text" placeholder="Doe" className="mt-1" />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input type="password" className="mt-1" />
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link href="/login" className="font-semibold underline">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register
