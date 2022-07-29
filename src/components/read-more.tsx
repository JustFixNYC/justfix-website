import React from "react";
import { Trans } from "@lingui/macro";

import { LocaleLink } from "./locale-link";
import { OutboundLink } from "../util/links";
import classnames from "classnames";

/**
 * This component takes a url path and, depending on whether the path is for an
 * internal page or an external page, generates the appropriate link with icon.
 *
 * Default link styling is black and underliined text, which can be overridden with the
 * `customClasses` option.
 */
export const ReadMoreLink: React.FC<{
  url: string;
  customClasses?: string;
}> = ({ url, customClasses }) =>
  url.charAt(0) === "/" ? (
    <LocaleLink
      className={classnames(customClasses || "is-underlined has-text-black")}
      to={url}
    >
      <Trans>Read More</Trans>
      <img
        className="jf-link-arrow-icon ml-2"
        src={require("../img/internal-arrow.svg")}
        alt=""
      />
    </LocaleLink>
  ) : (
    <OutboundLink
      href={url}
      className={classnames(customClasses || "is-underlined has-text-black")}
    >
      <Trans>Read More</Trans>
      <img
        className="jf-link-arrow-icon ml-2"
        src={require("../img/external-arrow.svg")}
        alt=""
      />
    </OutboundLink>
  );
