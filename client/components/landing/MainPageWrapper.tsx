"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import LoadingComponent from "@/components/LoadingComponent";
import { useMainPageData } from "@/hooks/useMainPageData";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Portfolio from "@/components/landing/Portfolio";
import Team from "@/components/landing/Team";
import Blog from "@/components/landing/Blog";
import Testimonials from "@/components/landing/Testimonials";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";

interface MainPageContentProps {
  data: {
    projects: any[];
    services: any[];
    team: any[];
    blogPosts: any[];
    testimonials: any[];
  };
}

const MainPageContent = ({ data }: MainPageContentProps) => {
  useEffect(() => {
    // Dispatch custom event when main page content is loaded
    const notifyNavBar = () => {
      const event = new CustomEvent("mainPageLoaded");
      window.dispatchEvent(event);

      // Also trigger scroll detection after a short delay
      setTimeout(() => {
        const scrollEvent = new Event("scroll");
        window.dispatchEvent(scrollEvent);
      }, 200);
    };

    // Multiple triggers to ensure navbar gets updated
    notifyNavBar();
    const timeout1 = setTimeout(notifyNavBar, 500);
    const timeout2 = setTimeout(notifyNavBar, 1000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, []);

  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <section id="services">
          <Services preloadedData={data.services} />
        </section>
        <section id="portfolio">
          <Portfolio preloadedData={data.projects} />
        </section>
        <section id="team">
          <Team preloadedData={data.team} />
        </section>
        {/* <section id="testimonials">
          <Testimonials preloadedData={data.testimonials} />
        </section> */}
        <section id="blog">
          <Blog preloadedData={data.blogPosts} />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <Footer />
      </motion.div>
    </>
  );
};

const MainPageWrapper = () => {
  const { data, loading, error, refetch } = useMainPageData();

  // Loading state - show until all data is fetched
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1C1C1C] via-[#2E2E2E] to-[#1C1C1C] flex flex-col items-center justify-center">
        <LoadingComponent />     
      </div>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1C1C1C] via-[#2E2E2E] to-[#1C1C1C] flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-white text-2xl font-bold mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-white/70 mb-6">
            Failed to load page data. Please try again.
          </p>
          <button
            onClick={refetch}
            className="px-6 py-3 bg-[#ff3131] text-white rounded-lg font-semibold hover:bg-[#cc2626] transition-colors duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Success state - render main page with preloaded data
  return <MainPageContent data={data} />;
};

export default MainPageWrapper;
