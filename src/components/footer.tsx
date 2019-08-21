import React from 'react'
import { SocialIcon } from 'react-social-icons';
import { Link } from 'gatsby'

const MAILCHIMP_URL = "https://nyc.us13.list-manage.com/subscribe/post?u=d4f5d1addd4357eb77c3f8a99&amp;id=588f6c6ef4";

const Footer = () => 
  (<div className="footer has-background-info">
    <div className="columns has-text-centered-mobile">

      <div className="column is-one-quarter">
        <Link to="/" className="button is-info">
          <img src={require("../img/brand/logo.png")} />
        </Link>
      </div>
      <div className="column is-one-quarter">
        <p className="has-text-white has-text-weight-bold">WHAT WE DO</p>
        <Link className="link has-text-weight-semibold" to="/#products">
          <p>PRODUCTS & SERVICES</p>
        </Link>
        <Link className="link has-text-weight-semibold" to="/contact-us">
          <p>CONTACT</p>
        </Link>
      </div>

      <div className="column is-one-quarter">
        <p className="has-text-white has-text-weight-bold">ABOUT US</p>
        <Link className="link has-text-weight-semibold" to="/about/team">
          <p>OUR TEAM</p>
        </Link>
        <Link className="link has-text-weight-semibold" to="/about/partners">
          <p>OUR PARTNERS</p>
        </Link>
        <a className="link has-text-weight-semibold" href="https://justfix.breezy.hr/" target="_blank" rel="noopener noreferrer">
          <p>JOBS</p>
        </a>
        <Link className="link has-text-weight-semibold" to="/about/press">
          <p>PRESS</p>
        </Link>
      </div>

      <div className="column is-one-quarter">
        <h4 className="title is-size-5 has-text-white">
          Join our mailing list!
        </h4>
        <form action={MAILCHIMP_URL} className="email-form is-horizontal-center" method="post" target="_blank">
          <div className="mc-field-group">
            <div className="control is-expanded">
                <input type="email" name="EMAIL" className="required email input" id="mce-EMAIL" placeholder="Email Address" />
            </div>
            <div className="control has-text-centered-mobile">
              <button className="button is-primary" type="submit">
                  SIGN UP
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
        <p className="subtitle is-size-6 has-text-white"><b>Disclaimer: </b>The information in JustFix.nyc does not constitute legal advice and must not be used as a substitute for the advice of a lawyer qualified to give advice on legal issues pertaining to housing. We can help direct you to free legal services if necessary.</p>
        <p className="subtitle is-size-6 has-text-white"><b>JustFix.nyc </b>is a registered 501(c)(3) nonprofit organization.</p>
        <Link className="link legal has-text-weight-semibold" to="/privacy-policy">
          PRIVACY POLICY
        </Link>
        <Link className="link legal has-text-weight-semibold" to="/terms-of-use">
          TERMS OF USE
        </Link>
      </div>
      <div className="column is-one-quarter">
        <a href="https://www.contentful.com/" target="_blank" rel="noopener noreferrer">
          <img src={require("../img/contenful-light.png")} />
        </a>
      </div>
    </div>

  </div>);

export default Footer;
