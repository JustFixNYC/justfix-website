import * as contentful from 'contentful';
import * as rtt from '@contentful/rich-text-types';

const SPACE_ID = process.env.SPACE_ID || '';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || '';

type LearningArticlePage = {
  slug: string,
  title: string,
  categories: contentful.Entry<LearningCenterCategory>[],
  previewText: string,
  author: string,
  dateUpdated: string,
  articleSections: contentful.Entry<LearningArticleSection>[]
};

type LearningArticleSection = {
  title: string,
  content: rtt.Document,
};

type LearningCenterCategory = {
  title: string,
  description: string,
  slug: string,
};

export async function build() {
  const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
  });

  const entries = await client.getEntries<LearningArticlePage>({
    'content_type': 'learningArticlePage'
  });

  entries.items.forEach(entry => {
    console.log(`TODO: Add '${entry.fields.title}' to search index.`);
    entry.fields.articleSections.forEach(section => {
      console.log(`  TODO: Add section '${section.fields.title}' to search index.`);
    });
  });

  console.log("TODO: Export search index to JSON.");
};
