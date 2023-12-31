"use server";
import { addDoc, doc, setDoc } from "firebase/firestore";

import { db, guidesCollection } from "@/lib/firebase";
import { Guide } from "@/public/types/Guide";
/**
 * Debounced Updates to Database
 *
 * If the state is unchanged for 4 seconds the data is pushed to the database
 *
 * The function is not executed if:
 * 1. The articleData keeps changing at a frequency of every 4 seconds or less
 * 2. The data reamains unchanged after the most recent push to the database
 */
export async function syncData(data: Guide, docId: string | null) {
  console.log(`Updating: ${{ ...data }} with id ${docId}`);
  if (docId && data) {
    const docRef = doc(db, "guides", docId);
    await setDoc(
      docRef,
      {
        ...data,
        date: new Date().toUTCString(),
      },
      { merge: true }
    );
    console.log("update successfull");
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
    const { id } = await addDoc(guidesCollection, blankGuide);
    if (id === undefined) {
      throw new Error("Failed to create a new Guide!");
    }
    return id;
  } catch (err) {
    throw new Error("Failed to  creat");
  }
}
