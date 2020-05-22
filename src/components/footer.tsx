import React from "react";
import { SocialIcon } from "react-social-icons";
import { Link } from "gatsby";
import { Trans, t } from "@lingui/macro";
import { withI18n, withI18nProps } from "@lingui/react";

import "../styles/footer.scss";
import { Locale } from "../pages";

const MAILCHIMP_URL =
  "https://nyc.us13.list-manage.com/subscribe/post?u=d4f5d1addd4357eb77c3f8a99&amp;id=588f6c6ef4";

const Footer = withI18n()(({ locale, i18n }: Locale & withI18nProps) => {
  const localePrefix = locale ? "/" + locale : "";

  return (
    <div className="footer has-background-info">
      <div className="columns has-text-centered-touch is-desktop">
        <div className="column">
          <Link to={localePrefix + "/"} className="button is-info">
            <img src={require("../img/brand/logo.png")} alt="JustFix.nyc" />
          </Link>
        </div>
        <div className="column">
          <p className="link-header has-text-white has-text-weight-bold is-uppercase">
            <Trans>What we do</Trans>
          </p>
          <Link
            className="link has-text-weight-semibold is-uppercase"
            to={localePrefix + "/#products"}
          >
            <p>
              <Trans>Products</Trans>
            </p>
          </Link>
          <Link
            className="link has-text-weight-semibold is-uppercase"
            to={localePrefix + "/learn"}
          >
            <p>
              <Trans>Learn</Trans>
            </p>
          </Link>
          <Link
            className="link has-text-weight-semibold is-uppercase"
            to={localePrefix + "/our-mission"}
          >
            <p>
              <Trans>Mission</Trans>
            </p>
          </Link>
          <Link
            className="link has-text-weight-semibold is-uppercase"
            to={localePrefix + "/about/press"}
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
            to={localePrefix + "/about/team"}
          >
            <p>
              <Trans>Team</Trans>
            </p>
          </Link>
          <Link
            className="link has-text-weight-semibold is-uppercase"
            to={localePrefix + "/about/partners"}
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
            to={localePrefix + "/contact-us"}
          >
            <p>
              <Trans>Contact</Trans>
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
          <form
            action={MAILCHIMP_URL}
            className="email-form is-horizontal-center"
            method="post"
            target="_blank"
          >
            <div className="mc-field-group">
              <div className="control is-expanded">
                <input
                  type="email"
                  name="EMAIL"
                  className="required email input"
                  id="mce-EMAIL"
                  placeholder={i18n._(t`Email Address`)}
                />
              </div>
              <div className="control has-text-centered-touch">
                <button
                  className="button is-primary is-uppercase"
                  type="submit"
                >
                  <Trans>Sign up</Trans>
                </button>
              </div>
            </div>
          </form>
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
              <b>Disclaimer:</b> The information in JustFix.nyc does not
              constitute legal advice and must not be used as a substitute for
              the advice of a lawyer qualified to give advice on legal issues
              pertaining to housing. We can help direct you to free legal
              services if necessary.
            </Trans>
          </p>
          <p className="subtitle is-size-6 has-text-white">
            <Trans>
              <b>JustFix.nyc</b> is a registered 501(c)(3) nonprofit
              organization.
            </Trans>
          </p>
          <Link
            className="link legal is-inline-block has-text-weight-semibold is-uppercase"
            to={localePrefix + "/privacy-policy"}
          >
            <Trans>Privacy policy</Trans>
          </Link>
          <Link
            className="link legal is-inline-block has-text-weight-semibold is-uppercase"
            to={localePrefix + "/terms-of-use"}
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
