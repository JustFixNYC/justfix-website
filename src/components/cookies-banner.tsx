import { Trans } from "@lingui/macro";
import React, { useEffect, useState } from "react";
import classnames from "classnames";
import FocusTrap from "focus-trap-react";

export const CookiesBanner = () => {
  const [modalIsActive, setModalActive] = useState(false);
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
      <div className="is-flex is-align-items-center">
        <div className="p-6">
          <Trans>By using our website you consent to the use of cookies.</Trans>{" "}
          <div
            role="button"
            className="link ml-2"
            aria-expanded="false"
            onClick={() => setModalActive(true)}
          >
            <Trans>Learn more</Trans>
          </div>
        </div>
      </div>
      <div className="pr-6 is-flex is-align-items-center">
        <button
          role="button"
          className="button is-text"
          aria-label="close"
          aria-expanded="false"
          onClick={handleClick}
        >
          <img src={require("../img/close.svg")} width="14px" height="14px" />
        </button>
      </div>
      <div className={classnames("modal", modalIsActive && "is-active")}>
        <div className="modal-background" />
        <FocusTrap
          active={modalIsActive}
          focusTrapOptions={{
            onDeactivate: () => setModalActive(false),
            clickOutsideDeactivates: true,
          }}
        >
          <div className="modal-content">
            <div className="has-background-white p-6 mx-6">
              <div className="has-text-centered mb-5">
                <h3>
                  <Trans>We use cookies on this website</Trans>
                </h3>
              </div>
              <p className="mb-5">
                <Trans>
                  This means that we’re able to see your approximate location,
                  the type of device you’re using, and your operating system.
                </Trans>
              </p>
              <p className="is-small mb-5">
                <Trans>
                  These cookies track the performance of our tools and for
                  marketing purposes. This data allows us to improve our tools
                  to give you the best experience.
                </Trans>
              </p>
              <div className="buttons is-centered">
                <button
                  className="button is-primary"
                  role="button"
                  aria-label="close"
                  onClick={() => setModalActive(false)}
                >
                  <Trans>Got it</Trans>
                </button>
              </div>
            </div>
          </div>
        </FocusTrap>
      </div>
    </div>
  );
};
