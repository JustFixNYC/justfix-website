import React, { useState, useEffect } from "react";
import {
  GeoAutocomplete,
  GeoAutocompleteItem,
  GeoAutocompleteProps,
} from "./geo-autocomplete";
import classnames from "classnames";

/** The URL for Data-Driven Onboarding (DDO) on the JustFix Tenant Platform. */
const DDO_URL =
  (process.env.GATSBY_TENANT_PLATFORM_SITE_ORIGIN ||
    "https://demo.justfix.org") + "/";

/** The querystring variable used to communicate the address for DDO. */
const DDO_ADDRESS_VAR = "address";

/** The querystring variable used to communicate the borough for DDO. */
const DDO_BOROUGH_VAR = "borough";

/** The default URL parameters used for tracking */
const DDO_URL_UTM_TAGS = "utm_source=orgsite&utm_medium=ddosearch";

export type DDOSearchBarProps = {
  /** The label text for the address field, used for accessibility purposes only (it is visually hidden). */
  hiddenFieldLabel: string;

  /** The label text for the submit button. */
  submitLabel: string;

  /** The URL for DDO. */
  action?: string;

  /** The specified locale for the DDO URL. */
  locale?: string;

  /** Whether to forcibly disable address autocompletion functionality. */
  disableAutocomplete?: boolean;

  /** The GeoAutocomplete component to use; primarily intended for testing. */
  geoAutocompleteComponent?: React.ComponentType<GeoAutocompleteProps>;

  /** Whether the search bar is showing up within a CTA */
  withinCTA?: boolean;

  /** Custom URL parameters used for tracking */
  customUtmTags?: string;
};

/** Return the DDO URL for the given address and/or borough, and locale (optional). */
export function getDDOURL(
  item: GeoAutocompleteItem,
  baseURL: string = DDO_URL,
  locale?: string,
  utmTags?: string
): string {
  const localePath = locale ? locale + "/" : "";
  let url = `${baseURL}${localePath}?${DDO_ADDRESS_VAR}=${encodeURIComponent(
    item.address
  )}`;

  if (item.borough) {
    url += `&${DDO_BOROUGH_VAR}=${encodeURIComponent(item.borough)}`;
  }

  return utmTags ? url + `&${utmTags}` : url;
}

/**
 * A component for the baseline (non-progressively-enhanced) address
 * field input.
 */
function BaselineAddressInput(props: { hiddenFieldLabel: string }) {
  return (
    <div className="field">
      <div className="control">
        <label htmlFor="addressInput" className="is-sr-only">
          {props.hiddenFieldLabel}
        </label>
        <input
          className="input"
          required
          name={DDO_ADDRESS_VAR}
          id="addressInput"
        />
      </div>
    </div>
  );
}

/**
 * A component for the Data-Driven Onboarding (DDO) search bar.
 * The baseline experience is just a text field that sends the
 * user to DDO on the JustFix Tenant Platform, but this
 * progressively enhances to auto-complete the address.
 */
export function DDOSearchBar(props: DDOSearchBarProps): JSX.Element {
  const [useGeoAutocomplete, setUseGeoAutocomplete] = useState(false);
  const [
    autocompleteItem,
    setAutocompleteItem,
  ] = useState<GeoAutocompleteItem | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const GeoAutocompleteComponent =
    props.geoAutocompleteComponent || GeoAutocomplete;
  const gotoDDO = (item: GeoAutocompleteItem) => {
    setIsNavigating(true);
    window.location.assign(
      getDDOURL(
        item,
        props.action,
        props.locale,
        props.customUtmTags || DDO_URL_UTM_TAGS
      )
    );
  };

  useEffect(() => {
    if (!props.disableAutocomplete) setUseGeoAutocomplete(true);
  }, []);

  return (
    <form
      action={props.action || DDO_URL}
      onSubmit={(e) => {
        if (!useGeoAutocomplete) {
          setIsNavigating(true);
          return;
        }
        e.preventDefault();
        if (autocompleteItem) {
          gotoDDO(autocompleteItem);
        }
      }}
    >
      <div className={(props.withinCTA ? "" : "level ") + "jf-ddo-searchbar"}>
        {useGeoAutocomplete ? (
          <GeoAutocompleteComponent
            label={props.hiddenFieldLabel}
            onChange={(item) => {
              setAutocompleteItem(item);
              if (item.address && item.borough) {
                gotoDDO(item);
              }
            }}
            onNetworkError={(e) => {
              window.console && window.console.log(e);
            }}
          />
        ) : (
          <BaselineAddressInput {...props} />
        )}
        <button
          type="submit"
          className={
            props.withinCTA
              ? classnames(
                  "button",
                  "is-primary",
                  "is-medium",
                  "is-uppercase",
                  isNavigating ? "is-loading" : "is-dark"
                )
              : classnames(
                  "button",
                  "is-inverted",
                  "is-outlined",
                  "is-uppercase",
                  isNavigating ? "is-loading" : "is-dark"
                )
          }
        >
          {props.submitLabel}
        </button>
      </div>
    </form>
  );
}
