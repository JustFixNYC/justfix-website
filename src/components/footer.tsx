import React from 'react'
import { SocialIcon } from 'react-social-icons';
import { Link } from 'gatsby'
import { Trans, t } from '@lingui/macro';
import { withI18n, withI18nProps } from '@lingui/react';

import '../styles/footer.scss' 
import { Locale } from '../pages';

const MAILCHIMP_URL = "https://nyc.us13.list-manage.com/subscribe/post?u=d4f5d1addd4357eb77c3f8a99&amp;id=588f6c6ef4";


const Footer = withI18n()(({locale, i18n}: Locale & withI18nProps) => {

  const localePrefix = locale ? ("/" + locale) : "";
  
  return (
    <div className="footer has-background-info">
      <div className="columns has-text-centered-mobile">

        <div className="column is-one-quarter">
          <Link to={localePrefix + "/"} className="button is-info">
            <img src={require("../img/brand/logo.png")} />
          </Link>
        </div>
        <div className="column is-one-quarter">
          <p className="link-header has-text-white has-text-weight-bold">WHAT WE DO</p>
          <Link className="link has-text-weight-semibold" to={localePrefix + "/#products"}>
            <p><Trans>PRODUCTS &amp; SERVICES</Trans></p>
          </Link>
          <Link className="link has-text-weight-semibold" to={localePrefix + "/our-mission"}>
            <p><Trans>OUR MISSION</Trans></p>
          </Link>
          <Link className="link has-text-weight-semibold" to={localePrefix + "/contact-us"}>
            <p><Trans>CONTACT</Trans></p>
          </Link>
          <a className="link has-text-weight-semibold" href="https://donorbox.org/donate-to-justfix-nyc" target="_blank" rel="noopener noreferrer">
            <p><Trans>DONATE</Trans></p>
          </a>
        </div>

        <div className="column is-one-quarter">
          <p className="link-header has-text-white has-text-weight-bold"><Trans>ABOUT US</Trans></p>
          <Link className="link has-text-weight-semibold" to={localePrefix + "/about/team"}>
            <p><Trans>OUR TEAM</Trans></p>
          </Link>
          <Link className="link has-text-weight-semibold" to={localePrefix + "/about/partners"}>
            <p><Trans>OUR PARTNERS</Trans></p>
          </Link>
          <a className="link has-text-weight-semibold" href="https://justfix.breezy.hr/" target="_blank" rel="noopener noreferrer">
            <p><Trans>JOBS</Trans></p>
          </a>
          <Link className="link has-text-weight-semibold" to={localePrefix + "/about/press"}>
            <p><Trans>PRESS</Trans></p>
          </Link>
        </div>

        <div className="column is-one-quarter">
          <h4 className="title is-size-5 has-text-white">
            <Trans>Join our mailing list!</Trans>
          </h4>
          <form action={MAILCHIMP_URL} className="email-form is-horizontal-center" method="post" target="_blank">
            <div className="mc-field-group">
              <div className="control is-expanded">
                  <input type="email" name="EMAIL" className="required email input" id="mce-EMAIL" placeholder={i18n._(t`Email Address`)} />
              </div>
              <div className="control has-text-centered-mobile">
                <button className="button is-primary" type="submit">
                    <Trans>SIGN UP</Trans>
                </button>
              </div>
            </div>
          </form>
          <div className="field">
            <SocialIcon url="http://twitter.com/justfixnyc" target="_blank" rel="noopener noreferrer" bgColor="#FFF" style={{ height: 40, width: 40 }} />
            <SocialIcon url="https://facebook.com/JustFixNYC" target="_blank" rel="noopener noreferrer"bgColor="#FFF" style={{ height: 40, width: 40 }} />
            <SocialIcon url="https://www.linkedin.com/company/justfix-nyc" target="_blank" rel="noopener noreferrer" bgColor="#FFF" style={{ height: 40, width: 40 }} />
            <SocialIcon url="https://github.com/JustFixNYC" target="_blank" rel="noopener noreferrer" bgColor="#FFF" style={{ height: 40, width: 40 }} />
          </div>
        </div>
      </div>

      <div className="is-divider" />

      <div className="columns">
        <div className="column is-three-quarters">
          <p className="subtitle is-size-6 has-text-white"><Trans><b>Disclaimer:</b> The information in JustFix.nyc does not constitute legal advice and must not be used as a substitute for the advice of a lawyer qualified to give advice on legal issues pertaining to housing. We can help direct you to free legal services if necessary.</Trans></p>
          <p className="subtitle is-size-6 has-text-white"><Trans><b>JustFix.nyc</b> is a registered 501(c)(3) nonprofit organization.</Trans></p>
          <Link className="link legal has-text-weight-semibold" to={localePrefix + "/privacy-policy"}>
            <Trans>PRIVACY POLICY</Trans>
          </Link>
          <Link className="link legal has-text-weight-semibold" to={localePrefix + "/terms-of-use"}>
            <Trans>TERMS OF USE</Trans>
          </Link>
        </div>
        <div className="column is-one-quarter">
          <a href="https://www.contentful.com/" target="_blank" rel="noopener noreferrer">
            <img src={require("../img/contenful-light.png")} />
          </a>
        </div>
      </div>

    </div>
  )});

export default Footer;
