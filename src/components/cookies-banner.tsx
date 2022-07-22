import { Trans } from "@lingui/macro";
import React, { useEffect, useState } from "react";
import classnames from "classnames";

export const CookiesBanner = () => {
  const [isClosed, setBannerClosed] = useState(false);

  // Some notes on "localStorage"
  // https://blog.logrocket.com/using-localstorage-react-hooks/
  // https://stackoverflow.com/questions/65496028/gatsby-using-localstorage-to-store-data
  useEffect(() => {
    if (localStorage.getItem("closed") === "true") {
      setBannerClosed(true);
    }
  }, []);

  const handleClick = () => {
    localStorage.setItem("closed", "true");
    setBannerClosed(true);
  };

  return (
    <div
      className={classnames(
        "jf-cookies-banner is-flex is-justify-content-space-between has-background-white",
        isClosed && "is-hidden"
      )}
    >
      <div className="p-6">
        <Trans>By using our website you consent to the use of cookies.</Trans>
      </div>
      <div className="pr-6 is-flex is-align-items-center">
        <button
          role="button"
          className="button is-text"
          aria-label="close"
          aria-expanded="false"
          onClick={handleClick}
        >
          <img src={require("../img/close.svg")} width="14" height="14" />
        </button>
      </div>
    </div>
  );
};
