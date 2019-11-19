import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { SocialIcon } from 'react-social-icons';
import ReadMoreReact from 'read-more-react';
// import { Link } from 'gatsby'

import '../../styles/team.scss' 

import Layout from '../../components/layout'
import ReadMore from '../../components/read-more'
import { ContentfulContent } from '../../components/types';

export const TeamPageScaffolding = (props: ContentfulContent) => 
  (<Layout metadata={props.content.metadata} locale={props.locale}>

    <div id="team" className="team-page">

      <section className="hero is-small is-white">

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
          { (props.content.teamMembers).map( (member: any, i: number) =>
            (<div className="column team-member is-one-third has-text-centered " key={i}>
              <figure className="image is-128x128 is-horizontal-center">
                <img className="is-rounded" src={ member.photo.fluid.src } alt={member.name} />
              </figure>
              
              <h4 className="title is-size-5 has-text-grey-dark">{member.name}</h4>
              <h4 className="subtitle is-size-5 has-text-grey-dark">{member.title}</h4>
              <div className="field">
                  {member.professionalLinks && (member.professionalLinks).map ( (link: any, i: number) => 
                    <SocialIcon key={i} url={link} target="_blank" rel="noopener noreferrer" bgColor="#0096D7" style={{ height: 40, width: 40 }} />
                  )}
              </div>
            <p>{member.description.description}</p>
          </div>) )
          }
        </div>

      </section>

      <section className="hero is-small is-white">

        <div className="hero-body has-text-centered is-horizontal-center">
          <div className="container">
            <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
            {props.content.directorsTitle}
            </h1>
          </div>
        </div>

      </section>

      <section className="content-wrapper tight directors">

        { (props.content.directors).map( (director: any, i: number) =>
          (<div className="columns" key={i}>
            <div className="column director is-one-quarter">
              <figure className="image is-128x128 is-pulled-right is-hidden-mobile">
                <img className="is-rounded" src={ director.photo.file.url } alt={director.name} />
              </figure>
              <figure className="image is-128x128 is-horizontal-center is-hidden-tablet">
                <img className="is-rounded" src={ director.photo.file.url } alt={director.name} />
              </figure>
            </div>
            <div className="column director is-three-quarters">
              <h4 className="title is-size-5 has-text-grey-dark has-text-centered-mobile">{director.name}</h4>
              <h4 className="subtitle is-size-5 has-text-grey-dark has-text-centered-mobile">
                {director.title + ', '} 
                {director.organizationLink ? 
                <a href={director.organizationLink} target="_blank" rel="noopener noreferrer">
                  {director.organization}
                </a> :
                <>{director.organization}</>}
              </h4>
                <ReadMoreReact text={(director.description.description)}
                  min={180}
                  ideal={250}
                  max={400}
                  readMoreText={' Read More'}/>
            </div>
          </div>) )
        }

      </section>

      <section className="is-horizontal-center hero is-small is-light">

        <div className="hero-body has-text-centered is-horizontal-center">
          <div className="container">
            <h1 className="title is-size-4 has-text-grey-dark has-text-weight-bold is-spaced">
            {props.content.otherContributorsTitle}
            </h1>
              { (props.content.otherContributors).map( (contributor: any, i: number) =>
              (<p className="has-text-weight-semibold has-text-grey-dark" key={i}>
                {contributor.link ? 
                (<a href={contributor.link} target="_blank" rel="noopener noreferrer">{contributor.name}</a>) :
                (<>{contributor.name}</>)}
              </p>) ) 
            }
          </div>
        </div>

      </section>

      <ReadMore title={props.content.readMore.title} link={props.content.readMore.link} />

    </div>
    
</Layout>); 


const TeamPage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulTeamPage {
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
              file {
                url
              }
            }
            organization
            organizationLink
            description {
              description
            } 
          }
          otherContributorsTitle
          otherContributors {
            name
            link
          }
          readMore {
            title
            link
          }
        }
      }
    `}
  render = {data => (<TeamPageScaffolding content={data.contentfulTeamPage} />)}
  />
);

export default TeamPage;
