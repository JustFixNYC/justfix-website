import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { SocialIcon } from 'react-social-icons';
// import { Link } from 'gatsby'

import '../../styles/index.scss' 

import Layout from '../../components/layout'

const TeamPageScaffolding = (props) => 
  (<Layout>

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
                    <SocialIcon url={link.url} bgColor="#0096D7" style={{ height: 40, width: 40 }} />
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

      <section className="content-wrapper directors">

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
              <p>{director.description.description}</p>
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
                (<a href={contributor.link} target="_blank">{contributor.name}</a>) :
                (<span>{contributor.name}</span>)}
              </p>) ) 
            }
          </div>
        </div>

      </section>



    {/*

      <section className="gray_bg">
        <div className="justify_content_center_vertically-sm">
          <h3 className="center">{props.content.otherContributorsTitle}</h3>
          { (props.content.otherContributors).map( (contributor, i) =>
            (<p className="contributor" key={i}>
              {contributor.link ? 
              (<a href={contributor.link} target="_blank">{contributor.name}</a>) :
              (<span>{contributor.name}</span>)}
            </p>) ) 
          }
        </div>
      </section> */}

      {/* <section className="milestones no-margin-bottom">
        <div className="container" ng-bind-html="$contentfulEntry.fields.milestones | markdown">
        </div>
        <div className="logos container">
          <span
            className="logo"
            ng-repeat="sponsor in $contentfulEntry.fields.sponsorOrganizations track by $index">
            <a ng-href="{sponsor.fields.link}" target="_blank">
              <div
                className="background-image"
                ng-style="{'background-image': 'url(' + sponsor.fields.logo.fields.file.url + ')'}">
              </div>
            </a>
          </span>
        </div>
      </section>

      <section className="baker reduced-margin">
        <div className="container">
          <div className="baker-thanks">
            <h3>{$contentfulEntry.fields.bakerThanks}</h3>
          </div>
          <div className="baker-logo">
            <a href="https://www.bakerlaw.com/" target="_blank">
              <img ng-src="{ $contentfulEntry.fields.bakerLogo.fields.file.url }" alt="Baker Logo" />
            </a>
          </div>
        </div>
      </section> */}

    </div>
</Layout>); 


const TeamPage  = () => (
<StaticQuery
    query={graphql`
      query {
        contentfulTeamPage {
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
