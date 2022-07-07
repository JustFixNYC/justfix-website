import React, { useState } from "react";
import { Trans } from "@lingui/macro";

import "../styles/header.scss";
import { LocaleLink as Link, LocaleToggle } from "../components/locale-link";
import { useCurrentLocale } from "../util/use-locale";
import localeConfig from "../util/locale-config.json";
import { ContentfulCommonStrings } from "@justfixnyc/contentful-common-strings";
import _commonStrings from "../common-strings.json";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { INLINES } from "@contentful/rich-text-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const commonStrings = new ContentfulCommonStrings(_commonStrings as any);

const isDemoSite = process.env.GATSBY_DEMO_SITE === "1";

type LocaleChoice = "en" | "es";

/**
 * Names of languages in the language itself.
 */
const LANGUAGE_NAMES: { [k in LocaleChoice]: string } = {
  en: "English",
  es: "Español",
};

const MoratoriumBanner: React.FC<{}> = () => {
  const [isVisible, setVisibility] = useState(true);
  const locale = useCurrentLocale();

  const content = commonStrings.get("covidMoratoriumBanner", locale);
  if (!content) return null;

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
            {documentToReactComponents(content, {
              renderNode: {
                [INLINES.HYPERLINK]: (node, children) => (
                  <OutboundLink href={node.data.uri}>{children}</OutboundLink>
                ),
              },
            })}
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
    <div className="header">
      {isLandingPage && <MoratoriumBanner />}
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img
              className="is-hidden-touch"
              src={require("../img/brand/logo.svg")}
              width="164"
              height="38"
              alt="JustFix"
            />
            <img
              className="is-hidden-desktop"
              src={require("../img/brand/logo.svg")}
              width="120"
              height="27"
              alt="JustFix"
            />
            {isDemoSite && (
              <span className="tag is-warning">
                <Trans>DEMO SITE</Trans>
              </span>
            )}
          </Link>
          <div className="navbar-item is-size-3 has-text-black is-hidden-touch">
            <Trans>Technology for Housing Justice</Trans>
          </div>
          <div className="navbar-item is-paddingless is-flex-grow-1" />
          <div className="navbar-item is-hidden-touch">
            <Link to="/tools" className="button is-primary">
              <Trans>See our tools</Trans>
            </Link>
          </div>
          <div className="navbar-item">
            <button
              role="button"
              className={
                "navbar-burger burger " + (burgerMenuIsOpen && "is-active")
              }
              aria-label="menu"
              aria-expanded="false"
              onClick={() => setBurgerMenuStatus(!burgerMenuIsOpen)}
              data-target="navbar"
            >
              <img
                src={require("../img/menu.svg")}
                className="mr-2"
                width="16"
                height="12"
              />{" "}
              <Trans>Menu</Trans>
            </button>
          </div>
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
                <Link to="/team" className="navbar-item">
                  <Trans>Team</Trans>
                </Link>
                <Link to="/partners" className="navbar-item">
                  <Trans>Partners</Trans>
                </Link>
                <Link to="/press" className="navbar-item">
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
                {LANGUAGE_NAMES[locale]}
              </a>

              <div className="navbar-dropdown is-right">
                {localeConfig.ACCEPTED_LOCALES.filter(
                  (otherLocale) => otherLocale !== locale
                ).map((otherLocale, i) => (
                  <LocaleToggle
                    to={otherLocale}
                    className="navbar-item"
                    key={i}
                  >
                    {LANGUAGE_NAMES[otherLocale]}
                  </LocaleToggle>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
