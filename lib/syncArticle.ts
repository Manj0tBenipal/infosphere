"use server";

import { randomUUID } from "crypto";
import { db, guidesCollection } from "@/lib/firebase";
import { Guide, Image } from "@/public/types/Guide";

import { storageBucket } from "./firebase";
import { getDownloadURL } from "firebase-admin/storage";

/**
 * Syncs the contents of guide from the client-side to Database using server action
 * WARNING: only suppports upto 1mb bdy size
 *@param data
 * The function is not executed if:
 * 1. The articleData keeps changing at a frequency of every 4 seconds or less
 * 2. The data reamains unchanged after the most recent push to the database
 */
export async function syncData_SA(data: Guide) {
  console.log(`Updating: Document with id ${data.id}`);
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
}

/**
 * This function creates a new document in "articles" collection.
 * It is executed when the user clicks on the button to create a new Guide
 * The id is passed as  a searchParam to the page where user edits the document
 * @returns id of the newly generated article from firestore
 */
export async function generateNewArticle(): Promise<string> {
  try {
    const blankGuide = { title: "" };
    const { id } = await guidesCollection.add({ ...blankGuide });
    if (id === undefined) {
      throw new Error("Failed to create a new Guide!");
    }
    return id;
  } catch (err) {
    throw new Error("Failed to  creat");
  }
}

/**
 *
 * @param data The image in included as a FOrmData Object
 * @returns the download URL for the image from the firebase storage
 */
export async function uploadImage(data: FormData): Promise<Image> {
  if (data) {
    const file = data.get("img") as File;
    const filename = `guides/cover/${randomUUID() + file.name}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const fileRef = storageBucket.file(filename);
    const up = await fileRef.save(buffer);

    const url = await getDownloadURL(fileRef);
    return { url: url, id: filename } as Image;
  } else {
    console.log("No file");
    return { id: null, url: null } as Image;
  }
}

export async function deleteGuide(guideId: string, imgPath: string | null) {
  try {
    if (imgPath) {
      const imgRef = storageBucket.file(imgPath);
      imgRef.delete();
    } else {
      console.log("No image was uploaded!");
    }
    const guideRef = db.doc(`guides/${guideId}`);
    guideRef.delete();
    return { status: "success" };
  } catch (err) {
    console.log("Failed to delete the data");
    return { status: "failed" };
  }
}
