import { init, track } from "@amplitude/analytics-browser";
import { removeLocaleFromPathname, useCurrentLocale } from "../util/use-locale";
import { useLocation } from "@reach/router";

const API_KEY = process.env.GATSBY_AMPLITUDE_API_KEY;
if (API_KEY) {
  init(API_KEY);
}

type LocaleChoice = "en" | "es";

/**
 * This structure has Amplitude event properties shared by many
 * of our events.
 */
type PageInfo = {
  /**
   * The pathname of the URL the user was on when the event took place,
   * *without* any leading locale, e.g. `/account`.
   *
   * Because the locale isn't included, we can easily aggregate
   * statistics without having to account for every possible locale
   * we support.
   */
  pathname: string;

  /**
   * The locale the user was using when the event took place, e.g. `en`.
   */
  locale: LocaleChoice;
};

export type EventProperties = {
  [x: string]: unknown;
};

export type AmplitudeEvent = "Viewed page" | "Clicked link" | "Toggled locale";

/**
 * Returns page information about the current page, to
 * be included as event properties for events that take place
 * on that page.
 *
 * @see PageInfo
 */
const getPageInfo = (): PageInfo => {
  const locale = useCurrentLocale() as LocaleChoice;
  const location = useLocation();
  const pathname = removeLocaleFromPathname(location.pathname);
  return {
    pathname: pathname,
    locale: locale,
  };
};

const getLinkType = (link: string) =>
  link.charAt(0) === "/" ? "internal" : "outbound";

/**
 * Log a general event in Amplitude.
 */
export const logAmplitudeEvent = (
  name: AmplitudeEvent,
  eventProperties?: EventProperties
) => {
  if (!API_KEY) return;
  track(name, eventProperties);
};

/**
 * Log a page view in Amplitude.
 *
 * @see PageInfo
 */
export const logAmplitudePageView = (eventProperties?: EventProperties) => {
  logAmplitudeEvent("Viewed page", {
    ...getPageInfo(),
    ...eventProperties,
  });
};

/**
 * Return a logAmplitudeEvent function with pre-filled
 * properties about the page where it was triggered.
 *
 * @see PageInfo
 */
export const useLogAmplitudeEvent = (
  name: AmplitudeEvent,
  eventProperties?: any
) => {
  return logAmplitudeEvent.bind(null, name, {
    ...getPageInfo(),
    ...eventProperties,
  });
};

/**
 * Return a logAmplitudeEvent function for tracking a link click
 * with pre-filled properties about the page where it was triggered.
 *
 * @see PageInfo
 */
export const useLogAmplitudeLinkClick = (
  href: string,
  eventProperties?: EventProperties
) => {
  return logAmplitudeEvent.bind(null, `Clicked link`, {
    ...getPageInfo(),
    ...eventProperties,
    href,
    linkType: getLinkType(href),
  });
};
