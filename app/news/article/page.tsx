export default async function page({
  searchParams,
}: {
  searchParams: { articleId: string; ref: string };
}) {
  const res = fetch(
    `${process.env.APP_URL}/api/news/newsdata/read?ref=${
      searchParams.ref === "headline" ? "headlines" : ""
    }${searchParams.ref === "search" ? "search" : ""}&articleId=${
      searchParams.articleId
    }`
  );
  return (
    <article>
      <h1 className="fontXL"></h1>
    </article>
  );
}
