import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { RotatingLines } from "react-loader-spinner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const SignIn = () => {
  const {    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("1Password");
  const router = useRouter();
  const handleSignIn = async (data) => {
    setLoading(true);
    try {
      const resp = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: `${window.location.origin}/gallery`,
      });
      if (!resp?.error) {
        setLoading(false);
        toast.success("Signed in successfully");
        router.push(resp.url);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <section className="bg-black/50 w-full h-screen px-4 flex items-center justify-center">
      <section className="bg-white flex flex-col items-center w-full md:w-[600px] rounded-xl px-3 md:px-6 py-6 md:py-12">
        <form
          className="space-y-6  w-full rounded-md  z-[10000]"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <div>
            <label className="block mb-2 text-base font-semibold text-gray-600 dark:text-gray">
              E-mail
            </label>
            <input
              defaultValue={email}
              type="email"
              id="email"
              {...register("email", {
                required: "Please enter your email address",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              className={`bg-gray-50 border  text-gray-900 sm:text-sm rounded-lg focus:border-my-primary focus:border-2 focus:outline-none focus:ring-0 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500 focus:ring-amber-500 focus:border-amber-500`}
              placeholder="Enter your email address"
            />
            {errors?.email && (
              <span className="text-red-500 text-sm">
                {errors?.email?.message}
              </span>
            )}
          </div>

          <div className="">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">
              Password
            </label>
            <input
              defaultValue={password}
              type="password"
              {...register("password", {
                required: "Please enter your password",
                minLength: {
                  value: 7,
                  message: "Password must be at least 7 characters long",
                },
              })}
              id="password"
              placeholder="Enter your password"
              className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg focus:border-my-primary focus:border-2 focus:outline-none focus:ring-0 block w-full p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-yellow-500 focus:ring-amber-500 focus:border-amber-500`}
            />
            {errors?.password && (
              <span className="text-red-500 text-sm">
                {errors?.password?.message}
              </span>
            )}
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full  text-white-600 bg-[#fdb44b] my-[2rem] focus:ring-4 focus:outline-none  rounded-lg flex justify-center items-center px-5 py-3 tracking-wider text-xl "
          >
            {loading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="7"
                animationDuration="0.75"
                width="30"
                visible={true}
              />
            ) : (
              <span className="font-medium">Log In</span>
            )}
          </button>
        </form>
      </section>
    </section>
  );
};

export default SignIn;
