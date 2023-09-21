import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Bars } from "react-loader-spinner";

function SecureRoute({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return (
      <section className="h-screen flex w-full justify-center items-center">
        <Bars
          height="100"
          width="100"
          color="#fdb44b"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </section>
    );
  }

  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }
  return <main className="">{children}</main>;
}

export default SecureRoute;
