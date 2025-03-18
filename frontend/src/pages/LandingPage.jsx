import React, { useEffect } from "react";
import Navbar from "../components/PublicNavbar";
import Hero from "../components/Hero";
import About from "../components/About";
import HowItWorks from "../components/How-It-Works";
import Faq from "../components/Faq";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const LandingPage = () => {
  useEffect(() => {
    if (window.location.hash) {
      requestAnimationFrame(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  }, []);

  return (
    <main>
      <header>
        <Navbar />
      </header>

      <section id="home" aria-label="Home Section">
        <Hero />
      </section>

      <section id="about" aria-label="About Us">
        <About />
      </section>

      <section id="how-it-works" aria-label="How It Works">
        <HowItWorks />
      </section>

      <section id="faq" aria-label="Frequently Asked Questions">
        <Faq />
      </section>

      <section id="contact" aria-label="Contact Us">
        <Contact />
      </section>
    </main>
  );
};

export default LandingPage;
