import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const keywords: any = request.body;
  const response = await fetch(
    `https://newsdata.io/api/1/news?apikey=${process.env.NEWSDATA_API_KEY}&image=1&language=en&q=${keywords}`
  );
  const data = await response.json();
  return Response.json(data);
}
