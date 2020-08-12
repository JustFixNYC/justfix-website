import React from "react";
import { Trans } from "@lingui/macro";
import Layout from "../components/layout";
import { withI18n } from "@lingui/react";
import { useCurrentLocale } from "../util/use-locale";
import { StringLocales } from "./index.en";

export const NotFoundPage = withI18n()(() => {
  // TO DO: Fix this forced typing here:
  const locale = useCurrentLocale() as StringLocales;
  return (
    <Layout metadata={{ title: "Page Not Found" }} locale={locale}>
      <section className="hero is-large has-background-info">
        <div className="hero-body has-text-centered">
          <h1 className="title has-text-danger is-uppercase">
            <Trans>Not found</Trans>
          </h1>
          <p className="subtitle has-text-white">
            <Trans>
              You just found a page that doesn&#39;t exist... the sadness.
            </Trans>
          </p>
        </div>
      </section>
    </Layout>
  );
});
export default NotFoundPage;
