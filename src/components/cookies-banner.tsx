import { Trans } from "@lingui/macro";
import React from "react";

export const CookiesBanner = () => (
  <div className="jf-cookies-banner is-flex is-justify-content-space-between has-background-white">
    <div className="p-6">
      <Trans>By using our website you consent to the use of cookies.</Trans>
    </div>
    <div className="pr-6 is-flex is-align-items-center">
      <button
        role="button"
        className="button is-text"
        aria-label="close"
        aria-expanded="false"
        onClick={() => {}}
      >
        <img src={require("../img/close.svg")} width="14" height="14" />
      </button>
    </div>
  </div>
);
