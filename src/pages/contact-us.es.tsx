import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { ContactPageScaffolding } from './contact-us';

const ContactPage  = () => (
<StaticQuery
  query={graphql`
    query ($locale: String! = "es") { ...ContactPageQuery }
  `}
  render = {data => (<ContactPageScaffolding content={data.contentfulContactPage} locale="es" />)}
  />
);

export default ContactPage;
