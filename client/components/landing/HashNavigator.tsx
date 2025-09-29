"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function HashNavigator() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only run on main page (not service pages)
    if (pathname !== "/") return;

    // Handle hash navigation when the component mounts or pathname changes
    const hash = window.location.hash;
    if (hash) {
      // Remove the # from the hash
      const sectionId = hash.substring(1);

      // Wait a bit for the page to fully load before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80; // Account for navbar height
          const elementPosition = element.offsetTop - offset;

          window.scrollTo({
            top: elementPosition,
            behavior: "smooth",
          });
        }
      }, 300); // Increased delay to ensure page is fully loaded
    } else {
      // If no hash, scroll to top
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [pathname]);

  // Listen for hash changes during runtime
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && pathname === "/") {
        const sectionId = hash.substring(1);
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.offsetTop - offset;

          window.scrollTo({
            top: elementPosition,
            behavior: "smooth",
          });
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname]);

  return null; // This component doesn't render anything
}
