import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {

  return (
    <div className={`nc-PageSignUp`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Sign up
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          <RegisterForm />
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
};

export default Register;