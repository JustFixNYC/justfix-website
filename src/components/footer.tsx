import React from "react";
import { SocialIcon } from "react-social-icons";
import { Trans } from "@lingui/macro";

import "../styles/footer.scss";
import Subscribe from "./subscribe";
import { LocaleLink, LocaleToggle } from "./locale-link";
import { useCurrentLocale } from "../util/use-locale";
import classnames from "classnames";
import { LinkWithLabel, SITE_LINKS } from "./header";
import { OutboundLink } from "../util/links";

export const FooterLanguageToggle = () => {
  const locale = useCurrentLocale();
  return (
    <div className="buttons has-addons">
      <LocaleToggle
        to="en"
        className={classnames(
          "button eyebrow is-small is-justify-content-center",
          locale === "en" && "is-selected"
        )}
        eventProperties={{ location: "footer" }}
      >
        English
      </LocaleToggle>
      <LocaleToggle
        to="es"
        className={classnames(
          "button eyebrow is-small is-justify-content-center",
          locale === "es" && "is-selected"
        )}
        eventProperties={{ location: "footer" }}
      >
        Español
      </LocaleToggle>
    </div>
  );
};

const FooterLink: React.FC<{ link: LinkWithLabel }> = ({ link }) =>
  link[0].charAt(0) === "/" ? (
    <LocaleLink
      className="jf-footer-page-link no-underline"
      to={link[0]}
      eventProperties={{ location: "footer" }}
    >
      <p className="title is-4 has-text-white py-3-mobile">{link[1]}</p>
    </LocaleLink>
  ) : (
    <OutboundLink
      className="jf-footer-page-link no-underline"
      href={link[0]}
      eventProperties={{ location: "footer" }}
    >
      <p className="title is-4 has-text-white py-3-mobile">{link[1]}</p>
    </OutboundLink>
  );

const FooterLinksList: React.FC<{ links: LinkWithLabel[] }> = ({ links }) => {
  return (
    <div className="columns is-paddingless ml-0">
      {links.map((link, i) => {
        if (i % 3 === 0) {
          return (
            <div className="column is-4 py-0 mx-0" key={i}>
              <FooterLink link={link} />
              {!!links[i + 1] && <FooterLink link={links[i + 1]} />}
              {!!links[i + 2] && <FooterLink link={links[i + 2]} />}
            </div>
          );
        } else return;
      })}
    </div>
  );
};

const Footer = () => (
  <div className="jf-footer has-background-black has-text-white py-7">
    <div className="columns is-multiline">
      <div className="column is-4 is-12-touch pt-9 mt-2 pb-7-touch">
        <FooterLanguageToggle />
      </div>

      <div className="column is-4 is-12-touch py-7-touch">
        <h4 className="mb-2">
          <Trans>Support JustFix</Trans>
        </h4>
        <OutboundLink
          href="https://donorbox.org/donate-to-justfix-nyc"
          className="button is-primary"
        >
          <Trans>Donate today</Trans>
        </OutboundLink>
      </div>

      <div className="column is-4 is-12-touch py-7-touch">
        <h4 className="mb-2">
          <Trans>Join our mailing list!</Trans>
        </h4>
        <Subscribe />
        <div className="field mt-3">
          <SocialIcon
            className="mr-3"
            url="https://instagram.com/justfixorg"
            target="_blank"
            rel="noopener noreferrer"
            bgColor="#FFF"
            style={{ height: 40, width: 40 }}
          />
          <SocialIcon
            className="mr-3"
            url="https://x.com/justfixorg"
            network="twitter"
            target="_blank"
            rel="noopener noreferrer"
            bgColor="#FFF"
            style={{ height: 40, width: 40 }}
          />
          <SocialIcon
            className="mr-3"
            url="https://facebook.com/justfixorg"
            target="_blank"
            rel="noopener noreferrer"
            bgColor="#FFF"
            style={{ height: 40, width: 40 }}
          />
          <SocialIcon
            className="mr-3"
            url="https://www.linkedin.com/company/justfixorg"
            target="_blank"
            rel="noopener noreferrer"
            bgColor="#FFF"
            style={{ height: 40, width: 40 }}
          />
          <SocialIcon
            className="mr-3"
            url="https://github.com/JustFixNYC"
            target="_blank"
            rel="noopener noreferrer"
            bgColor="#FFF"
            style={{ height: 40, width: 40 }}
          />
          <SocialIcon
            url="https://medium.com/justfixorg"
            target="_blank"
            rel="noopener noreferrer"
            bgColor="#FFF"
            style={{ height: 40, width: 40 }}
          />
        </div>
      </div>
    </div>

    <div className="columns">
      <div className="column is-12 pb-0">
        <div className="is-divider is-light" />
      </div>
    </div>

    <div className="columns">
      <div className="column is-12 pb-0">
        <FooterLinksList links={SITE_LINKS} />
      </div>
    </div>

    <div className="columns">
      <div className="column is-12 pb-0">
        <div className="is-divider is-light" />
      </div>
    </div>

    <div className="columns">
      <div className="column is-9">
        <p>
          <Trans>
            <b>Disclaimer:</b> The information in JustFix does not constitute
            legal advice and must not be used as a substitute for the advice of
            a lawyer qualified to give advice on legal issues pertaining to
            housing. We can help direct you to free legal services if necessary.
          </Trans>
        </p>
        <br />
        <p>
          <Trans>
            <b>JustFix</b> is a registered 501(c)(3) nonprofit organization.
          </Trans>
        </p>
        <div className="mt-9">
          <LocaleLink
            className="eyebrow is-small has-text-white mr-12 mr-6-mobile"
            to="/privacy-policy"
          >
            <Trans>Privacy policy</Trans>
          </LocaleLink>
          <LocaleLink
            className="eyebrow is-small has-text-white"
            to="/terms-of-use"
          >
            <Trans>Terms of use</Trans>
          </LocaleLink>
        </div>
      </div>
      <div className="column is-one-quarter">
        <a
          href="https://www.netlify.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://www.netlify.com/img/global/badges/netlify-light.svg"
            alt="Netlify"
          />
        </a>
      </div>
    </div>
  </div>
);

export default Footer;
