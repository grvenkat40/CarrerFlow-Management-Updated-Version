import React from "react";
import image from '../assets/images/image.png'
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

    const navigate = useNavigate();

  return (
    <>
      {/* HEADER */}
      <header className="land_page_header">
        <div className="header_container">
          <h1>CareerFlow</h1>

          <div className="navs">
            <a onClick={ () => navigate("/register")} style={{cursor:"pointer"}}>Sign Up</a>
            <a onClick={ () => navigate("/login")} style={{cursor:"pointer"}}>Get Started</a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="landing_section">
        <div className="landing_content">

          <div className="first_txt_view">
            <h4>For Students & Graduates</h4>

            <h1>Master your{" "}<span style={{ color: "#1888ff" }}>career</span> <br />

              <span style={{ color: "#1385ff" }}>journey</span>{" "}from day one.</h1>

            <p>
              The all-in-one workspace to track applications,
              <br />
              manage skill development, and organize your job
              <br />
              search with academic precision.
            </p>

            <a onClick={ () => navigate("/login")} style={{cursor:"pointer"}}>Start Tracking</a>
          </div>

          <div className="first_img_view">
            <img
              src={image}
              alt="landing"
            />
          </div>

        </div>
      </section>

      {/* ABOUT */}
      <div className="about_site">
        <h2>Everything you need to get hired</h2>

        <p>
          Stop using messy spreadsheets. CareerFlow gives you a structured,
          <br />
          professional environment to manage your future.
        </p>
      </div>

      {/* FEATURES */}
      <div className="site_features">

        <div className="feature">
          <img
            src="/images/dashboard.png"
            alt="dashboard"
          />

          <h3>Centralized Dashboard</h3>

          <p>
            Get a bird's eye view of your entire job search pipeline.
            Track status changes, deadlines, and daily progress
            in one place.
          </p>
        </div>

        <div className="feature">
          <img
            src="/images/tracking.png"
            alt="tracking"
          />

          <h3>Application Tracking</h3>

          <p>
            Move applications through stages from 'Applied'
            to 'Offer'. Add notes for every interview round
            and never forget a detail.
          </p>
        </div>

        <div className="feature">
          <img
            src="/images/solution.png"
            alt="solution"
          />

          <h3>Skill Vault</h3>

          <p>
            Map your technical and soft skills.
            Track proficiency levels and log practice sessions
            to ensure you're interview-ready.
          </p>
        </div>

      </div>

      {/* CTA */}
      <div className="triger_user">
        <h1>Ready to launch your career?</h1>

        <a onClick={ () => navigate("/register")} style={{cursor:"pointer"}}>
          Create Free Account
        </a>
      </div>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-container">

          <div className="footer-top">

            <div className="footer-brand">
              <a href="/" className="footer-logo">
                CareerFlow
              </a>

              <p className="footer-tagline">
                Empowering the next generation of
                <br />
                professionals with tools for success.
              </p>
            </div>

            <div className="footer-nav">

              <div className="footer-col">
                <h4>Platform</h4>

                <ul>
                  <li><a href="/">Features</a></li>
                  <li><a href="/">Pricing</a></li>
                  <li><a href="/">For Universities</a></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Company</h4>

                <ul>
                  <li><a href="/">About</a></li>
                  <li><a href="/">Blog</a></li>
                  <li><a href="/">Careers</a></li>
                </ul>
              </div>

            </div>

          </div>

          <div className="footer-bottom">

            <p className="copyright">
              © 2026 CareerFlow Inc. All rights reserved.
            </p>

            <ul className="legal-links">
              <li><a href="/">Privacy</a></li>
              <li><a href="/">Terms</a></li>
              <li><a href="/">Security</a></li>
            </ul>

          </div>

        </div>
      </footer>
    </>
  );
};

export default LandingPage;