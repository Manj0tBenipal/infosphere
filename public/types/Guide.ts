export interface Guide {
  title: string;
  content: string;
  date: string;
  userId: string;
  source: Source[] | null;
  img: Image;
}
export interface Image {
  id: string | null;
  url: string | null;
}
export interface User {
  userId: string;
  username: string;
  avtURL: string;
}
export interface Source {
  name: string;
  url: string;
}
