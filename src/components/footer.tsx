import React from "react";
import { SocialIcon } from "react-social-icons";
import { Trans } from "@lingui/macro";
import { withI18n, withI18nProps } from "@lingui/react";

import "../styles/footer.scss";
import Subscribe from "./subscribe";
import { LocaleLink as Link } from "./locale-link";

const Footer = withI18n()(({ i18n }: withI18nProps) => {
  return (
    <div className="footer has-background-info">
      <div className="columns has-text-centered-touch is-desktop">
        <div className="column">
          <Link to="/" className="button is-info">
            <img src={require("../img/brand/logo.png")} alt="JustFix" />
          </Link>
        </div>
        <div className="column">
          <p className="link-header has-text-white has-text-weight-bold is-uppercase">
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
        <div className="column is-three-quarters">
          <p className="subtitle is-size-6 has-text-white">
            <Trans>
              <b>Disclaimer:</b> The information in JustFix does not constitute
              legal advice and must not be used as a substitute for the advice
              of a lawyer qualified to give advice on legal issues pertaining to
              housing. We can help direct you to free legal services if
              necessary.
            </Trans>
          </p>
          <p className="subtitle is-size-6 has-text-white">
            <Trans>
              <b>JustFix</b> is a registered 501(c)(3) nonprofit organization.
            </Trans>
          </p>
          <Link
            className="link legal is-inline-block has-text-weight-semibold is-uppercase"
            to="/privacy-policy"
          >
            <Trans>Privacy policy</Trans>
          </Link>
          <Link
            className="link legal is-inline-block has-text-weight-semibold is-uppercase"
            to="/terms-of-use"
          >
            <Trans>Terms of use</Trans>
          </Link>
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
