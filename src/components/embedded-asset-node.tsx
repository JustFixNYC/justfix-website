import React from 'react';
import { NodeData } from "@contentful/rich-text-types";

const IMAGE_CONTENT_TYPE_RE = /^image\//;

const DEFAULT_LOCALE = 'en-US';

/**
 * A data type mapped by different locales, so that e.g.
 * 'en-US' might have one value of the data type, while
 * 'es' might have another.
 */
type LocaleMapped<T> = {
  [locale: string]: T|undefined,
};

/**
 * Part of Contentful's rich text node, describing file metadata about an
 * embedded asset.
 */
type FileInfo = {
  url: string,
  details: {
    size: number,
    image: {
      width: number,
      height: number,
    },
  },
  fileName: string,
  contentType: string,
};

/**
 * A Contentful rich text node describing an embedded assset.
 * 
 * I'm not sure why this isn't already defined by @contentful/rich-text-types...
 */
export type EmbeddedAssetNode = {
  data: NodeData & {
    target?: {
      fields: {
        title: LocaleMapped<string>,
        description: LocaleMapped<string>,
        file: LocaleMapped<FileInfo>,
      }
    }
  }
};

/**
 * Renders an embedded asset in Contentful rich text.
 * 
 * This ought to be supported out-of-the-box by Contentful's rich text package,
 * but it's not at the time of this writing: https://github.com/contentful/rich-text/issues/61
 */
export const EmbeddedAsset: React.FC<{
  node: EmbeddedAssetNode,
  locale: string,
  className?: string,
}> = ({node, locale, className}) => {
  if (!node.data.target) {
    throw new Error('No "target" on embedded asset node!');
  }
  const { fields } = node.data.target;
  const altText = fields.description[locale] || fields.description[DEFAULT_LOCALE] || '';
  const file = fields.file[locale] || fields.file[DEFAULT_LOCALE];
  if (!file) {
    throw new Error('No file information on embedded asset node!');
  }
  if (!IMAGE_CONTENT_TYPE_RE.test(file.contentType)) {
    throw new Error(`Unsupported embedded asset content type: ${file.contentType}`);
  }

  return <img src={file.url} className={className} width={file.details.image.width} height={file.details.image.height} alt={altText} />;
};
