import React from 'react'
import { LearningArticleFooter } from './article-footer';
import Layout from '../layout';
import { Link } from 'gatsby';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import '../../styles/resources.scss' 

type Props = {
    pageContext: { 
        content: any,
        learningCenterCta: any,
        justFixCta: any 
    }
}

/* 

GraphQL Content:

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
slug
title
subtitle {
    json
}
previewText {
    previewText
}
author
dateUpdated
categories {
    title
    description
    slug
}
articleSections {
    __typename
    ... on ContentfulLearningArticleCtaBlock {
        title
        subtitle
        ctaText
        ctaLink
    }
    ... on ContentfulLearningArticleSection {
        title
        content {
            json
        }
}
*/

const renderSection = (articleSection: any, i: number) =>
    (articleSection.__typename === "ContentfulLearningArticleCtaBlock" ? 
        <div key={i} className="article-section">
            <div className="content cta has-text-centered has-background-primary">
                <h1 className="title is-size-4 has-text-weight-bold has-text-white is-spaced">
                    {articleSection.title}
                </h1>
                <p className="has-text-weight-medium has-text-white is-spaced">
                    {articleSection.subtitle}
                </p>
                <a href={articleSection.ctaLink} className="button is-medium is-primary is-inverted is-outlined" target="_blank" rel="noopener noreferrer">
                    {articleSection.ctaText}
                </a>
            </div>
        </div> :
        <div key={i} className="article-section">
            <div className="content ">
                <h1 className="title is-size-2 has-text-grey-dark has-text-weight-semibold is-spaced">
                    {articleSection.title}
                </h1>
                <span className="has-text-grey-dark">
                    {documentToReactComponents(articleSection.content.json)}
                </span>
            </div>
        </div>
    )

const LearningArticle = (props: Props) => {
    const content = props.pageContext.content;
    return (
        <Layout metadata={content.metadata}>
            <div className="article-page">
                <div className="columns is-desktop">
                    <div className="column">
                        First column
                    </div>
                    <div className="column is-half-desktop">
                        <div className="hero is-white">
                            <div className="hero-body">
                                <nav className="breadcrumb" aria-label="breadcrumbs">
                                    <ul>
                                        <li><Link to="/">JustFix.nyc</Link></li>
                                        <li><Link to="/resources/">Resource Center</Link></li>
                                        <li><Link to={"/resources/category/" + content.categories[0].slug + "/"}>{content.categories[0].title}</Link></li>
                                    </ul>
                                </nav>
                                <div className="container content-wrapper">
                                    <h1 className="title is-size-1 has-text-grey-dark has-text-weight-semibold is-spaced">
                                        {content.title}
                                    </h1>
                                    <p className="subtitle is-size-6 has-text-grey-dark">
                                        <span className="is-size-5">Written by {content.author}</span> 
                                            <br/>
                                        <span className="is-size-7">Updated {content.dateUpdated}</span> 
                                    </p>
                                    <span className="is-size-6 has-text-grey-dark">
                                        {documentToReactComponents(content.subtitle.json)}
                                    </span>
                                </div>
                            </div>
                            <div className="hero-body">
                                <div className="container content-wrapper">
                                    {(content.articleSections).map(
                                        (articleSection: any, i: number) => renderSection(articleSection, i)
                                    )}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="column">
                        Third column
                    </div>
                </div>
                <LearningArticleFooter />
            </div>
        </Layout>
        
    )
} 

export default LearningArticle;