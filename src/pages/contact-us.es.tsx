import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { ContactPageScaffolding } from "./contact-us.en";

const ContactPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "es") {
        ...ContactPage
      }
    `}
    render={(data) => (
      <ContactPageScaffolding content={data.contentfulContactPage} />
    )}
  />
);

export default ContactPage;
