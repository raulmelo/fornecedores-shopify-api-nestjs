export interface ShopifySmartCollectionTypes {
  body_html: string;
  title: string;
  handle: string;
  image: any;
  rules: {
    column: 'vendor';
    relation: 'equals';
    condition: string;
  }[];
}