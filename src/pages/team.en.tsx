import React from "react";
import { StaticQuery, graphql } from "gatsby";
// import Img from "gatsby-image/withIEPolyfill";

import { SocialIcon } from "react-social-icons";
import ReadMoreReact from "read-more-react";
// import { Link } from 'gatsby'

import "../styles/team.scss";

import Layout from "../components/layout";
import ReadMore from "../components/read-more";
import { ContentfulContent } from "./index.en";

/**
 * Returns an array with arrays of the given size.
 * https://ourcodeworld.com/articles/read/278/how-to-split-an-array-into-chunks-of-the-same-size-easily-in-javascript
 *
 * @param myArray {Array} Array to split
 * @param chunkSize {Integer} Size of every group
 */
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
  <div className="column is-one-quarter is-paddingless">
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
      <div className="columns py-9" key={i}>
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
      <div>HERO</div>

      <MemberCardsList
        sectionTitle={props.content.title}
        memberList={props.content.teamMembers}
      />

      <MemberCardsList
        sectionTitle={props.content.directorsTitle}
        memberList={props.content.directors}
      />

      {/* <section className="hero is-small">
        <div className="hero-body has-text-centered is-horizontal-center">
          <div className="container">
            <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
              {props.content.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="content-wrapper team-members">
        <div className="columns is-multiline">
          {props.content.teamMembers.map((member: any, i: number) => (
            <div
              className="column team-member is-one-third has-text-centered "
              key={i}
            >
              <figure className="image is-128x128 is-horizontal-center">
                <img
                  className="is-rounded"
                  src={member.photo.fluid.src}
                  alt={member.name}
                />
              </figure>

              <h4 className="title is-size-5 has-text-grey-dark">
                {member.name}
              </h4>
              <h4 className="subtitle is-size-5 has-text-grey-dark">
                {member.title}
              </h4>
              <div className="field">
                {member.professionalLinks &&
                  member.professionalLinks.map((link: any, i: number) => (
                    <SocialIcon
                      key={i}
                      url={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      bgColor="#0096D7"
                      style={{ height: 40, width: 40 }}
                    />
                  ))}
              </div>
              <p>{member.description.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="hero is-small">
        <div className="hero-body has-text-centered is-horizontal-center">
          <div className="container">
            <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
              {props.content.designAdvisorsTitle}
            </h1>
          </div>
        </div>
      </section>

      <section className="content-wrapper design-advisors">
        <div className="columns is-multiline">
          {props.content.designAdvisors.map((advisor: any, i: number) => (
            <div
              className="column team-member is-one-third has-text-centered "
              key={i}
            >
              <figure className="image is-128x128 is-horizontal-center">
                <img
                  className="is-rounded"
                  src={advisor.photo.file.url}
                  alt={advisor.name}
                />
              </figure>

              <h4 className="title is-size-5 has-text-grey-dark">
                {advisor.name}
              </h4>
              <h4 className="subtitle is-size-5 has-text-grey-dark">
                {advisor.title}
              </h4>
              <p>{advisor.description.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="hero is-small">
        <div className="hero-body has-text-centered is-horizontal-center">
          <div className="container">
            <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
              {props.content.directorsTitle}
            </h1>
          </div>
        </div>
      </section>

      <section className="content-wrapper tight directors">
        {props.content.directors.map((director: any, i: number) => (
          <div className="columns" key={i}>
            <div className="column director is-one-quarter">
              <figure className="image is-128x128 is-pulled-right is-hidden-mobile">
                <img
                  className="is-rounded"
                  src={director.photo.file.url}
                  alt={director.name}
                />
              </figure>
              <figure className="image is-128x128 is-horizontal-center is-hidden-tablet">
                <img
                  className="is-rounded"
                  src={director.photo.file.url}
                  alt={director.name}
                />
              </figure>
            </div>
            <div className="column director is-three-quarters">
              <h4 className="title is-size-5 has-text-grey-dark has-text-centered-mobile">
                {director.name}
              </h4>
              <h4 className="subtitle is-size-5 has-text-grey-dark has-text-centered-mobile">
                {director.title + ", "}
                {director.organizationLink ? (
                  <a
                    href={director.organizationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {director.organization}
                  </a>
                ) : (
                  <>{director.organization}</>
                )}
              </h4>
              <ReadMoreReact
                text={director.description.description}
                min={180}
                ideal={250}
                max={400}
                readMoreText={" Read More"}
              />
            </div>
          </div>
        ))}
      </section>

      <section className="is-horizontal-center hero is-small has-background-light">
        <div className="hero-body has-text-centered is-horizontal-center">
          <div className="container">
            <h1 className="title is-size-4 has-text-grey-dark has-text-weight-bold is-spaced">
              {props.content.otherContributorsTitle}
            </h1>
            {props.content.otherContributors.map(
              (contributor: any, i: number) => (
                <p
                  className="has-text-weight-semibold has-text-grey-dark"
                  key={i}
                >
                  {contributor.name}
                </p>
              )
            )}
          </div>
        </div>
      </section>

      <ReadMore
        title={props.content.readMore.title}
        link={props.content.readMore.link}
      /> */}
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
        professionalLinks
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
        organization
        organizationLink
        description {
          description
        }
      }
      designAdvisorsTitle
      designAdvisors {
        name
        title
        photo {
          file {
            url
          }
        }
        description {
          description
        }
      }
      otherContributorsTitle
      otherContributors {
        name
      }
      readMore {
        title
        link
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
