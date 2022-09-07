import React from "react";
import { Trans } from "@lingui/macro";
import BackgroundImage from "gatsby-background-image";
import ResponsiveElement from "./responsive-element";
import { FluidObject } from "gatsby-image";

type PageHeroInfo = {
  pageName: string;
  description: string;
  onThisPageList: string[];
  image?: {
    fluid: FluidObject;
  };
};

const PageHero: React.FC<PageHeroInfo> = ({
  pageName,
  description,
  onThisPageList,
  image,
}) => (
  <div className="jf-page-hero is-flex is-justify-content-flex-end has-background-black has-text-white">
    {image ? (
      <div className="columns is-marginless is-paddingless">
        <BackgroundImage
          className="column is-6"
          fluid={image.fluid}
          style={{
            backgroundPosition: "center bottom",
          }}
        />
        <div className="column is-6 px-10 py-9 p-6-mobile is-flex is-align-items-flex-end">
          <div>
            <ResponsiveElement
              tagNames={{ desktop: "h2", touch: "h1" }}
              className="mb-9 mb-5-mobile"
            >
              {description}
            </ResponsiveElement>
            <div className="eyebrow is-large pt-4">{pageName}</div>
          </div>
        </div>
      </div>
    ) : (
      <div className="columns is-marginless is-paddingless">
        <div className="column is-8 px-9 py-10 p-6-mobile pt-13-mobile is-flex is-align-items-flex-end">
          <div className="is-flex-mobile is-flex-direction-column is-flex-grow-1">
            <div className="eyebrow is-large pb-4">{pageName}</div>
            <h1 className="mt-4">{description}</h1>
          </div>
        </div>
        <div className="column is-4 px-9 py-10 p-6-mobile is-flex is-align-items-flex-end">
          <div className="is-flex-mobile is-flex-direction-column is-flex-grow-1">
            <div className="eyebrow is-large pb-4">
              <Trans>On this page</Trans>
            </div>
            <ul className="mt-4">
              {onThisPageList.map((item: string, i: number) => (
                <li
                  className="title is-3 has-text-white is-marginless pl-8"
                  key={i}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default PageHero;
