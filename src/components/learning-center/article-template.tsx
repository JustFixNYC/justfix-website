import React from 'react'
import { LearningArticleFooter } from './article-footer';
import Layout from '../layout';
import { Link } from 'gatsby';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import AnchorLink from 'react-anchor-link-smooth-scroll'

import '../../styles/resources.scss' 

type Props = {
    pageContext: { 
        content: any,
        learningCenterCta: any,
        justFixCta: any 
    }
}

type navMenuProps = {
    styleClass?: string
}


function makeSectionID(index: number): string {
    return "section-" + (index + 1).toString();
}

function renderSection(articleSection: any, i: number): JSX.Element {
    return (articleSection.__typename === "ContentfulLearningArticleCtaBlock" ? 
        <div key={i} id={makeSectionID(i)} className="article-section">
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
        <div key={i} id={makeSectionID(i)} className="article-section">
            <div className="content ">
                <h1 className="title is-size-2 has-text-grey-dark has-text-weight-semibold is-spaced">
                    {articleSection.title}
                </h1>
                <span className="has-text-grey-dark">
                    {documentToReactComponents(articleSection.content.json)}
                </span>
            </div>
        </div>
    );
}

const LearningArticle = (props: Props) => {
    
    const content = props.pageContext.content;

    const NavMenu = ( props?: navMenuProps ) => (
        <aside className={"menu " + ( props && props.styleClass || "")}>
            <p className="menu-label">
                Sections
            </p>
            <ul className="menu-list">
                {(content.articleSections).map( (articleSection: any, i: number) => 
                    <li key={i}>
                        <AnchorLink href={"#" + makeSectionID(i)} offset='50' className="has-text-primary">
                            {articleSection.title}
                        </AnchorLink>
                    </li>
                )}
                
            </ul>
        </aside>
    )

    return (
        <Layout metadata={content.metadata}>
            <div className="article-page">
                <div className="columns is-desktop">
                    <div className="column" />
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
                                <NavMenu styleClass="is-hidden-desktop" />
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
                        <NavMenu styleClass="sticky is-hidden-touch" />
                    </div>
                </div>
                <LearningArticleFooter />
            </div>
        </Layout>
        
    )
} 

export default LearningArticle;