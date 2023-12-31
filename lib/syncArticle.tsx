"use server";
import { addDoc } from "firebase/firestore";

import { guidesCollection } from "@/lib/firebase";
interface ArticleData {
  title: string;
  content: string;
}
export async function syncData(data: ArticleData) {

    
}
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
