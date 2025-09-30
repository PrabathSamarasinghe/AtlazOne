"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function HashNavigator() {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    // Only run on main page (not service pages)
    if (pathname !== "/") return;

    const handleNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        // Remove the # from the hash
        const sectionId = hash.substring(1);

        // Wait for MainPageWrapper content to load
        const scrollToSection = () => {
          const element = document.getElementById(sectionId);
          if (element) {
            const offset = 80; // Account for navbar height
            const elementPosition = element.offsetTop - offset;

            window.scrollTo({
              top: elementPosition,
              behavior: "smooth",
            });
            console.log(`📍 Navigated to section: ${sectionId}`);
          } else {
            console.log(`⚠️ Section not found: ${sectionId}`);
          }
        };

        // Try multiple times with increasing delays
        setTimeout(scrollToSection, 300);
        setTimeout(scrollToSection, 800);
        setTimeout(scrollToSection, 1500);
      } else {
        // If no hash, scroll to top
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }, 100);
      }
    };

    // Handle hash navigation when the component mounts or pathname changes
    handleNavigation();

    // Also listen for mainPageLoaded event
    const handleMainPageLoaded = () => {
      console.log('🔄 Main page loaded, re-running hash navigation...');
      setTimeout(handleNavigation, 200);
    };

    window.addEventListener('mainPageLoaded', handleMainPageLoaded);
    
    return () => {
      window.removeEventListener('mainPageLoaded', handleMainPageLoaded);
    };
  }, [pathname]);
  // Listen for hash changes during runtime
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && pathname === "/") {
        const sectionId = hash.substring(1);
        
        const scrollToSection = () => {
          const element = document.getElementById(sectionId);
          if (element) {
            const offset = 80;
            const elementPosition = element.offsetTop - offset;

            window.scrollTo({
              top: elementPosition,
              behavior: "smooth",
            });
            console.log(`📍 Hash changed, navigated to: ${sectionId}`);
          } else {
            console.log(`⚠️ Hash change - section not found: ${sectionId}`);
          }
        };

        // Try multiple times in case content is still loading
        scrollToSection();
        setTimeout(scrollToSection, 300);
        setTimeout(scrollToSection, 600);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname]);

  return null; // This component doesn't render anything
}
