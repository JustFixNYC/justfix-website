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
import FocusTrap from "focus-trap-react";
import { FooterLanguageToggle } from "./footer";

const commonStrings = new ContentfulCommonStrings(_commonStrings as any);

const isDemoSite = process.env.GATSBY_DEMO_SITE === "1";

export const CAREERS_PAGE_URL = "https://justfix.breezy.hr/";

type LocaleChoice = "en" | "es";

/**
 * Names of languages in the language itself.
 */
const LANGUAGE_NAMES: { [k in LocaleChoice]: string } = {
  en: "English",
  es: "Español",
};

export type LinkWithLabel = [string, JSX.Element];

export const SITE_LINKS: LinkWithLabel[] = [
  ["/our-mission", <Trans>Mission</Trans>],
  ["/team", <Trans>Team</Trans>],
  ["/partners", <Trans>Partners & Funders</Trans>],
  ["/press", <Trans>Press</Trans>],
  ["/tools", <Trans>Tools</Trans>],
  ["/reports", <Trans>Research & Policy</Trans>],
  ["/learn", <Trans>Learning Center</Trans>],
  [CAREERS_PAGE_URL, <Trans>Careers</Trans>],
  ["/contact-us", <Trans>Contact Us</Trans>],
];

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

const HeaderLink: React.FC<{ link: LinkWithLabel }> = ({ link }) =>
  link[0].charAt(0) === "/" ? (
    <Link className="navbar-item no-underline p-0 has-text-white" to={link[0]}>
      {link[1]}
    </Link>
  ) : (
    <OutboundLink
      className="navbar-item no-underline p-0 has-text-white"
      href={link[0]}
    >
      {link[1]}
    </OutboundLink>
  );

const Header: React.FC<{
  isLandingPage?: boolean;
}> = ({ isLandingPage }) => {
  const [burgerMenuIsOpen, setBurgerMenuStatus] = useState(false);

  return (
    <div className="header">
      {isLandingPage && <MoratoriumBanner />}
      <FocusTrap
        active={burgerMenuIsOpen}
        focusTrapOptions={{
          onDeactivate: () => setBurgerMenuStatus(false),
          clickOutsideDeactivates: true,
        }}
      >
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <div
              className="navbar-item is-flex-direction-column is-justify-content-center no-underline"
              onClick={() => setBurgerMenuStatus(false)}
            >
              <Link to="/">
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
              </Link>
              {isDemoSite && (
                <span className="tag is-yellow">
                  <Trans>DEMO SITE</Trans>
                </span>
              )}
            </div>
            <div
              className="navbar-item is-size-3 has-text-black is-hidden-touch"
              onClick={() => setBurgerMenuStatus(false)}
            >
              <Trans>Technology for Housing Justice</Trans>
            </div>
            <div
              className="navbar-item is-paddingless is-flex-grow-1"
              onClick={() => setBurgerMenuStatus(false)}
            />
            <div
              className="navbar-item is-hidden-touch"
              onClick={() => setBurgerMenuStatus(false)}
            >
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
                  className="mr-3"
                  width="16"
                  height="12"
                />
                <Trans>Menu</Trans>
              </button>
            </div>
          </div>

          <div
            id="main-navbar-menu"
            className={"navbar-menu has-background-black px-1-mobile " + (burgerMenuIsOpen && "is-active")}
          >
            <div className="navbar-end is-flex is-flex-direction-column is-justify-content-space-between py-3 px-5">

              <div>
                {SITE_LINKS.map((link, i) => (
                  <HeaderLink link={link} key={i} />
                ))}
              </div>

              <div className="navbar-item has-dropdown is-hoverable mt-7 mb-4 mb-7-mobile">
                <div className="navbar-dropdown is-right pt-1 pb-0">
                  <FooterLanguageToggle />
                  {/* {localeConfig.ACCEPTED_LOCALES.filter(
                    (otherLocale) => otherLocale !== locale
                  ).map((otherLocale, i) => (
                    <LocaleToggle
                      to={otherLocale}
                      className="navbar-item no-underline"
                      key={i}
                    >
                      {LANGUAGE_NAMES[otherLocale]}
                    </LocaleToggle>
                  ))} */}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </FocusTrap>
    </div>
  );
};

export default Header;
