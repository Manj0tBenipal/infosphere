export interface CreditHolder {
  name: string;
  img: string | null;
}
export const credits: CreditHolder[] = [
  {
    name: "NewsData.io",
    img: "https://newsdata.io/images/global/newsdata-icon.png",
  },
  {
    name: "GNews",
    img: "https://gnews.io/assets/images/logo-black.svg",
  },
  {
    name: "MediaStack.com",
    img: "https://mediastack.com/site_images/mediastack_logo_white.svg",
  },
  {
    name: "OpenMeteo.com",
    img: null,
  },
];
