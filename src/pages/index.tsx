import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { StaticQuery, graphql } from 'gatsby'
// import { Link } from 'gatsby'


import Layout from '../components/layout'

const LandingPage  = () => (
<StaticQuery
    query={graphql`
      query {
      }
    `}
  render = {data => (<Layout>
    {/* <div id="home" className="home-page" contentful-entry="'content_type=homePage'">

      <section className="img-bg hero">
        <article className="container">
          <div className="hero-container">
            <h1>{{ $contentfulEntry.fields.heroCopy }}</h1>
            <p className="subcopy hidden-mobile">{{$contentfulEntry.fields.subCopy}}</p>

            <a href="#" scroll-to="products" className="btn btn-outline">
              LEARN MORE
            </a>
          </div>
          <div className="clearfix"></div>
        </article>

      </section>

      <section className="container white padding-section-reduced home-content-blocks" id="products">

        <h1 className="text-center">Our Products & Services</h1>

        <div className="row" ng-repeat="entry in $contentfulEntry.fields.homePageProductBlocks track by $index">
            <div className="col-sm-6 col-xs-12" ng-className="{ 'col-sm-push-6': $index % 2 == 0 }">
              <img ng-src="{{entry.fields.screenshot.fields.file.url}}" />
            </div>
            <div className="col-sm-6 col-xs-12" ng-className="{ 'col-sm-pull-6': $index % 2 == 0 }">
              <div className="product-content-block">
                <h3>{{entry.fields.title}}</h3>
                <p>{{entry.fields.description}}</p>
                <a className="btn btn-primary btn-block" href="{{entry.fields.cta.url}}?utm_source=orgsite" target="_blank">{{entry.fields.cta.title}}</a>
              </div>
            </div>
        </div>

      </section>
      <section className="justfix-blue no-margin center white padding-section-reduced " id="rental-history">
        <div className="container">
          <h3>Want your apartment’s Rental History?</h3>
          <p>This can help you find out if you are being overcharged on rent. Text <span className="semi-bold">“RENT HISTORY”</span> to (646) 783-0627 and get your Rental History from the DHCR in the mail — <i>¡Tambien disponible in Español!</i></p>
        </div>
      </section>
      <section className="video_unit padding-section-reduced gray_bg">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1 className="video_unit-title">{{$contentfulEntry.fields.videoUnit.fields.title}}</h1>
            </div>
          </div>
          <div className="row align_items_end-sm">
            <div className="col-sm-8">
              <div className="video_wrapper_16_9">
                <iframe className="video_wrapper_16_9-video" src="https://www.youtube.com/embed/QsRq3OWNkgY?rel=0&amp&autoplay=0&playsinline=1&modestbranding=1;showinfo=0" allow="autoplay; encrypted-media"></iframe>
              </div>
            </div>
            <div className="col-sm-4">
              <p className="video_unit-caption">{{$contentfulEntry.fields.videoUnit.fields.caption}}</p>
              <a ui-sref="mission" className="btn btn-outline black video_unit-button">READ OUR MISSION</a>
            </div>
          </div>
        </div>
      </section>

      <section className="padding-section-reduced">
        <h1 className="center no-margin-bottom">{{$contentfulEntry.fields.pressTitle}}</h1>
        <div className="container logos logos--faded">
          <span
            className="logo"
            ng-repeat="pressLogo in $contentfulEntry.fields.pressLogos"
            >
            <div className="background-image"
              ng-style="{'background-image': 'url(' + pressLogo.fields.logo.fields.file.url + ')'}">
            </div>
          </span>
        </div>
      </section>

      </div> */}
  </Layout>
  )}
  />
);

export default LandingPage;
