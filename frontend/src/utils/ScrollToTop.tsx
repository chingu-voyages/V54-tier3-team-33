import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function ScrollToTop() {
  // const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleJumpToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <button
        type="button"
        onClick={handleJumpToTop}
        className={`hover:bg-customcolortwo fixed right-3 bottom-14 z-50 cursor-pointer rounded-full border border-gray-400 bg-white p-1.5 text-black shadow-md transition-all duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Scroll to top"
        title="To top"
      >
        <ChevronDownIcon className="size-7 rotate-180" />
      </button>
    </>
  );
}
