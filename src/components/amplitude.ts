import amplitude from "amplitude-js";
import { removeLocaleFromPathname, useCurrentLocale } from "../util/use-locale";
import { useLocation } from "@reach/router";

// Initiating Amplitude inside this helper file seems to work better with the Create React App framework than
// adding a script tag to our index.html file.
//
// See https://javascript.plainenglish.io/adding-analytics-to-your-react-application-b584265f9fae for more details

// const API_KEY = process.env.AMPLITUDE_API_KEY;
// if (!API_KEY) throw new Error("No Amplitude API key defined!");

// amplitude.getInstance().init(API_KEY);

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

export type AmplitudeEvent =
  | "languageToggle"
  | "pageLink"
  | "productCardCTA";

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
}

/**
 * Log a general event in Amplitude.
 */
const logAmplitudeEvent = (name: AmplitudeEvent, data?: any) => {
  const amplitudeData = {
    ...data,
  };
  console.log(amplitudeData);
  // amplitude.getInstance().logEvent(name, amplitudeData);
}

export { logAmplitudeEvent, getPageInfo };
