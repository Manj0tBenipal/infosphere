"use server";

import { API_RES } from "@/public/types/API";
import { revalidatePath } from "next/cache";

export async function revalidate(path: string) {
  const res = new API_RES();
  try {
    if (path.length > 1) {
      revalidatePath(path);
      res.success = true;
      console.log("Successfully revalidated:" + path);
    } else {
      throw new Error("Invalid Path");
    }
  } catch (err) {
    res.success = false;
    res.err = (err as string).toString();
  } finally {
    return JSON.stringify(res);
  }
}
