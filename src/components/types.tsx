
export type Locale = {
  locale?: string
}

export type ContentfulContent = Locale & { 
  content: any 
}

export type HomepageProps = ContentfulContent & { 
  enableDDO?: Boolean 
}