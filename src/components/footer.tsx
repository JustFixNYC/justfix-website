import React from "react";
import { SocialIcon } from "react-social-icons";
import { Trans } from "@lingui/macro";
import { withI18n, withI18nProps } from "@lingui/react";

import "../styles/footer.scss";
import Subscribe from "./subscribe";
import { LocaleLink as Link, LocaleToggle } from "./locale-link";
import { useCurrentLocale } from "../util/use-locale";
import classnames from "classnames";

const FooterLanguageToggle = () => {
  const locale = useCurrentLocale();
  return (
    <div className="buttons has-addons">
      <LocaleToggle
        to="en"
        className={classnames(
          "button title is-4",
          locale === "en" && "is-selected"
        )}
      >
        English
      </LocaleToggle>
      <LocaleToggle
        to="es"
        className={classnames(
          "button title is-4",
          locale === "es" && "is-selected"
        )}
      >
        Español
      </LocaleToggle>
    </div>
  );
};

const Footer = withI18n()(({ i18n }: withI18nProps) => {
  return (
    <div className="footer has-background-black has-text-white">
      <div className="columns has-text-centered-touch is-desktop">
        <div className="column">
          <FooterLanguageToggle />
          <p className="">
            <Trans>What we do</Trans>
          </p>
          <Link
            className="link has-text-weight-semibold is-uppercase"
            to="/#products"
          >
            <p>
              <Trans>Products</Trans>
            </p>
          </Link>
          <Link
            className="link has-text-weight-semibold is-uppercase"
            to="/learn"
          >
            <p>
              <Trans>Learn</Trans>
            </p>
          </Link>
          <Link
            className="link has-text-weight-semibold is-uppercase"
            to="/our-mission"
          >
            <p>
              <Trans>Mission</Trans>
            </p>
          </Link>
          <Link
            className="link has-text-weight-semibold is-uppercase"
            to="/press"
          >
            <p>
              <Trans>Press</Trans>
            </p>
          </Link>
        </div>

        <div className="column">
          <p className="link-header has-text-white has-text-weight-bold is-uppercase">
            <Trans>About us</Trans>
          </p>
          <Link
            className="link has-text-weight-semibold is-uppercase"
            to="/team"
          >
            <p>
              <Trans>Team</Trans>
            </p>
          </Link>
          <Link
            className="link has-text-weight-semibold is-uppercase"
            to="/partners"
          >
            <p>
              <Trans>Partners</Trans>
            </p>
          </Link>
          <a
            className="link has-text-weight-semibold is-uppercase"
            href="https://justfix.breezy.hr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>
              <Trans>Jobs</Trans>
            </p>
          </a>
          <Link
            className="link has-text-weight-semibold is-uppercase"
            to="/contact-us"
          >
            <p>
              <Trans>Contact Us</Trans>
            </p>
          </Link>
          <a
            className="link has-text-weight-semibold is-uppercase"
            href="https://donorbox.org/donate-to-justfix-nyc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>
              <Trans>Donate</Trans>
            </p>
          </a>
        </div>

        <div className="column">
          <h4 className="title is-size-5 has-text-white">
            <Trans>Join our mailing list!</Trans>
          </h4>
          <Subscribe />
          <div className="field">
            <SocialIcon
              url="http://twitter.com/justfixnyc"
              target="_blank"
              rel="noopener noreferrer"
              bgColor="#FFF"
              style={{ height: 40, width: 40 }}
            />
            <SocialIcon
              url="https://facebook.com/JustFixNYC"
              target="_blank"
              rel="noopener noreferrer"
              bgColor="#FFF"
              style={{ height: 40, width: 40 }}
            />
            <SocialIcon
              url="https://www.linkedin.com/company/justfix-nyc"
              target="_blank"
              rel="noopener noreferrer"
              bgColor="#FFF"
              style={{ height: 40, width: 40 }}
            />
            <SocialIcon
              url="https://github.com/JustFixNYC"
              target="_blank"
              rel="noopener noreferrer"
              bgColor="#FFF"
              style={{ height: 40, width: 40 }}
            />
          </div>
        </div>
      </div>

      <div className="is-divider" />

      <div className="columns">
        <div className="column is-9">
          <p>
            <Trans>
              <b>Disclaimer:</b> The information in JustFix.nyc does not
              constitute legal advice and must not be used as a substitute for
              the advice of a lawyer qualified to give advice on legal issues
              pertaining to housing. We can help direct you to free legal
              services if necessary.
            </Trans>
          </p>
          <br />
          <p>
            <Trans>
              <b>JustFix.nyc</b> is a registered 501(c)(3) nonprofit
              organization.
            </Trans>
          </p>
          <div className="mt-9">
            <Link
              className="eyebrow is-small has-text-white mr-12 mr-6-mobile"
              to="/privacy-policy"
            >
              <Trans>Privacy policy</Trans>
            </Link>
            <Link
              className="eyebrow is-small has-text-white"
              to="/terms-of-use"
            >
              <Trans>Terms of use</Trans>
            </Link>
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
});

export default Footer;
