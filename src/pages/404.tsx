import React from 'react'
import Layout from '../components/layout'

const NotFoundPage = () => (
  <Layout metadata={{title:"Page Not Found"}}>
    <section className="hero is-large has-background-info">
      <div className="hero-body has-text-centered">
        <h1 className="title has-text-danger">NOT FOUND</h1>
        <p className="subtitle has-text-white">You just found a page that doesn&#39;t exist... the sadness.</p>
      </div>
    </section>
    
  </Layout>
)

export default NotFoundPage
