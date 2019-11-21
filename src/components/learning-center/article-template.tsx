import React from 'react'

type Props = {
    pageContext: { content: any }
}

const LearningArticle = (props: Props) => {
    const content = props.pageContext.content;
    return (
        <div>Article: {content.title} </div>
    )
} 

export default LearningArticle;