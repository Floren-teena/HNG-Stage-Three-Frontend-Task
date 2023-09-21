import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white py-3 justify-center mt-500px align-text-bottom">
      <div className="container flex gap-4 flex-col mx-auto justify-center ">
        <div className="flex py-1 text-[#6B7280] font-bold text-sm md:text-lg justify-center">
          &copy; {new Date().getFullYear()} Florentina Antigha | All Rights
          Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
