export interface Guide {
  id: string;
  title: string;
  content: string;
  date: string;
  userId: string;
  source: Source[] | null;
  img: Image;
  isPublic: boolean;
}
export interface Image {
  id: string;
  url: string;
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
