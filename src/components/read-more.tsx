import React from "react";
import { Trans } from "@lingui/macro";

import "../styles/read-more.scss";
import { LocaleLink } from "./locale-link";
import { OutboundLink } from "../util/links";
import classnames from "classnames";

type Props = {
  title: string;
  link: string;
};

const ReadMore = ({ title, link }: Props) => (
  <LocaleLink to={link}>
    <div className="level read-more section content">
      <div className="level-left">
        <div className="level-item">
          <div>
            <p className="title has-text-info is-size-6">
              <Trans>Want to know more?</Trans>
            </p>
            <p className="title has-text-white is-size-4">{title}</p>
          </div>
          <div className="is-hidden-tablet">
            <span className="arrow-mobile is-size-2 has-text-white"> ❯ </span>
          </div>
        </div>
      </div>
      <div className="level-right is-hidden-mobile">
        <div className="level-item">
          <span className="arrow is-size-1 has-text-white"> ❯ </span>
        </div>
      </div>
    </div>
  </LocaleLink>
);

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

export default ReadMore;
