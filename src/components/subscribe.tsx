import React from "react";
import { Trans, t } from "@lingui/macro";
import { withI18n, withI18nProps } from "@lingui/react";

type FormLocation = "footer" | "page";

type SubscribeProps = { location?: FormLocation } & withI18nProps;

type SubscribeState = {
  email: string;
  success: boolean;
  response: string;
};

class SubscribeWithoutI18n extends React.Component<
  SubscribeProps,
  SubscribeState
> {
  constructor(props: SubscribeProps) {
    super(props);
    this.state = {
      email: "",
      success: false,
      response: "",
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = this.state.email || null;
    const { i18n } = this.props;
    const locale = i18n.language;

    // check if email is missing, return undefined
    if (!email) {
      this.setState({
        response: i18n._(t`Please enter an email address!`),
      });
      return;
    }

    const tenantPlatformOrigin =
      process.env.GATSBY_TENANT_PLATFORM_SITE_ORIGIN ||
      "https://demo.justfix.org";

    fetch(`${tenantPlatformOrigin}/mailchimp/subscribe`, {
      method: "POST",
      mode: "cors",
      body: `email=${encodeURIComponent(
        email
      )}&language=${locale}&source=orgsite`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((result) => result.json())
      .then((result) => {
        if (result.status === 200) {
          this.setState({
            success: true,
            response: i18n._(t`All set! Thanks for subscribing!`),
          });
        } else if (result.errorCode === "INVALID_EMAIL") {
          this.setState({
            response: i18n._(t`Oops! That email is invalid.`),
          });
        } else {
          this.setState({
            response: i18n._(
              t`Oops! A network error occurred. Try again later.`
            ),
          });
        }
      })
      .catch((err) => {
        this.setState({
          response: i18n._(t`Oops! A network error occurred. Try again later.`),
        });
      });
  };

  render() {
    const { i18n, location } = this.props;

    // Default styling is for "footer"
    const defaultResponseTextClass =
      location === "page" ? "has-text-black" : "has-text-white";

    return (
      <div>
        <form
          className="jf-email-form field has-addons"
          onSubmit={this.handleSubmit}
        >
          <div className="control is-expanded is-paddingless">
            <input
              type="email"
              name="EMAIL"
              className="input"
              onChange={this.handleChange}
              placeholder={i18n._(t`Email Address`)}
            />
          </div>
          <div className="control is-paddingless">
            <button className="button" type="submit">
              <span className="eyebrow is-small">
                <Trans>Sign up</Trans>
              </span>
            </button>
          </div>
        </form>
        {this.state.response && (
          <>
            <p
              className={
                this.state.success
                  ? defaultResponseTextClass
                  : "has-text-danger"
              }
            >
              {this.state.response}
            </p>
            <br />
          </>
        )}
      </div>
    );
  }
}

const Subscribe = withI18n()(SubscribeWithoutI18n);

export default Subscribe;
