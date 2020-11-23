import React, { useState } from "react";
import { Trans } from "@lingui/macro";

import "../styles/header.scss";
import { LocaleLink as Link, LocaleToggle } from "../components/locale-link";
import { CovidMoratoriumBanner } from "@justfixnyc/react-common";
import { useCurrentLocale } from "../util/use-locale";

const isDemoSite = process.env.GATSBY_DEMO_SITE === "1";

const MoratoriumBanner = () => {
  const [isVisible, setVisibility] = useState(true);
  const locale = useCurrentLocale();

  return (
    <section
      className={"hero is-warning is-small " + (!isVisible ? "is-hidden" : "")}
    >
      <div className="hero-body">
        <div className="container">
          <button
            className="delete is-medium is-pulled-right"
            onClick={() => setVisibility(false)}
          />
          <p>
            <CovidMoratoriumBanner locale={locale} />
          </p>
        </div>
      </div>
    </section>
  );
};

const Header: React.FC<{
  isLandingPage?: boolean;
}> = ({ isLandingPage }) => {
  const [burgerMenuIsOpen, setBurgerMenuStatus] = useState(false);
  const locale = useCurrentLocale();

  return (
    <div className={"header " + (isLandingPage && "is-absolute")}>
      {isLandingPage && <MoratoriumBanner />}
      <nav
        className={"navbar is-primary " + (isLandingPage && "is-transparent")}
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img
              src={require("../img/brand/logo.png")}
              width="112"
              height="28"
              alt="JustFix.nyc"
            />
          </Link>
          {isDemoSite && (
            <div className="navbar-item">
              <span className="tag is-warning">
                <Trans>DEMO SITE</Trans>
              </span>
            </div>
          )}
          <a
            role="button"
            className={
              "navbar-burger burger " + (burgerMenuIsOpen && "is-active")
            }
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setBurgerMenuStatus(!burgerMenuIsOpen)}
            data-target="navbar"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="main-navbar-menu"
          className={"navbar-menu " + (burgerMenuIsOpen && "is-active")}
        >
          <div className="navbar-end">
            <div className="navbar-item has-dropdown is-hoverable">
              <a
                className={
                  "navbar-link is-uppercase has-text-" +
                  (burgerMenuIsOpen ? "black" : "white")
                }
              >
                <Trans>About us</Trans>
              </a>

              <div className="navbar-dropdown">
                <Link to="/our-mission" className="navbar-item">
                  <Trans>Mission</Trans>
                </Link>
                <Link to="/about/team" className="navbar-item">
                  <Trans>Team</Trans>
                </Link>
                <Link to="/about/partners" className="navbar-item">
                  <Trans>Partners</Trans>
                </Link>
                <Link to="/about/press" className="navbar-item">
                  <Trans>Press</Trans>
                </Link>
                <a
                  href="https://justfix.breezy.hr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar-item"
                >
                  <Trans>Jobs</Trans>
                </a>
              </div>
            </div>

            <Link
              to="/#products"
              className={
                "navbar-item is-uppercase has-text-" +
                (burgerMenuIsOpen ? "black" : "white")
              }
            >
              <Trans>Products</Trans>
            </Link>

            <Link
              to="/learn"
              className={
                "navbar-item is-uppercase has-text-" +
                (burgerMenuIsOpen ? "black" : "white")
              }
            >
              <Trans>Learn</Trans>
            </Link>

            <Link
              to="/contact-us"
              className={
                "navbar-item is-uppercase has-text-" +
                (burgerMenuIsOpen ? "black" : "white")
              }
            >
              <Trans>Contact Us</Trans>
            </Link>

            <div className="navbar-item has-dropdown is-hoverable">
              <a
                className={
                  "navbar-link is-uppercase has-text-" +
                  (burgerMenuIsOpen ? "black" : "white")
                }
              >
                {locale.toUpperCase()}
              </a>

              <div className="navbar-dropdown is-right">
                <LocaleToggle
                  to={locale === "es" ? "en" : "es"}
                  className="navbar-item"
                >
                  {locale === "es" ? "EN" : "ES"}
                </LocaleToggle>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
