import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Portfolio from "@/components/landing/Portfolio";
import Team from "@/components/landing/Team";
import Testimonials from "@/components/landing/Testimonials";
import Blog from "@/components/landing/Blog";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import NavBar from "@/components/landing/NavBar";
import HashNavigator from "@/components/landing/HashNavigator";

export default function Home() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <HashNavigator />
      <NavBar />
      <section id="home">
        <Hero />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="portfolio">
        <Portfolio />
      </section>
      <section id="team">
        <Team />
      </section>
      {/* <section id="testimonials">
        <Testimonials />
      </section> */}
      <section id="blog">
        <Blog />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </div>
  );
}
