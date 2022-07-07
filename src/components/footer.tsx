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
    <div className="jf-footer has-background-black has-text-white py-7">
      <div className="columns">
        <div className="column is-9 is-12-touch pt-9">
          <FooterLanguageToggle />

          {/* TODO: Update these footer links with actual links to internal pages */}
          <div className="columns is-paddingless is-hidden-touch ml-0">
            <div className="column is-3 is-paddingless mx-0">
              <Link className="no-underline" to="/#products">
                <p className="title is-4 has-text-white">
                  <Trans>Products</Trans>
                </p>
              </Link>
              <Link className="no-underline" to="/learn">
                <p className="title is-4 has-text-white">
                  <Trans>Learn</Trans>
                </p>
              </Link>
            </div>
            <div className="column is-3 is-paddingless">
              <Link className="no-underline" to="/#products">
                <p className="title is-4 has-text-white">
                  <Trans>Products</Trans>
                </p>
              </Link>
              <Link className="no-underline" to="/learn">
                <p className="title is-4 has-text-white">
                  <Trans>Learn</Trans>
                </p>
              </Link>
            </div>
            <div className="column is-3 is-paddingless">
              <Link className="no-underline" to="/#products">
                <p className="title is-4 has-text-white">
                  <Trans>Products</Trans>
                </p>
              </Link>
              <Link className="no-underline" to="/learn">
                <p className="title is-4 has-text-white">
                  <Trans>Learn</Trans>
                </p>
              </Link>
            </div>
            <div className="column is-3 is-paddingless">
              <Link className="no-underline" to="/#products">
                <p className="title is-4 has-text-white">
                  <Trans>Products</Trans>
                </p>
              </Link>
              <Link className="no-underline" to="/learn">
                <p className="title is-4 has-text-white">
                  <Trans>Learn</Trans>
                </p>
              </Link>
            </div>
          </div>
        </div>

        <div className="column">
          <h4 className="mb-4">
            <Trans>Join our mailing list!</Trans>
          </h4>
          <Subscribe />
          <div className="field mt-3">
            <SocialIcon
              className="mr-3"
              url="http://twitter.com/justfixnyc"
              target="_blank"
              rel="noopener noreferrer"
              bgColor="#FFF"
              style={{ height: 40, width: 40 }}
            />
            <SocialIcon
              className="mr-3"
              url="https://facebook.com/JustFixNYC"
              target="_blank"
              rel="noopener noreferrer"
              bgColor="#FFF"
              style={{ height: 40, width: 40 }}
            />
            <SocialIcon
              className="mr-3"
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

      <div className="columns">
        <div className="column is-12 pb-0">
          <div className="is-divider" />
        </div>
      </div>

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
