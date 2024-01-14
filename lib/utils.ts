import { Guide } from "@/public/types/Guide";
import { syncData_SA } from "./syncArticle";
import { createHash } from "crypto";
import { API_RES } from "@/public/types/API";
const encoder = new TextEncoder();
/**
 * Used to choose whether to sync data using a server action or an API call
 * Server actions has a size limit. When the data is over 1mb the API call is made to sync data
 * If the encoder fails to determine the size the API call is resorted as default method of syncing
 *
 * @param data
 */
export async function sizeBasedUploadDecision(data: Guide): Promise<API_RES> {
  const res = new API_RES();
  let sizeInBytes = 0;
  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      try {
        sizeInBytes += encoder.encode(value).length;
      } catch (err) {
        console.log(err);
        //if an error occurs sduring size calculation, size is set to greater than 1000 which would resort to API
        //call for syncing data
        sizeInBytes += 1001;
      }
    }
  });
  try {
    if (sizeInBytes / (1024 * 1024) > 1) {
      await syncData_AR(data);
    } else {
      await syncData_SA(data);
    }
    res.success = true;
    return res;
  } catch (err) {
    res.success = false;
    res.err = (err as string).toString();
    return res;
  }
}

/**
 * used to compare the value stored in the state and the text editor to
 * decide whether to sync data with the database or not
 * @param inputString
 * @returns generated hash for the inputString
 */
export function getHash(inputString: string) {
  const input = inputString.toString().trim();
  const hash = createHash("sha256");
  hash.update(input);
  const hashedString = hash.digest("hex");
  return hashedString;
}

/**
 * Syncs the contents of guide from the client-side to Database using server action
 * WARNING: only suppports upto 1mb bdy size
 *@param data
 * If the state is unchanged for 4 seconds the data is pushed to the database
 *
 * The function is not executed if:
 * 1. The articleData keeps changing at a frequency of every 4 seconds or less
 * 2. The data reamains unchanged after the most recent push to the database
 */
export async function syncData_AR(data: Guide) {
  console.log(`Updating: Document with id ${data.id}`);
  try {
    if (data?.id) {
      const res = await fetch(`/api/guides/upload`, {
        body: JSON.stringify(data),
        method: "PUT",
      });
    } else {
      console.log("Failed to sync Data");
    }
  } catch (err) {
    console.log(err);
  }
}
