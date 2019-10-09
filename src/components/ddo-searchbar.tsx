import React, { useState, useEffect } from 'react'
import { GeoAutocomplete, GeoAutocompleteItem, geoAutocompleteItemToString } from "./geo-autocomplete";

const DDO_URL = "https://demo.justfix.nyc/ddo";
const DDO_ADDRESS_VAR = "address";
const DDO_BOROUGH_VAR = "borough";

export type DDOSearchBarProps = {
  hiddenFieldLabel: string;
  submitLabel: string;
  disableAutocomplete?: boolean;
};

function getDDOURL(item: GeoAutocompleteItem): string {
  let url = `${DDO_URL}?${DDO_ADDRESS_VAR}=${encodeURIComponent(item.address)}`;

  if (item.borough) {
    url += `&${DDO_BOROUGH_VAR}=${encodeURIComponent(item.borough)}`;
  }

  return url;
}

function gotoDDO(item: GeoAutocompleteItem) {
  window.location.assign(getDDOURL(item));
}

function BaselineAddressInput(props: {defaultValue: string, hiddenFieldLabel: string}) {
  return (
    <div className="field">
      <div className="control">
        <label htmlFor="addressInput" className="is-sr-only">{props.hiddenFieldLabel}</label>
        <input className="input" name={DDO_ADDRESS_VAR} id="addressInput" defaultValue={props.defaultValue} />
      </div>
    </div>
  );
}

export function DDOSearchBar(props: DDOSearchBarProps): JSX.Element {
  const [useGeoAutocomplete, setUseGeoAutocomplete] = useState(false);
  const [autocompleteItem, setAutocompleteItem] = useState<GeoAutocompleteItem|null>(null);

  useEffect(() => {
    if (!props.disableAutocomplete) setUseGeoAutocomplete(true);
  }, []);

  return (
    <form action={DDO_URL} onSubmit={(e) => {
      if (!useGeoAutocomplete) return;
      e.preventDefault();
      if (autocompleteItem) {
        gotoDDO(autocompleteItem);
      }
    }}>
      <div className="level jf-ddo-searchbar">
        {useGeoAutocomplete
          ? <GeoAutocomplete label={props.hiddenFieldLabel} onChange={item => {
              setAutocompleteItem(item);
              if (item.address && item.borough) {
                gotoDDO(item);
              }
            }} onNetworkError={() => setUseGeoAutocomplete(false)} />
          : <BaselineAddressInput {...props} defaultValue={geoAutocompleteItemToString(autocompleteItem)} />
        }
        <button type="submit" className="button is-primary">{props.submitLabel}</button>
      </div>
    </form>
  );
}
