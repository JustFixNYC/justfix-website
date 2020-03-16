import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { PrivacyPolicyPageScaffolding } from './privacy-policy';

const PrivacyPolicyPage  = () => (
<StaticQuery
  query={graphql`
    query ($locale: String! = "es") { ...PrivacyPolicyQuery }
  `}
  render = {data => (<PrivacyPolicyPageScaffolding content={data.contentfulGenericPage} locale="es" />)}
  />
);

export default PrivacyPolicyPage;