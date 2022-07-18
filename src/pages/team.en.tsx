import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image/withIEPolyfill";
import Layout from "../components/layout";
import PageHero from "../components/page-hero";
import { ContentfulContent } from "./index.en";

import "../styles/team.scss";

type MemberCardInfo = {
  name: string;
  title: string;
  description: {
    description: string;
  };
  photo: {
    fluid: any;
  };
  className?: string;
};

const MemberCard: React.FC<MemberCardInfo> = (props) => (
  <div className={`column is-9 ${props.className}`}>
    <figure className="image">
      <Img fluid={props.photo.fluid} className="is-rounded" alt={props.name} />
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
        <h1 className="jf-team-title">{props.sectionTitle}</h1>
      </div>
    </div>
    <div className="jf-members columns is-multiline is-centered py-9">
      {props.memberList.map((member: any, i: number) => {
        const alignments = [
          "is-pulled-left",
          "is-horizontal-center",
          "is-pulled-right",
        ];
        return (
          <div className="column is-4 is-paddingless" key={i}>
            <MemberCard {...member} className={alignments[i % 3]} />
          </div>
        );
      })}
      {props.memberList.length % 3 == 2 && <div className="column is-4" />}
    </div>
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
          <div className="column">
            <h1 className="jf-team-title">
              {props.content.otherContributorsTitle}
            </h1>
          </div>
        </div>
        <div className="columns">
          <div className="column">
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
            ...GatsbyContentfulFluid
          }
        }
      }
      directorsTitle
      directors {
        name
        title
        description {
          description
        }
        photo {
          fluid {
            ...GatsbyContentfulFluid
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
