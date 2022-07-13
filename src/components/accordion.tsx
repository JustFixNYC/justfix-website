import { Trans } from "@lingui/macro";
import React from "react";

export const Accordion = (props: {
  question: string;
  children: React.ReactNode;
  /** When set to true, the accordion is open on initial view. */
  isExpanded?: boolean;
}) => (
  <div className="jf-accordion-item">
    <details className="has-text-left" open={props.isExpanded}>
      <summary>
        <h3 className="mb-5">{props.question}</h3>
        <div className="is-flex is-justify-content-flex-end mb-3">
          <span className="jf-accordion-open-text-label is-underlined">
            <Trans>Expand</Trans>
          </span>
          <span className="jf-accordion-close-text-label is-underlined">
            <Trans>Close</Trans>
          </span>
          <img className="ml-2" src={require("../img/chevron.svg")} alt="" />
        </div>
      </summary>
      {props.children}
    </details>
  </div>
);
