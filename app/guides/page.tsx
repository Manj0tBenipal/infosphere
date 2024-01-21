import { Guide } from "@/public/types/Guide";
import NewGuideButton from "./NewGuideButton";

import { API_RES } from "@/public/types/API";
import CardComponent from "@/components/guides/Card";

export default async function page() {
  //Requests are cached for 1 day unless the path is revalidated when a user deletes or adds a new guide
  const response = await fetch(`${process.env.APP_URL}/api/guides`, {
    next: { revalidate: 86400 },
  });
  const { res, err } = (await response.json()) as API_RES;
  const guideCards = !err
    ? res.map((guide: Guide) => {
        return <CardComponent key={guide.id} data={guide} />;
      })
    : null;

  return (
    <main
      style={{ minHeight: "100vh" }}
      className="flex flex-column wrapper flex-gap-2"
    >
      <div className="flex">
        <NewGuideButton />
      </div>

      {err ? (
        <div>
          <h2>Failed to fetch Guides!</h2>
        </div>
      ) : (
        <div>{guideCards}</div>
      )}
    </main>
  );
}
