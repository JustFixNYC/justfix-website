import React, { useState } from "react";
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

const appId = process.env.GATSBY_ALGOLIA_APP_ID;
const searchKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY;
const enableAnalytics = process.env.GATSBY_ENABLE_ALGOLIA_ANALYTICS;

const SEARCH_RESULTS_LIMIT = 5;

const SearchBox = ({ currentRefinement, refine, updateSearchQuery }: any) => (
  <I18n>
    {({ i18n }) => (
      <form
        className="control"
        noValidate
        action=""
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="input is-primary is-size-5"
          type="search"
          placeholder={i18n._(t`Search articles...`)}
          value={currentRefinement}
          onChange={(event) => {
            refine(event.currentTarget.value);
            updateSearchQuery(event.currentTarget.value);
          }}
        />
      </form>
    )}
  </I18n>
);

type SearchHitsProps = {
  hits?: {
    slug: string;
    title: string;
  }[];
};

const SearchHits = ({ hits }: SearchHitsProps) =>
  hits && hits.length > 0 ? (
    <div className="dropdown-content">
      {hits
        .map((hit: any) => (
          <LocaleLink
            key={hit.slug}
            to={"/learn/" + hit.slug}
            className="dropdown-item"
          >
            <div className="is-size-6 has-text-primary has-text-weight-semibold">
              {hit.title} →
            </div>
            <div className="result__snippet">
              <Snippet attribute="articleContent" hit={hit} tagName="u" />
            </div>
          </LocaleLink>
        ))
        .slice(0, SEARCH_RESULTS_LIMIT)}
    </div>
  ) : (
    <div className="label">
      <br />
      <Trans>No articles match your search.</Trans>
    </div>
  );

/* 
NOTE: We are including a type assertion here because the official type definition 
of connectSearchBox does not allow us to pass additional props from the 
input component (SearchBox) to the output component (CustomSearchBox) */

const CustomSearchBox = connectSearchBox(SearchBox) as React.ComponentClass<
  SearchBoxExposed & any
>;
const CustomHits = connectHits(SearchHits) as React.ComponentClass<Hits & any>;

const LearningSearchBar = () => {
  const [query, setQuery] = useState("");
  const locale = useCurrentLocale();

  return appId && searchKey ? (
    <div className="search-bar">
      <InstantSearch
        searchClient={algoliasearch(appId, searchKey)}
        indexName={
          locale !== "en" ? `learning_center_${locale}` : "learning_center"
        }
        resultsState={[]}
      >
        <CustomSearchBox updateSearchQuery={(e: any) => setQuery(e)} />

        {(query || "").length > 0 && (
          <React.Fragment>
            <Configure
              attributesToSnippet={["articleContent"]}
              analytics={enableAnalytics === "1" || false}
            />
            <CustomHits />
          </React.Fragment>
        )}
      </InstantSearch>

      {query && (
        <div className="search-by is-pulled-right">
          <img
            width="100"
            height="20"
            src={require("../../img/brand/algolia.svg")}
          />
        </div>
      )}
    </div>
  ) : (
    <React.Fragment />
  );
};

export default LearningSearchBar;
