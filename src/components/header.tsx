import React, { useEffect, useState } from "react";
import { Trans } from "@lingui/macro";

import "../styles/header.scss";
import { LocaleLink as Link } from "../components/locale-link";
import { useCurrentLocale } from "../util/use-locale";
import { ContentfulCommonStrings } from "@justfixnyc/contentful-common-strings";
import _commonStrings from "../common-strings.json";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { INLINES } from "@contentful/rich-text-types";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import FocusTrap from "focus-trap-react";
import { FooterLanguageToggle } from "./footer";
import classnames from "classnames";
import { logAmplitudeEvent, getPageInfo } from "./amplitude";

const commonStrings = new ContentfulCommonStrings(_commonStrings as any);

const isDemoSite = process.env.GATSBY_DEMO_SITE === "1";

export const CAREERS_PAGE_URL = "https://justfix.breezy.hr/";

export type LinkWithLabel = [string, JSX.Element];

export const SITE_LINKS: LinkWithLabel[] = [
  ["/tools", <Trans>Tools</Trans>],
  ["/our-mission", <Trans>What We Do</Trans>],
  ["/reports", <Trans>Research & Policy</Trans>],
  ["/partners", <Trans>Partners & Funders</Trans>],
  ["/learn", <Trans>Learning Center</Trans>],
  ["/team", <Trans>Team</Trans>],
  [CAREERS_PAGE_URL, <Trans>Careers</Trans>],
  ["/press", <Trans>Press</Trans>],
  ["/contact-us", <Trans>Contact Us</Trans>],
];

/** Hook to get scroll direction for sticky banner */
// https://stackoverflow.com/a/62497293/7051239
const useScrollDirection = (): "up" | "down" => {
  const [scrollDir, setScrollDir] = useState<"up" | "down">("down");

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  return scrollDir;
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

const HeaderLink: React.FC<{ link: LinkWithLabel }> = ({ link }) => {
  const pageInfo = getPageInfo();
  const logEvent = () =>
    logAmplitudeEvent("pageLink", {
      ...pageInfo,
      page: link[1],
      location: "header",
    });
  return link[0].charAt(0) === "/" ? (
    <Link
      className="navbar-item jf-menu-page-link px-0 py-3 has-text-white"
      to={link[0]}
      onClick={logEvent}
    >
      {link[1]}
    </Link>
  ) : (
    <OutboundLink
      className="navbar-item jf-menu-page-link px-0 py-3 has-text-white"
      href={link[0]}
      target="_blank"
      rel="noopener noreferrer"
      onClick={logEvent}
    >
      {link[1]}
    </OutboundLink>
  );
};

const Header: React.FC<{
  isLandingPage?: boolean;
}> = ({ isLandingPage }) => {
  const [burgerMenuIsOpen, setBurgerMenuStatus] = useState(false);
  const isScrollingUp = useScrollDirection() === "up";

  return (
    <>
      <div
        className={classnames(
          "jf-sticky-phantom",
          isScrollingUp && "jf-sticky"
        )}
      />
      <div className={classnames("header", isScrollingUp && "jf-sticky")}>
        {isLandingPage && <MoratoriumBanner />}
        <FocusTrap
          active={burgerMenuIsOpen}
          focusTrapOptions={{
            onDeactivate: () => setBurgerMenuStatus(false),
            clickOutsideDeactivates: true,
          }}
        >
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
          >
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
                className="navbar-item is-paddingless is-flex-grow-1 is-hidden-touch"
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
              <div
                className={classnames(
                  "navbar-item is-justify-content-center",
                  burgerMenuIsOpen && "is-active"
                )}
              >
                <button
                  role="button"
                  className={classnames(
                    "navbar-burger burger",
                    "is-flex is-align-items-center is-justify-content-center",
                    burgerMenuIsOpen && "is-active"
                  )}
                  aria-expanded="false"
                  onClick={() => setBurgerMenuStatus(!burgerMenuIsOpen)}
                  data-target="navbar"
                >
                  <img
                    src={
                      burgerMenuIsOpen
                        ? require("../img/close.svg")
                        : require("../img/menu.svg")
                    }
                    className="mr-3"
                    width="16"
                    height="12"
                    alt=""
                  />
                  <div className="is-inline-block">
                    {burgerMenuIsOpen ? (
                      <Trans>Close</Trans>
                    ) : (
                      <Trans>Menu</Trans>
                    )}
                  </div>
                </button>
              </div>
            </div>

            <div
              id="main-navbar-menu"
              className={
                "navbar-menu has-background-black px-1-mobile " +
                (burgerMenuIsOpen && "is-active")
              }
            >
              <div className="navbar-end is-flex is-flex-direction-column py-3 px-5">
                <div>
                  {SITE_LINKS.map((link, i) => (
                    <HeaderLink link={link} key={i} />
                  ))}
                </div>

                <div className="navbar-item has-dropdown is-hoverable mt-7 mb-4 mb-7-mobile">
                  <div className="navbar-dropdown is-right pt-1 pb-0">
                    <FooterLanguageToggle />
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </FocusTrap>
      </div>
    </>
  );
};

export default Header;
