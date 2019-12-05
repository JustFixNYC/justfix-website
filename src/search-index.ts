import * as contentful from 'contentful';
import * as rtt from '@contentful/rich-text-types';
import lunr from 'lunr';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const { isBlock, isInline, isText } = rtt.helpers;

const SPACE_ID = process.env.SPACE_ID || '';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || '';
const INDEX_JSON_PATH = path.join(__dirname, 'lunr-index.json');

export type SearchIndexMetadataEntry = {
  slug: string,
  title: string,
};

export type SearchIndex = {
  lunrIndex: any,
  metadata: SearchIndexMetadataEntry[],
};

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
  content?: rtt.Document,
};

type LearningCenterCategory = {
  title: string,
  description: string,
  slug: string,
};

function extractPlaintext(node: rtt.Node, words: string[] = []): string[] {
  if (isBlock(node) || isInline(node)) {
    node.content.forEach(child => {
      extractPlaintext(child, words)
    });
  } else if (isText(node)) {
    words.push(node.value);
  } else {
    throw new Error('Encountered a node that is not block, inline, or text!');
  }

  return words;
}

export async function build() {
  let lunrIndex: lunr.Index;
  const indexMetadata: SearchIndexMetadataEntry[] = [];

  if (SPACE_ID && ACCESS_TOKEN) {
    const client = contentful.createClient({
      space: SPACE_ID,
      accessToken: ACCESS_TOKEN
    });

    const entries = await client.getEntries<LearningArticlePage>({
      'content_type': 'learningArticlePage'
    });

    lunrIndex = lunr(function() {
      // It seems like lunr supports boosting of individual fields with the
      // 'boost' attribute: https://lunrjs.com/docs/lunr.Builder.html
      this.ref('id');
      this.field('title', { boost: 3 });
      this.field('sections', { boost: 2 });
      this.field('content', { boost: 1 });

      entries.items.forEach(entry => {
        const id = entry.fields.slug;
        const title = entry.fields.title;
        const sections: string[] = [];
        const content: string[] = [];

        indexMetadata.push({
          slug: id,
          title
        });
        entry.fields.articleSections.forEach(section => {
          sections.push(section.fields.title);
          if (section.fields.content) {
            content.push.apply(content, extractPlaintext(section.fields.content));
          }
        });

        console.log(`Indexing '${id}'.`);
        this.add({
          id,
          title,
          sections: sections.join(' '),
          content: content.join(' '),
        });
      });
    });
  } else {
    console.log("SPACE_ID and ACCESS_TOKEN aren't set; outputting an empty search index.");

    lunrIndex = lunr(() => {});
  }

  const searchIndex: SearchIndex = {
    lunrIndex: lunrIndex.toJSON(),
    metadata: indexMetadata
  };
  const json = Buffer.from(JSON.stringify(searchIndex), 'utf-8');
  const gzipped = zlib.gzipSync(json);
  const size = `${json.length} bytes uncompressed, ${gzipped.length} bytes gzipped`;
  console.log(`Created search index (${size}).`);
  console.log(`Exporting search index to ${INDEX_JSON_PATH}.`);
  fs.writeFileSync(INDEX_JSON_PATH, json);
};
