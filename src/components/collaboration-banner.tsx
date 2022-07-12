import React from "react";
import { Trans } from "@lingui/macro";
import { LocaleLink } from "../components/locale-link";

export function CollaborationBanner(props: {
  title: string;
  subtitle: string;
}): JSX.Element {
  return (
    <section className="collaboration-banner hero is-small is-primary is-horizontal-center">
      <div className="hero-body has-text-centered is-horizontal-center">
        <div className="container">
          <h1 className="title is-size-4 has-text-weight-bold is-spaced">
            {props.title}
          </h1>
          <p className="subtitle has-text-weight-medium">{props.subtitle}</p>
          <div className="columns">
            <div className="column">
              <LocaleLink
                to="/contact-us"
                className="button is-medium is-primary is-outlined is-inverted is-uppercase"
              >
                <Trans>Contact Us</Trans>
              </LocaleLink>
            </div>

            <div className="column">
              <a
                href="https://donorbox.org/donate-to-justfix-nyc"
                className="button is-medium is-primary is-outlined is-inverted is-uppercase"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Trans>Donate</Trans>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
