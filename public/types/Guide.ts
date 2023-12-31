export interface Guide {
  title: string;
  content: string;
  date: string;
  userId: string;
  source: Source[] | null;
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