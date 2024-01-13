import { API_RES } from "@/public/types/API";
import { Guide } from "@/public/types/Guide";
import { db } from "@/lib/firebase";
export async function PUT(request: Request) {
  const response = new API_RES();
  try {
    const data: Guide = await request.json();
    if (data?.id) {
      const docRef = db.doc(`guides/${data.id}`);
      await docRef.set(
        {
          ...data,
          date: new Date().toUTCString(),
        },
        { merge: true }
      );
    } else {
      console.log("Failed to sync Data");
    }
    response.res = { status: "success" };
  } catch (err) {
    response.err = (err as string).toString();
  } finally {
    return Response.json(response);
  }
}
