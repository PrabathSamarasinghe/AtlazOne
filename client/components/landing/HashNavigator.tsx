"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function HashNavigator() {
  const router = useRouter();
  const pathname = usePathname();

  // Function to wait for content to be loaded, not just DOM elements
  const waitForContentLoaded = (sectionId: string, timeout = 8000): Promise<HTMLElement | null> => {
    return new Promise((resolve) => {
      const checkContent = () => {
        const element = document.getElementById(sectionId);
        if (!element) return false;

        // Check if the section has actual content loaded
        switch (sectionId) {
          case 'portfolio':
            // Wait for portfolio projects to be loaded (look for project cards)
            const portfolioCards = element.querySelectorAll('[data-project-card]') || 
                                  element.querySelectorAll('img') ||
                                  element.querySelectorAll('.group'); // Portfolio card containers
            return portfolioCards.length > 0;
            
          case 'services':
            // Wait for service cards to be loaded
            const serviceCards = element.querySelectorAll('[data-service-card]') || 
                                element.querySelectorAll('.group') ||
                                element.querySelectorAll('div[class*="grid"]'); // Service grid containers
            return serviceCards.length > 0;
            
          case 'team':
            // Wait for team member cards to be loaded
            const teamCards = element.querySelectorAll('[data-team-member]') || 
                             element.querySelectorAll('img') ||
                             element.querySelectorAll('.group'); // Team member containers
            return teamCards.length > 0;
            
          case 'blog':
            // Wait for blog posts to be loaded
            const blogCards = element.querySelectorAll('[data-blog-post]') || 
                             element.querySelectorAll('.group') ||
                             element.querySelectorAll('article');
            return blogCards.length > 0;
            
          default:
            // For other sections (home, contact), just check if element exists and has some content
            return element.children.length > 0;
        }
      };

      // Check immediately
      if (checkContent()) {
        const element = document.getElementById(sectionId);
        resolve(element);
        return;
      }

      let attempts = 0;
      const maxAttempts = 80; // 8 seconds / 100ms intervals
      
      const interval = setInterval(() => {
        attempts++;
        
        if (checkContent()) {
          clearInterval(interval);
          const element = document.getElementById(sectionId);
          resolve(element);
        } else if (attempts >= maxAttempts) {
          clearInterval(interval);
          // Fallback to basic element check
          const element = document.getElementById(sectionId);
          resolve(element);
        }
      }, 100);
    });
  };

  // Function to scroll to element smoothly
  const scrollToElement = async (sectionId: string) => {
    const element = await waitForContentLoaded(sectionId);
    if (element) {
      // Add a small delay to ensure rendering is complete
      setTimeout(() => {
        const offset = 100; // Match NavBar offset
        const elementPosition = element.offsetTop - offset;
        
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }, 200);
    }
  };

  useEffect(() => {
    // Only run on main page (not service pages)
    if (pathname !== "/") return;

    // Handle hash navigation when the component mounts or pathname changes
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.substring(1);
      scrollToElement(sectionId);
    } else {
      // If no hash, scroll to top with small delay to ensure page is rendered
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
        scrollToElement(sectionId);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname]);

  return null; // This component doesn't render anything
}
