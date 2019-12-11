import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure, Snippet, connectSearchBox, connectHits } from 'react-instantsearch-dom';
import { Link } from 'gatsby';

const appId = process.env.GATSBY_ALGOLIA_APP_ID;
const searchKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY;

const SearchBox = ({ currentRefinement, refine, updateSearchQuery }: any) => (
  <form className="control" noValidate action="" role="search">
    <input
      className="input is-primary"
      type="search"
      placeholder="🔎 Search articles..."
      value={currentRefinement}
      onChange={event => {refine(event.currentTarget.value); updateSearchQuery(event.currentTarget.value);}}
    />
  </form>
);

const Hits = ({ hits }: any) => (
  (hits && hits.length > 0 ? 
  <div className="dropdown-content">
    {hits.map( (hit: any) => (
      <Link key={hit.slug} to={"/resources/" + hit.slug} className="dropdown-item">
        <div className="is-size-6 has-text-primary has-text-weight-semibold">
          {hit.title} →
        </div>
        <div className="result__snippet">
          <Snippet
            attribute="articleContent"
            hit={hit}
            tagName="u"
          />
        </div>
      </Link>
    ))}
  </div>: <span>No results</span>)
);

const CustomSearchBox = connectSearchBox(SearchBox);
const CustomHits = connectHits(Hits);

type Props = any;
type State = { query: string };

class LearningSearchBar extends Component<Props,State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  render() {
    return (appId && searchKey ? 
    <InstantSearch
      searchClient={algoliasearch(appId,searchKey)}
      indexName="learning_center"
      resultsState={[]}
    >
      
      <CustomSearchBox defaultRefinement="" updateSearchQuery={(e: any) => this.setState({query: e})} />

        {(this.state.query || '').length > 0 && 
          (
            <React.Fragment>
              <Configure attributesToSnippet={['articleContent']} />
              <CustomHits />
            </React.Fragment>
          )
        }

      </InstantSearch>: 
    <React.Fragment />
    )
  }
} 

export default LearningSearchBar;