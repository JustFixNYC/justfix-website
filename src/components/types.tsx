
export type ContentfulContent = {
    content: any
    locale?: string
  }

export type HomepageProps = ContentfulContent & { enableDDO?: Boolean }