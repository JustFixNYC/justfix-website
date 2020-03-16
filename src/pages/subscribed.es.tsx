import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { SubscribedPageScaffolding } from './subscribed';

const SubscribedPage  = () => (
<StaticQuery
  query={graphql`
    query ($locale: String! = "es") { ...SubscribedPageQuery }
  `}
  render = {data => (<SubscribedPageScaffolding content={data.contentfulSubscriptionConfirmationPage} locale="es" />)}
  />
);

export default SubscribedPage;