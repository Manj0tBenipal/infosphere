import { Guide } from "@/public/types/Guide";
import NewGuideButton from "./NewGuideButton";

import { API_RES } from "@/public/types/API";
import CardComponent from "@/components/guides/Card";

export const dynamic = "force-dynamic";
export default async function page() {
  const response = await fetch(`${process.env.APP_URL}/api/guides`);
  const { res, err } = (await response.json()) as API_RES;
  const guideCards = !err
    ? res.map((guide: Guide) => {
        return <CardComponent key={guide.id} data={guide} />;
      })
    : null;

  return (
    <div
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
    </div>
  );
}
