import React from "react";
import { Trans } from "@lingui/macro";

type PageHeroInfo = {
  pageName: string;
  description: string;
  onThisPageList: string[];
};

const PageHero: React.FC<PageHeroInfo> = ({
  pageName,
  description,
  onThisPageList,
}) => (
  <div className="jf-page-hero is-flex is-justify-content-flex-end has-background-black has-text-white">
    <div className="columns is-marginless is-paddingless">
      <div className="column is-9 is-12-mobile px-9 py-10 p-6-mobile is-flex is-align-items-flex-end">
        <div>
          <div className="eyebrow is-large pb-4">{pageName}</div>
          <h1 className="mt-4">{description}</h1>
        </div>
      </div>
      <div className="column is-3 is-12-mobile px-9 py-10 p-6-mobile is-flex is-align-items-flex-end">
        <div>
          <div className="eyebrow is-large pb-4">
            <Trans>On this page</Trans>
          </div>
          <ul className="mt-4">
            {onThisPageList.map((item: string, i: number) => (
              <li className="title is-3 has-text-white is-marginless" key={i}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default PageHero;
