
export type Locale = {
  locale?: "es" | null
}

export type ContentfulContent = Locale & { 
  content: any 
}

export type HomepageProps = ContentfulContent & { 
  enableDDO?: Boolean 
}