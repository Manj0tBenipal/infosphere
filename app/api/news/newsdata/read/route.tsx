export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const params: {
    ref: string | null;
    articleId: string | null;
    page: string | null;
    keywords: string | null;
  } = {
    ref: searchParams.get("ref"),
    articleId: searchParams.get("articleId"),
    page: searchParams.get("page"),
    keywords: searchParams.get("keywords"),
  };

  let url = `${process.env.APP_URL}/api/news/newsdata/`;
  if (params.ref === "search") {
    url += "search";
    if (params.keywords) {
      url += "?keywords=" + params.keywords;
    }
    if (params.page) {
      url += "&page=" + params.page;
    }
  } else if (params.ref === "headlines") {
    url += "headlines";
  }

  const res = await fetch(url, { next: { revalidate: 4000 } });
  const data = await res.json();
  console.log(data);
  const articleIndex = data.newsArticles.findIndex((article: any) => {
    console.log(params.articleId, article.articleId);
    return params.articleId === article.articleId;
  });

  if (articleIndex === -1) return Response.json({ found: false });
  else {
    return Response.json({
      found: true,
      data: data.newsArticles[articleIndex],
    });
  }
}
