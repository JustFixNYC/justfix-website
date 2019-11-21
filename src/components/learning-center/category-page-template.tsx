import React from 'react'

type Props = {
    pageContext: { 
        content: any,
        articlePreviews: any 
    }
}

const LearningCategoryPage = (props: Props) => {
    const content = props.pageContext.content;
    return (
        <div>Category: {content.title} </div>
    )
} 

export default LearningCategoryPage;