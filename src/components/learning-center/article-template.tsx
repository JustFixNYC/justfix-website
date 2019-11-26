import React from 'react'
import { LearningArticleFooter } from './article-footer';

type Props = {
    pageContext: { 
        content: any,
        learningCenterCta: any,
        justFixCta: any 
    }
}

const LearningArticle = (props: Props) => {
    const content = props.pageContext.content;
    return (
        <div>Article: {content.title} 
            <LearningArticleFooter />
        </div>
        
    )
} 

export default LearningArticle;