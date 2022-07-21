import React from "react";
import { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Configure,
  Snippet,
  connectSearchBox,
  connectHits,
  Hits,
} from "react-instantsearch-dom";
import { SearchBoxExposed } from "react-instantsearch-core";
import { I18n } from "@lingui/react";
import { t, Trans } from "@lingui/macro";
import { LocaleLink } from "../locale-link";
import { useCurrentLocale } from "../../util/use-locale";
import FocusTrap from "focus-trap-react";

const appId = process.env.GATSBY_ALGOLIA_APP_ID;
const searchKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY;
const enableAnalytics = process.env.GATSBY_ENABLE_ALGOLIA_ANALYTICS;

const SEARCH_RESULTS_LIMIT = 5;

const SearchBox = ({ currentRefinement, refine, props }: any) => {
  const [searchFocused, setSearchFocused] = useState(false);

  console.log(props.categoryButtons);

  return (
    <FocusTrap
      active={searchFocused}
      focusTrapOptions={{
        onDeactivate: () => setSearchFocused(false),
        clickOutsideDeactivates: true,
        returnFocusOnDeactivate: false,
      }}
    >
      <div>
        <I18n>
          {({ i18n }) => (
            <form
              className="control is-flex is-justify-content-space-between is-align-items-center"
              noValidate
              action=""
              role="search"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="input is-align-self-stretch p-4"
                type="search"
                onFocus={() => setSearchFocused(true)}
                placeholder={i18n._(t`Search`)}
                value={currentRefinement}
                onChange={(event) => {
                  refine(event.currentTarget.value);
                }}
              />
              <img
                src={require("../../img/search.svg")}
                height="25"
                width="25"
                className="m-4"
              />
            </form>
          )}
        </I18n>
        {searchFocused && (
          <div className="jf-dropdown-content mt-3 py-5 px-4">
            {!!currentRefinement ? (
              <>
                <CustomHits />
                <div className="jf-search-by is-pulled-right">
                  <img
                    width="100"
                    height="20"
                    src={require("../../img/brand/algolia.svg")}
                  />
                </div>
              </>
            ) : (
              <DropdownPlaceholder {...props} />
            )}
          </div>
        )}
      </div>
    </FocusTrap>
  );
};

type DropdownPlaceholderInfo = {
  categoryButtons: {
    title: string;
    slug: string;
  }[];
  popularArticles: {
    slug: string;
    title: string;
  }[];
};

const DropdownPlaceholder: React.FC<DropdownPlaceholderInfo> = ({
  categoryButtons,
  popularArticles,
}: DropdownPlaceholderInfo) => (
  <>
    <span className="eyebrow is-bold mb-3">Key Topics</span>
    <div className="mt-3 mb-7">
      {categoryButtons.map((category: any, i: number) => (
        <a href={`/learn/category/${category.slug}`} className="no-underline">
          <span
            className={"tag is-empty " + (i === 0 ? "is-marginless mr-2" : "")}
          >
            {category.title}
          </span>
        </a>
      ))}
    </div>
    <span className="eyebrow is-bold">Popular Articles</span>
    <div className="is-flex is-flex-direction-column mt-3">
      {popularArticles.map((article: any, i: number) => (
        <LocaleLink
          className="jf-popular-article mb-2 py-2"
          to={`/learn/${article.slug}`}
        >
          {article.title}
          <img
            className="jf-link-arrow-icon ml-2"
            src={require("../../img/internal-arrow.svg")}
            alt=""
          />
        </LocaleLink>
      ))}
    </div>
  </>
);

type SearchHitsProps = {
  hits?: {
    slug: string;
    title: string;
    englishOnly: boolean | null;
  }[];
};

const SearchHits = ({ hits }: SearchHitsProps) => {
  const locale = useCurrentLocale();

  return hits && hits.length > 0 ? (
    <>
      {hits
        .map((hit: any) => (
          <LocaleLink
            key={hit.slug}
            to={"/learn/" + hit.slug}
            className="jf-dropdown-item"
          >
            <div className="is-size-6 has-text-primary has-text-weight-semibold">
              {hit.title}{" "}
              {locale === "es" && hit.englishOnly && (
                <span className="has-text-danger">(en inglés)</span>
              )}{" "}
              →
            </div>
            <div className="result__snippet">
              <Snippet attribute="articleContent" hit={hit} tagName="u" />
            </div>
          </LocaleLink>
        ))
        .slice(0, SEARCH_RESULTS_LIMIT)}
    </>
  ) : (
    <div className="label">
      <br />
      <Trans>No articles match your search.</Trans>
    </div>
  );
};

/* 
NOTE: We are including a type assertion here because the official type definition 
of connectSearchBox does not allow us to pass additional props from the 
input component (SearchBox) to the output component (CustomSearchBox) */

const CustomSearchBox = connectSearchBox(SearchBox) as React.ComponentClass<
  SearchBoxExposed & any
>;
const CustomHits = connectHits(SearchHits) as React.ComponentClass<Hits & any>;

const LearningSearchBar = (props: any) => {
  const locale = useCurrentLocale();

  return appId && searchKey ? (
    <div className="jf-search-bar">
      <InstantSearch
        searchClient={algoliasearch(appId, searchKey)}
        indexName={
          locale !== "en" ? `learning_center_${locale}` : "learning_center"
        }
        resultsState={[]}
      >
        <Configure
          attributesToSnippet={["articleContent"]}
          analytics={enableAnalytics === "1" || false}
        />
        <CustomSearchBox {...props} />
      </InstantSearch>
    </div>
  ) : (
    <React.Fragment />
  );
};

export default LearningSearchBar;
