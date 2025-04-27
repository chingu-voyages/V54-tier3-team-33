import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    const scrollToId = location.state?.scrollToId;
    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        const topPosition = element.offsetTop - 80;
        window.scrollTo({
          top: topPosition,
          behavior: "smooth",
        });
      }
    }
  }, [location]);

  return null;
}
