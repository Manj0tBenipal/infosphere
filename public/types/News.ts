export interface Headline {
  img: string;
  id: string;
  title: string;
}
export interface ExternalHeadline {
  img: string;
  url: string;
  title: string;
  source: string;
}
export interface NewsSearch {
  newsArticles: NewsOverview[];
  nextPage: boolean;
  nextPageId: string;
}
export interface NewsOverview {
  articleId: string;
  title: string;
  img: string;
  description: string;
  category: string[];
}
export default interface FullArticle {
  articleId: string;
  title: string;
  link: string;
  creator: string;
  description: string;
  content: string;
  pubDate: string;
  img: string;
  source: string;
  country: string[];
  category: string[];
  language: string;
}
