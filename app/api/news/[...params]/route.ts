import { request } from "http";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("headlines")) {
    const gNews = fetch(
      `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=${process.env.GNEWS_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => data);

    return Response.json(gNews);
  }
}
