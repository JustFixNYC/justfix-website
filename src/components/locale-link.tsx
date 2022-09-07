import React from "react";
import { Link, GatsbyLinkProps } from "gatsby";
import { removeLocaleFromPathname, useCurrentLocale } from "../util/use-locale";
import localeConfig from "../util/locale-config.json";
import { useLocation } from "@reach/router";
import {
  EventProperties,
  useLogAmplitudeEvent,
  useLogAmplitudeLinkClick,
} from "./amplitude";

/**
 * Like Gatsby's <Link>, but it prefixes the passed-in `to` prop with
 * the current locale, and logs an amplitude event with optional extra
 * event properties.
 *
 * Note that this doesn't localize the actual *text* of the link--it only localizes
 * the path!
 */
export function LocaleLink<TState>(
  props: GatsbyLinkProps<TState> & {
    ref?: never;
    eventProperties?: EventProperties;
  }
): JSX.Element {
  const locale = useCurrentLocale();
  const { eventProperties, ...linkProps } = props;

  return (
    <Link
      {...linkProps}
      to={`/${locale}${linkProps.to}`}
      onClick={useLogAmplitudeLinkClick(linkProps.to, {
        ...eventProperties,
      })}
    />
  );
}

/**
 * An instance of Gatsby's <Link> that simply switches the locale of the current path,
 * and logs an amplitude event with optional extra event properties.
 * Note that the `to` prop needs to be an accepted locale or else an error is thrown.
 */
export function LocaleToggle<TState>(
  props: GatsbyLinkProps<TState> & {
    ref?: never;
    eventProperties?: EventProperties;
  }
): JSX.Element {
  const location = useLocation();
  const existingPath = removeLocaleFromPathname(location.pathname);
  const { eventProperties, ...toggleProps } = props;

  if (!localeConfig.ACCEPTED_LOCALES.includes(toggleProps.to)) {
    throw new Error(
      `The locale ${toggleProps.to} in this link is not an accepted locale!`
    );
  } else
    return (
      <Link
        {...toggleProps}
        to={`/${toggleProps.to}/${existingPath}`}
        onClick={useLogAmplitudeEvent("Toggled locale", {
          localeTo: toggleProps.to,
          ...eventProperties,
        })}
      />
    );
}
