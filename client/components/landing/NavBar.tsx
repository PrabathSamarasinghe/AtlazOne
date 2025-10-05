"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  Briefcase,
  FolderOpen,
  Users,
  BookOpen,
  Mail,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

const NavBar = () => {
  const [activeSection, setActiveSection] = useState("#home");
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesExpanded, setIsMobileServicesExpanded] =
    useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const servicesButtonRef = useRef<HTMLAnchorElement>(null);
  const router = useRouter();
  const pathname = usePathname(); // Check if we're on a service page
  const isServicePage = pathname?.startsWith("/services/");

  // Services dropdown data
  const serviceItems = [
    {
      href: "/services/ai_ml",
      label: "AI & Machine Learning",
    },
    {
      href: "/services/digital_products",
      label: "Digital Products",
    },
    {
      href: "/services/digital_transformation",
      label: "Digital Transformation",
    },

    {
      href: "/services/ui_ux_design",
      label: "UI/UX Design",
    },
  ]; // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      // Check if click is outside both the dropdown and the services button
      const isClickOnServicesButton = target.closest(
        '[aria-label*="Navigate to Services"]'
      );
      const isClickOnDropdown = target.closest(".services-dropdown");

      if (
        !isClickOnServicesButton &&
        !isClickOnDropdown &&
        isServicesDropdownOpen
      ) {
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isServicesDropdownOpen]);

  
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setIsMobileServicesExpanded(false);
    }
  }, [isMobileMenuOpen]);

  
  useEffect(() => {
    if (isServicePage) {
      setActiveSection("#services");
    } else {
      
      const hash = window.location.hash;
      if (hash && hash !== "#") {
        setActiveSection(hash);
      } else {
        // Detect current section based on scroll position
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop || 0;
        if (scrollTop < 100) {
          setActiveSection("#home");
        } else {
          // Find the current section in viewport
          const sections = [
            "#home",
            "#services",
            "#portfolio",
            "#team",
            "#blog",
            "#contact",
          ];
          const viewportCenter = window.innerHeight / 2;

          for (const sectionId of sections) {
            const element = document.querySelector(sectionId);
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
                setActiveSection(sectionId);
                break;
              }
            }
          }
        }
      }
    }
  }, [isServicePage, pathname]);
  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();

    // Handle services dropdown toggle
    if (sectionId === "#services") {
      if (isServicePage) {
        // On service page - toggle dropdown or navigate to main page
        if (isServicesDropdownOpen) {
          // If dropdown is open, close it and navigate to main page services section
          setIsServicesDropdownOpen(false);
          router.push("/#services");
          setIsMobileMenuOpen(false);
          return;
        } else {
          // Open dropdown first
          setIsServicesDropdownOpen(true);
          return;
        }
      } else {
        // On main page - toggle dropdown or scroll to section
        if (isServicesDropdownOpen) {
          // If dropdown is open, scroll to services section
          setIsServicesDropdownOpen(false);
          setActiveSection(sectionId);
          setIsScrolling(true);

          const element = document.querySelector(sectionId) as HTMLElement;
          if (element) {
            const offset = 100;
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
              top: elementPosition,
              behavior: "smooth",
            });
          }
        } else {
          // Open dropdown
          setIsServicesDropdownOpen(true);
          return;
        }
      }
    } else {
      // Handle other sections normally
      setIsServicesDropdownOpen(false);

      // If we're on a service page, navigate to main page with section hash
      if (isServicePage) {
        setActiveSection(sectionId);
        router.push(`/${sectionId}`);
        setIsMobileMenuOpen(false);
        return;
      }

      // On main page - handle normal scrolling
      setActiveSection(sectionId);
      setIsScrolling(true);

      if (sectionId === "#home") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        const element = document.querySelector(sectionId) as HTMLElement;
        if (element) {
          const offset = 100;
          const elementPosition = element.offsetTop - offset;
          window.scrollTo({
            top: elementPosition,
            behavior: "smooth",
          });
        }
      }
    }
    if (typeof (window as any).onscrollend !== "undefined") {
      const handleScrollEnd = () => {
        setIsScrolling(false);
        window.removeEventListener("scrollend", handleScrollEnd);
      };
      window.addEventListener("scrollend", handleScrollEnd, { once: true });
    } else {
      let scrollTimer: NodeJS.Timeout;
      let lastScrollTop = window.scrollY;

      const detectScrollEnd = () => {
        const currentScrollTop = window.scrollY;
        if (currentScrollTop === lastScrollTop) {
          setIsScrolling(false);
          window.removeEventListener("scroll", detectScrollEnd);
        } else {
          lastScrollTop = currentScrollTop;
          clearTimeout(scrollTimer);
          scrollTimer = setTimeout(detectScrollEnd, 100);
        }
      };

      setTimeout(() => {
        window.addEventListener("scroll", detectScrollEnd);
      }, 50);
    } // Close mobile menu when navigating
    setIsMobileMenuOpen(false);
  };
  const handleServiceNavigation = (serviceHref: string) => {
    setIsServicesDropdownOpen(false);
    setIsMobileServicesExpanded(false);
    setIsMobileMenuOpen(false);
    setActiveSection("#services");
    router.push(serviceHref);
  };

  const handleMobileServicesToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileServicesExpanded(!isMobileServicesExpanded);
  };
  useEffect(() => {
    // Don't run scroll detection on service pages
    if (isServicePage) return;

    const handleScroll = () => {
      if (isScrolling) return;

      const sections = [
        "#home",
        "#services",
        "#portfolio",
        "#team",
        // "#testimonials",
        "#blog",
        "#contact",
      ];

      if (window.scrollY < 150) {
        setActiveSection("#home");
        return;
      }

      for (const sectionId of sections) {
        const element = document.querySelector(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [isScrolling, activeSection, isServicePage, pathname]);
  const navItems = [
    { href: "#home", label: "Home", icon: Home },
    { href: "#services", label: "Services", icon: Briefcase },
    { href: "#portfolio", label: "Portfolio", icon: FolderOpen },
    { href: "#team", label: "Team", icon: Users },
    // { href: "#testimonials", label: "Testimonials", icon: MessageSquare },
    { href: "#blog", label: "Blog", icon: BookOpen },
    { href: "#contact", label: "Contact", icon: Mail },
  ];
  return (
    <>
      {/* Services Dropdown Portal - Outside navbar */}
      <AnimatePresence>
        {isServicesDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="services-dropdown fixed top-[calc(2.5rem+3rem+0.5rem)] left-[41.5%] w-80 bg-[#1C1C1C]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#2E2E2E] overflow-hidden"
            style={{ zIndex: 9999 }}
          >
            <div className="p-2">
              {" "}
              {serviceItems.map((service, serviceIndex) => (
                <motion.button
                  key={service.href}
                  onClick={() => handleServiceNavigation(service.href)}
                  className="w-full text-left p-3 rounded-xl hover:bg-[#2E2E2E] transition-colors group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: serviceIndex * 0.1,
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <div className="text-sm font-medium text-white group-hover:text-[#ff3131] transition-colors">
                    {service.label}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>{" "}
      <motion.nav
        className="hidden md:flex fixed top-6 left-1/4 transform -translate-x-1/2 w-full max-w-[50%] px-8 py-3 bg-[#1C1C1C]/95 text-white justify-center items-center shadow-2xl border border-[#2E2E2E] rounded-3xl backdrop-blur-xl"
        style={{ zIndex: 1000 }}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {" "}
        <div className="flex gap-2 lg:gap-6 overflow-x-auto">
          {" "}
          {navItems.map((item, index) => {
            if (item.href === "#services") {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`
                    relative font-medium text-xs lg:text-sm px-2 lg:px-4 py-2 rounded-2xl whitespace-nowrap flex-shrink-0 flex items-center  gap-2
                    ${
                      activeSection === item.href
                        ? "bg-[#ff3131] text-white shadow-lg shadow-[#a93226]/25"
                        : "hover:bg-[#2E2E2E] hover:text-[#ff3131]"
                    }
                  `}
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 font-bold ${
                      isServicesDropdownOpen ? "rotate-180" : ""
                    }`}
                    strokeWidth={3}
                  />
                </a>
              );
            }

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`
                  relative font-medium text-xs lg:text-sm px-2 lg:px-4 py-2 rounded-2xl whitespace-nowrap flex-shrink-0
                  ${
                    activeSection === item.href
                      ? "bg-[#ff3131] text-white shadow-lg shadow-[#a93226]/25"
                      : "hover:bg-[#2E2E2E] hover:text-[#ff3131]"
                  }
                `}
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </motion.nav>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Menu Toggle Button */}{" "}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="fixed bottom-6 right-6 w-14 h-14 text-white rounded-full flex items-center justify-center z-50 shadow-2xl border"
          style={{
            backgroundColor: "#a93226",
            borderColor: "#2E2E2E",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          aria-label="Toggle navigation menu"
        >
          {" "}
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <X size={28} strokeWidth={2.5} />
            ) : (
              <Menu size={28} strokeWidth={2.5} />
            )}
          </AnimatePresence>
        </motion.button>
        {/* Mobile Menu Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}{" "}
              <motion.div
                className="fixed inset-0 backdrop-blur-md z-40"
                style={{ backgroundColor: "rgba(28, 28, 28, 0.8)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              {/* Slide-up Menu Panel */}{" "}
              <motion.div
                className="fixed bottom-0 left-0 right-0 border-t rounded-t-3xl shadow-2xl z-50"
                style={{
                  backgroundColor: "#1C1C1C",
                  borderColor: "#2E2E2E",
                }}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {/* Handle Bar */}
                <div className="flex justify-center pt-3 pb-2">
                  {" "}
                  <div
                    className="w-12 h-1.5 rounded-full"
                    style={{ backgroundColor: "#BDC3C7" }}
                  ></div>
                </div>

                {/* Menu Items */}
                <div className="px-6 pb-8">
                  {" "}
                  <h3
                    className="text-lg font-semibold mb-6 text-center"
                    style={{ color: "white" }}
                  >
                    Navigation
                  </h3>{" "}
                  <div className="grid grid-cols-1 gap-1">
                    {navItems.map((item, index) => {
                      const IconComponent = item.icon;

                      if (item.href === "#services") {
                        return (
                          <div key={item.href} className="space-y-1">
                            <button
                              onClick={handleMobileServicesToggle}
                              className="w-full flex flex-col items-center gap-2 p-4 rounded-xl group border"
                              style={{
                                backgroundColor:
                                  activeSection === item.href
                                    ? "#a93226"
                                    : "#2E2E2E",
                                color:
                                  activeSection === item.href
                                    ? "white"
                                    : "#BDC3C7",
                                borderColor:
                                  activeSection === item.href
                                    ? "#a93226"
                                    : "#2E2E2E",
                              }}
                              aria-label={`Toggle ${item.label} submenu`}
                            >
                              <div className="flex items-center gap-2">
                                <IconComponent size={24} />
                                <ChevronDown
                                  className={`w-4 h-4 transition-transform duration-200 ${
                                    isMobileServicesExpanded ? "rotate-180" : ""
                                  }`}
                                />
                              </div>
                              <span className="font-medium text-sm text-center">
                                {item.label}
                              </span>
                            </button>

                            {/* Mobile Services Submenu */}
                            <AnimatePresence>
                              {isMobileServicesExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="ml-4 space-y-1">
                                    {serviceItems.map(
                                      (service, serviceIndex) => (
                                        <motion.button
                                          key={service.href}
                                          onClick={() =>
                                            handleServiceNavigation(
                                              service.href
                                            )
                                          }
                                          className="w-full text-left p-3 rounded-lg border"
                                          style={{
                                            backgroundColor: "#1C1C1C",
                                            borderColor: "#374151",
                                            color: "#BDC3C7",
                                          }}
                                          initial={{ opacity: 0, y: -20 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{
                                            delay: serviceIndex * 0.1,
                                            duration: 0.3,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                              "#2E2E2E";
                                            e.currentTarget.style.color =
                                              "#ff3131";
                                            e.currentTarget.style.borderColor =
                                              "#ff3131";
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                              "#1C1C1C";
                                            e.currentTarget.style.color =
                                              "#BDC3C7";
                                            e.currentTarget.style.borderColor =
                                              "#374151";
                                          }}
                                        >
                                          <div className="text-sm font-medium">
                                            {service.label}
                                          </div>
                                        </motion.button>
                                      )
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      }

                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={(e) => scrollToSection(e, item.href)}
                          className="flex flex-col items-center gap-2 p-4 rounded-xl group border"
                          style={{
                            backgroundColor:
                              activeSection === item.href
                                ? "#a93226"
                                : "#2E2E2E",
                            color:
                              activeSection === item.href ? "white" : "#BDC3C7",
                            borderColor:
                              activeSection === item.href
                                ? "#a93226"
                                : "#2E2E2E",
                          }}
                          onMouseEnter={(e) => {
                            if (activeSection !== item.href) {
                              e.currentTarget.style.backgroundColor = "#1C1C1C";
                              e.currentTarget.style.color = "white";
                              e.currentTarget.style.borderColor = "#ff3131";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (activeSection !== item.href) {
                              e.currentTarget.style.backgroundColor = "#2E2E2E";
                              e.currentTarget.style.color = "#BDC3C7";
                              e.currentTarget.style.borderColor = "#2E2E2E";
                            }
                          }}
                          aria-label={`Navigate to ${item.label} section`}
                        >
                          <IconComponent size={24} />
                          <span className="font-medium text-sm text-center">
                            {item.label}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default NavBar;
