import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { SocialIcon } from 'react-social-icons';
import ReadMoreReact from 'read-more-react';
// import { Link } from 'gatsby'

import '../../styles/team.scss' 

import Layout from '../../components/layout'
import ReadMore from '../../components/read-more'

const TeamPageScaffolding = (props) => 
  (<Layout metadata={props.content.metadata}>

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
          { (props.content.teamMembers).map( (member, i) =>
            (<div className="column team-member is-one-third has-text-centered " key={i}>
              <figure className="image is-128x128 is-horizontal-center">
                <img className="is-rounded" src={ member.photo.file.url } alt={member.name} />
              </figure>
              
              <h4 className="title is-size-5 has-text-grey-dark">{member.name}</h4>
              <h4 className="subtitle is-size-5 has-text-grey-dark">{member.title}</h4>
              <div className="field">
                  { (member.childrenContentfulTeamMemberLinksJsonNode).map ( (link, i) => 
                    <SocialIcon key={i} url={link.url} target="_blank" rel="noopener noreferrer" bgColor="#0096D7" style={{ height: 40, width: 40 }} />
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

        { (props.content.directors).map( (director, i) =>
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
                <a href={ director.childrenContentfulTeamMemberLinksJsonNode.length && director.childrenContentfulTeamMemberLinksJsonNode[0].url } target="_blank" rel="noopener noreferrer">
                  {director.childrenContentfulTeamMemberLinksJsonNode[0].title}
                </a>
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
              { (props.content.otherContributors).map( (contributor, i) =>
              (<p className="has-text-weight-semibold has-text-grey-dark" key={i}>
                {contributor.link ? 
                (<a href={contributor.link} target="_blank" rel="noopener noreferrer">{contributor.name}</a>) :
                (<span>{contributor.name}</span>)}
              </p>) ) 
            }
          </div>
        </div>

      </section>

      <ReadMore title="View our products." link="/#products" />

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
              file {
                url
              }
            }
            childrenContentfulTeamMemberLinksJsonNode {
              url
              type
            }
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
            childrenContentfulTeamMemberLinksJsonNode {
              title
              url
            }
            description {
              description
            } 
          }
          otherContributorsTitle
          otherContributors {
            name
            link
          }
        }
      }
    `}
  render = {data => (<TeamPageScaffolding content={data.contentfulTeamPage} />)}
  />
);

export default TeamPage;
