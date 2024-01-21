import { guidesCollection } from "@/lib/firebase";
import { API_RES } from "@/public/types/API";
import { Guide } from "@/public/types/Guide";
/**
 * Stop Nextjs from generating this route statically
 * Since fetch is not used here nor any revalidate options that come with it,
 * NextJS will statically fetch the data and use it
 *
 * Caching is not needed in this route as the page requesting this route will cache the data
 */
export const dynamic = "force-dynamic";
export async function GET() {
  const response = new API_RES();
  try {
    const querySnapshot = await guidesCollection.get();
    const guidesArr: Guide[] = querySnapshot.docs.map((doc) => {
      return { ...doc.data() } as Guide;
    });

    response.res = guidesArr;
    return Response.json(response);
  } catch (err) {
    response.err = (err as string).toString();
    return Response.json(response);
  }
}
