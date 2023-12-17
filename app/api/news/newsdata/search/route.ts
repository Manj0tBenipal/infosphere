import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const keywords: any = url.searchParams.get("keywords");
  const page: any = url.searchParams.get("page");
  const response = await fetch(
    `https://newsdata.io/api/1/news?apikey=${
      process.env.NEWSDATA_API_KEY
    }&image=1&language=en&qInTitle=${keywords}${
      //Checks if user has request for nextpage
      page !== null && "&page=" + page
    }`,
    {
      next: {
        //Data is revalidated after every 1hr
        revalidate: 4000,
      },
    }
  );

  const data = await response.json();
  return Response.json(data);
}
