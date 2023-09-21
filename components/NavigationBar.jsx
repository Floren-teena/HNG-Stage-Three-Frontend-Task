import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FilterForm from "./FilterForm";
import { signOut } from "next-auth/react";

const NavigationBar = ({ filterSearch }) => {
  const handleSignout = async () => {
    await signOut({
      redirect: false,
    });
  };

  return (
    <nav
      className={`bg-zinc-900 shadow-md transition-all duration-300 ease-in-out px-4 md:px-8 py-4 z-[999999999] fixed top-0 left-0 w-full`}
    >
      <section className="relative">
        <div className="flex justify-between items-center">
          <div>
            <Link href="#">
              <div className="text-xl flex items-center gap-3 md:p-2 font-bold">
                <Image
                  src="/assets/images/Tina_Interiors.png"
                  alt="Tina_Interiors logo"
                  height={70}
                  width={170}
                />
              </div>
            </Link>
          </div>
          <div className="hidden md:flex rounded-lg">
            <FilterForm filterSearch={filterSearch} />
          </div>
          <button
            onClick={handleSignout}
            className="cursor-pointer  font-semibold text-white"
          >
            Log out
          </button>
        </div>
        <div className="flex md:hidden rounded-lg w-full">
          <FilterForm filterSearch={filterSearch} />
        </div>
      </section>
    </nav>
  );
};

export default NavigationBar;
