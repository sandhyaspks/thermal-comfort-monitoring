import React, { useEffect } from "react";
import "./HomePage.css";

const HomePage = () => {
  useEffect(() => {
    const sections = document.querySelectorAll(".fade-in-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach((section) => observer.observe(section));
  }, []);

  return (
    <div className="homepage">
      {/* Home Section */}
      <section className="fade-in-section home-section">
        <div className="container">
          <div className="text-content">
            <h1>Thermal Comfort Metering</h1>
            <p>
              Smart IoT solutions for classrooms. Monitor temperature and humidity, optimize comfort,
              and improve student focus and well-being through data-driven automation.
            </p>
          </div>
          <div className="image-content">
            <img
              src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80"
              alt="Classroom"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="fade-in-section about-section">
        <div className="container">
          <div className="text-content">
            <h2>About Us</h2>
            <p>
              Thermal Comfort Metering is a cutting-edge IoT platform designed to optimize classroom
              environments for maximum comfort and productivity. Using smart sensors and automated controls,
              we provide real-time monitoring of temperature, humidity, and air quality. Our mission is to help
              schools maintain healthier learning spaces, improve student performance, and reduce energy
              costs through innovative technology.
            </p>
          </div>
          <div className="image-content">
            <img
              src="https://static.testo.com/image/upload/c_fill,w_900,h_600,g_auto/f_auto/q_auto/v1/HQ/testo-400-web-application-01-2000x1500px?_a=BATAXdAA0"
              alt="About"
              loading="lazy"
              style={{ width: "100%", maxWidth: 450, borderRadius: 8, objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="fade-in-section contact-section">
        <div className="container">
          <div className="text-content">
            <h2>Contact Us</h2>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" rows={5} required />
              <button type="submit">Send Message</button>
            </form>
            <p className="contact-info">
              ✉️ Email us:{" "}
              <a href="mailto:info@thermalcomfort.com">info@thermalcomfort.com</a>
            </p>
          </div>
          <div className="image-content">
            <img
              src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80"
              alt="Contact"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
