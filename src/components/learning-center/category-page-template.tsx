import React from 'react'
import Layout from '../layout';
import { ArticlePreviewCard } from '../../pages/resources';
import { Link } from 'gatsby';
import { ThankYouBanner } from './thank-you-banner';

type Props = {
    pageContext: { 
        content: any,
        articlePreviews: any 
    }
}

const NoArticlesYet = () => (
    <section className="hero is-small is-white">
        <div className="hero-body has-text-centered is-horizontal-center">
            <div className="container content-wrapper tight">
                <h6 className="is-size-4">
                    <span className="has-text-danger">No articles yet!</span> Check back soon for an update. 
                </h6>
            </div>
        </div>
    </section>
    )


const LearningCategoryPage = (props: Props) => {
    const content = props.pageContext.content;
    const articlePreviews = props.pageContext.articlePreviews;
    return (
        <Layout metadata={{title: content.title }}>
            <div id="resources" className="resources-page" >
            <section className="hero is-small is-white">
                <div className="hero-body has-text-centered is-horizontal-center">
                    <div className="container content-wrapper tight">
                        <h1 className="title is-size-2 has-text-grey-dark has-text-weight-normal is-spaced">
                        {content.title}
                        </h1>
                        <h6 className="subtitle has-text-grey-dark is-italic">
                        {content.description}
                        </h6>
                        <Link to="/resources" className="has-text-weight-semibold">
                            Back to overview page
                        </Link>
                    </div>
                </div>
            </section>
            <section className="content-wrapper tight">
                {articlePreviews && articlePreviews.length > 0 ? 
                    (articlePreviews).map(
                        (article: any, i: number) => <ArticlePreviewCard articleData={article} key={i} />
                    ):
                    <NoArticlesYet />
                }
            </section>
            <ThankYouBanner />
            </div>
        </Layout>
    )
} 

export default LearningCategoryPage;