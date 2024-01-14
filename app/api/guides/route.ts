import { guidesCollection } from "@/lib/firebase";
import { API_RES } from "@/public/types/API";
import { Guide } from "@/public/types/Guide";

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
