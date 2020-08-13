import React from "react";
import { Trans } from "@lingui/macro";

import "../styles/read-more.scss";
import { LocaleLink } from "./locale-link";

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

export default ReadMore;
