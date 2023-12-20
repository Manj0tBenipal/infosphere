export default async function page({
  searchParams,
}: {
  searchParams: {
    articleId: string;
    ref: string;
    page: string | undefined;
    keywords: string;
  };
}) {
  // Includes reference to the source of the request the page if the source is the search page
  // or the headline page
  //These parameters are used to replicate the original URL and find the cached request
  //The articleId is used to find the data returned by that request
  //Cached request can be used in the new route hanlder to find the data
  let url = `${process.env.APP_URL}/api/news/newsdata/read`;
  if (searchParams.ref === "search") {
    url += `?ref=search&keywords=${searchParams.keywords}`;

    if (searchParams.page) {
      url += "&page=" + searchParams.page;
    }
  } else if (searchParams.ref === "headlines") {
    url += `?ref=headlines`;
  }
  url += `&articleId=${searchParams.articleId}`;
  const res = await fetch(url, { next: { revalidate: 1 } });
  const data = await res.json();
  console.log(data);
  return (
    <article>
      <h1 className="fontXL"></h1>
    </article>
  );
}
