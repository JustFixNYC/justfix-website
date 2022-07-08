import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Layout from "../components/layout";
import PageHero from "../components/page-hero";
import { ContentfulContent } from "./index.en";

import "../styles/team.scss";

// Returns an array with arrays of the given size.
// https://ourcodeworld.com/articles/read/278/how-to-split-an-array-into-chunks-of-the-same-size-easily-in-javascript
const chunkArray = (myArray: Array<any>, chunk_size: number) => {
  var results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }

  return results;
};

type MemberCardInfo = {
  name: string;
  title: string;
  description: {
    description: string;
  };
  photo: {
    fluid: {
      src: string;
    };
  };
};

const MemberCard: React.FC<MemberCardInfo> = (props) => (
  <div className="column is-3 is-paddingless">
    <figure className="image">
      <img
        className="is-rounded"
        src={props.photo.fluid.src}
        alt={props.name}
      />
    </figure>
    <div className="has-text-centered my-7">
      <h3>{props.name}</h3>
      <h4>{props.title}</h4>
    </div>
    <div>
      <p>{props.description.description}</p>
    </div>
  </div>
);

type MemberCardsListInfo = {
  sectionTitle: string;
  memberList: MemberCardInfo[];
};

const MemberCardsList: React.FC<MemberCardsListInfo> = (props) => (
  <div className="py-9">
    <div className="columns">
      <div className="column is-12">
        <h1 className="team-title">{props.sectionTitle}</h1>
      </div>
    </div>
    {chunkArray(props.memberList, 3).map((members: Array<any>, i: number) => (
      <div className="members columns py-9" key={i}>
        <MemberCard {...members[0]} />
        {members[1] ? (
          <MemberCard {...members[1]} />
        ) : (
          <div className="column is-3" />
        )}
        {members[2] ? (
          <MemberCard {...members[2]} />
        ) : (
          <div className="column is-3" />
        )}
      </div>
    ))}
  </div>
);

export const TeamPageScaffolding = (props: ContentfulContent) => (
  <Layout metadata={props.content.metadata}>
    <div id="team" className="team-page">
      <PageHero {...props.content.teamPageHero} />

      <MemberCardsList
        sectionTitle={props.content.title}
        memberList={props.content.teamMembers}
      />

      <MemberCardsList
        sectionTitle={props.content.directorsTitle}
        memberList={props.content.directors}
      />

      <div className="py-9">
        <div className="columns">
          <div className="column is-12">
            <h1 className="team-title">
              {props.content.otherContributorsTitle}
            </h1>
          </div>
        </div>
        <div className="columns">
          <div className="column is-12">
            {props.content.otherContributors.map(
              (contributor: any, i: number) => (
                <p className="py-4" key={i}>
                  {contributor.name}
                </p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export const TeamPageFragment = graphql`
  fragment TeamPage on Query {
    contentfulTeamPage(node_locale: { eq: $locale }) {
      metadata {
        title
        description
        keywords {
          keywords
        }
        shareImage {
          file {
            url
          }
        }
      }
      teamPageHero {
        pageName
        description
        onThisPageList
      }
      title
      teamMembers {
        name
        title
        description {
          description
        }
        photo {
          fluid {
            src
          }
        }
      }
      directorsTitle
      directors {
        name
        title
        photo {
          fluid {
            src
          }
        }
      }
      otherContributorsTitle
      otherContributors {
        name
      }
    }
  }
`;

const TeamPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "en-US") {
        ...TeamPage
      }
    `}
    render={(data) => <TeamPageScaffolding content={data.contentfulTeamPage} />}
  />
);

export default TeamPage;
