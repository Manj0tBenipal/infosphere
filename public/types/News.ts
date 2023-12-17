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
  newsArticles: NewsOverview;
  nextPage: boolean;
  nextPageId: string;
}
export interface NewsOverview {
  title: string;
  img: string;
  category: string[];
}
