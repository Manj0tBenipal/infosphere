"use client";
import { createHash } from "crypto";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { useRef, useState, useEffect } from "react";
import FormControl from "@mui/joy/FormControl";

import Input from "@mui/joy/Input";
import { syncData, uploadImage } from "@/lib/syncArticle";
import { Guide } from "@/public/types/Guide";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { Button } from "@mui/joy";
export default function page() {
  //Fetches data about the session(user is required to be logged in before creating a new post)
  const { data, status } = useSession();
  if (status !== "authenticated") {
    return redirect("/api/auth/signin");
  }
  // ------ This code gets executed only if the user is logged in --------- //
  const searchParams = useSearchParams();
  //Data of the guide
  const [articleData, setArticleData] = useState<Guide>({
    userId: data.user?.email,
    content: "",
    title: "",
  } as Guide);
  const [coverImg, setCoverImg] = useState<File | null>(null);
  //Used to retrieve the data from the Text Editor
  const editorRef = useRef<TinyMCEEditor | null>(null);

  /**
   * used to compare the value stored in the state and the text editor to
   * decide whether to sync data with the database or not
   * @param inputString
   * @returns generated hash for the inputString
   */
  function getHash(inputString: string) {
    const input = inputString.toString().trim();
    const hash = createHash("sha256");
    hash.update(input);
    const hashedString = hash.digest("hex");
    return hashedString;
  }

  /**
   * Compare the value of the guide's content in state variable and in text editor
   * This function is executeed periodically and checks if there is a change
   * in the value of text editor's content.
   * If there is a change the state is synced with the content of text editor
   * which otherwise is left unchanged
   *
   */
  useEffect(() => {
    return () => {
      //in case the Component gets Unmounted the most recent changes are synced with database
      syncData(articleData, searchParams.get("aID") || null);

      //Clearing the editor reference to prevent memoryleaks
      editorRef.current = null;
    };
  }, []);

  useEffect(() => {
    /**
     * This function adds the behavior of one way data-binding from the component to the state
     * Helps Implement debouncing while automatically  syncing data with the database
     */
    const interval = setInterval(() => {
      if (editorRef.current) {
        const content = editorRef.current.getContent();
        // Check if the content has really changed
        if (getHash(content) !== getHash(articleData.content)) {
          setArticleData((prev) => ({
            ...prev,
            content,
          }));
        }
      }
    }, 1000);
    /**
     * Debounced Updates to Database
     *
     * If the state is unchanged for 4 seconds the data is pushed to the database
     *
     * The function is not executed if:
     * 1. The articleData keeps changing at a frequency of every 4 seconds or less
     * 2. The data reamains unchanged after the most recent push to the database
     */
    const debounceTimeoutInstance = setTimeout(
      () => syncData(articleData, searchParams.get("aID") || null),
      4000
    );

    return () => {
      clearInterval(interval);
      clearTimeout(debounceTimeoutInstance);
    };
  }, [articleData.content, articleData.title]);

  return (
    <main
      style={{ minHeight: "100vh" }}
      className="flex flex-center flex-column flex-gap-1"
    >
      <h1 className="fontXL primary-gradient-font"> Create a New Guide</h1>
      <div className="flex flex-between ">
        <Button className="btn-dark ">Discard</Button>
        <Button
          className="btn-gradient"
          onClick={async () => {
            if (coverImg) {
              const formData = new FormData();
              formData.append("img", coverImg);
              const imgURL = await uploadImage(formData);
              setArticleData((prev: Guide) => {
                return { ...prev, imgId: imgURL?.toString() || "" };
              });
            }
          }}
        >
          Save
        </Button>
      </div>
      <div className="flex flex-column f.lex-gap-1">
        <FormControl>
          <label htmlFor="title" className="fontL">
            Title
          </label>
          <Input
            id="title"
            placeholder="How to do <....>"
            value={articleData.title}
            onChange={(event) =>
              setArticleData((prev) => ({
                ...prev,
                title: event.target.value,
              }))
            }
          />
        </FormControl>

        <FormControl>
          <label className="fontL">Content</label>

          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue=""
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Calibri,sans-serif; font-size:14px }",
            }}
          />
        </FormControl>
        <FormControl>
          <label className="fontL">Cover Image</label>

          <input
            type="file"
            onChange={(e) => {
              setCoverImg(() => (e.target.files ? e.target.files[0] : null));
            }}
            placeholder="Cover Image for your Guide"
          />
        </FormControl>
      </div>
    </main>
  );
}
