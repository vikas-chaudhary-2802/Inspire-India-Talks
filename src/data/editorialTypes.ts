export interface ContentSource {
  title: string;
  url: string;
  publishedAt?: string;
  accessedAt?: string;
}

export interface EditorialImageMetadata {
  imageAlt?: string;
  imageCaption?: string;
  imageCredit?: string;
  imageSourceUrl?: string;
}
