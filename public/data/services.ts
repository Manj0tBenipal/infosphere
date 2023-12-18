import { Service } from "../types/Service";
export const services: Service[] = [
  {
    name: "Real time Weather",
    details: "Get real time weather data from OpenWeatherMap API",
    image: "/svg/weather.svg",
    link: "/weather",
  },
  {
    name: "Latest News",
    details: "Get latest news from various open source news APIs",
    image: "/svg/news.svg",
    link: "/news",
  },
  {
    name: "Sports",
    details: "Get real time scores of sports events all over the world",
    image: "/svg/sports.svg",
    link: "/sports",
  },
];
