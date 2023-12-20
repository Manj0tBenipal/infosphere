import FullArticle from "@/public/types/News";
import styles from "@/styles/news.module.css";
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
  const res = await fetch(url, { next: { revalidate: 0 } });
  const data = await res.json();
  const article = data.data as FullArticle;
  //Splitting the paragraph returned by API into lines
  const lines: string[] = article.content.split(".");
  //Keeping tracks of lines joined into paragraphs
  let coveredTillLine = 0;
  //Generating a paragraph from every 4 lines
  let paras: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    if (i > 0 && i % 3 === 0) {
      paras.push(lines.slice(coveredTillLine, i).join(". ")); //Joining the lines into a paragraph
      coveredTillLine = i;
    }
  }
  //Adding the remaining lines as a paragraph
  paras.push(lines.slice(coveredTillLine, lines.length).join(". "));

  if (!data.found) return <h1>The article has been moved or is deleted</h1>;
  return (
    <main
      className={`${styles.newsWrapper} flex flex-center flex-column flex-gap-1`}
    >
      <h1 className="fontL">{article.title}</h1>
      <img src={article.img} alt="Image" className={`${styles.coverImage}`} />
      <p className={`italic`}>
        <i>
          &quot;
          {article.description}&quot;
        </i>
      </p>

      <article className={`${styles.article}`}>
        <span>
          {`${article.creator ? article.creator : ""} 
        ${article.pubDate} `}
          :
          {paras.map((para: string, i: number) => (
            <p className={`${styles.newsPara}`} key={i}>
              {para}
            </p>
          ))}
        </span>
      </article>
    </main>
  );
}
