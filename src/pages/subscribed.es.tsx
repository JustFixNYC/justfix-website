import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { SubscribedPageScaffolding } from "./subscribed.en";

const SubscribedPage = () => (
  <StaticQuery
    query={graphql`
      query($locale: String! = "es") {
        ...SubscribedPage
      }
    `}
    render={(data) => (
      <SubscribedPageScaffolding
        content={data.contentfulSubscriptionConfirmationPage}
        locale="es"
      />
    )}
  />
);

export default SubscribedPage;
