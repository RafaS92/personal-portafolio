import React, { useContext, useEffect } from "react";
import Skills from "./Skills";
import Projects from "./Projects";
import Resume from "./Resume";
import Hero from "./Hero";
import About from "./About";
import AppContext from "./context/AppContext";
import Services from "./Services";
import ContactSection from "./ContactSection";
import Aos from "aos";
import "aos/dist/aos.css";
import Chatbot from "./Chatbot";

function V2content({ locale }) {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const contextData = useContext(AppContext);
  let darkmode = contextData.darkmode.darkTheme;

  const darkStyles = {
    backgroundColor: "#0a192f",
    color: "white",
  };

  const lightStyles = {
    backgroundColor: "#dbd4d4",
    color: "black",
  };

  return (
    <div style={darkmode ? darkStyles : lightStyles}>
      <div className="Twrapper">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects locale={locale} />
        <Resume />
        <ContactSection />
        <Chatbot />
      </div>
    </div>
  );
}

export default V2content;
