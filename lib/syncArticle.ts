"use server";

import { randomUUID } from "crypto";
import { db, guidesCollection } from "@/lib/firebase";
import { Guide, Image } from "@/public/types/Guide";

import { storageBucket } from "./firebase";
import { getDownloadURL } from "firebase-admin/storage";
import { API_RES } from "@/public/types/API";

/**
 * Syncs the contents of guide from the client-side to Database using server action
 * WARNING: only suppports upto 1mb bdy size
 *@param data
 * The function is not executed if:
 * 1. The articleData keeps changing at a frequency of every 4 seconds or less
 * 2. The data reamains unchanged after the most recent push to the database
 */
export async function syncData_SA(data: Guide) {
  const res = new API_RES();
  console.log(`Updating: Document with id ${data.id}`);
  if (data?.id) {
    try {
      const docRef = db.doc(`guides/${data.id}`);
      await docRef.set(
        {
          ...data,
          date: new Date().toUTCString(),
        },
        { merge: true }
      );
      res.success = true;
      return JSON.stringify(res);
    } catch (err) {
      res.success = false;
      res.err = (err as string).toString();
      return JSON.stringify(res);
    }
  } else {
    console.log("Failed to sync Data");
    res.success = false;
    res.err = "Document id is invalid";
    return JSON.stringify(res);
  }
}

/**
 * This function creates a new document in "articles" collection.
 * It is executed when the user clicks on the button to create a new Guide
 * The id is passed as  a searchParam to the page where user edits the document
 * @returns id of the newly generated article from firestore
 */
export async function generateNewArticle() {
  const res = new API_RES();
  try {
    const blankGuide = { title: "" };
    const { id } = await guidesCollection.add({ ...blankGuide });
    if (id === undefined) {
      throw new Error("Failed to create a new Guide!");
    }
    if (id) {
      res.res = { id: id };
      res.success = true;
      return JSON.stringify(res);
    } else {
      throw new Error("Failed to create new Document");
    }
  } catch (err) {
    res.success = false;
    res.err = (err as string).toString();
    return JSON.stringify(res);
  }
}

/**
 * Uploads the image which is to be used as  cover image of guide to firebase storage
 * the download URL for the image from the firebase storage isincluded in the reponse
 * @param data The image in included as a FormData Object
 * @returns API_RES containing status, errors and data
 */
export async function uploadImage(data: FormData) {
  const res = new API_RES();
  try {
    if (data) {
      const file = data.get("img") as File;
      const filename = `guides/cover/${randomUUID() + file.name}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      const fileRef = storageBucket.file(filename);
      const up = await fileRef.save(buffer);

      const url = await getDownloadURL(fileRef);
      res.success = true;
      res.res = { img: { url: url, id: filename } };
      return JSON.stringify(res);
    } else {
      throw new Error("No file Provided");
    }
  } catch (err) {
    res.success = false;
    res.err = (err as string).toString();
    return JSON.stringify(res);
  }
}

/**
 * Deletes a Guide and the coverImg associated with that Guide from
 * firestore and firebase storage
 * @param guideId
 * @param imgPath
 * @returns API_RES
 */
export async function deleteGuide(guideId: string, imgPath: string | null) {
  const res = new API_RES();
  try {
    if (imgPath) {
      const imgRef = storageBucket.file(imgPath);
      imgRef.delete();
    } else {
      console.log("No image was uploaded!");
    }
    const guideRef = db.doc(`guides/${guideId}`);
    await guideRef.delete();
    res.success = true;
    return JSON.stringify(res);
  } catch (err) {
    res.err = (err as string).toString();
    res.success = false;
    console.log("Failed to delete the data");
    return JSON.stringify(res);
  }
}
