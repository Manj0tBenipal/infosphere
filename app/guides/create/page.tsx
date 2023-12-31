"use client";
import { createHash } from "crypto";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { useRef, useState, useEffect } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import { syncData } from "@/lib/syncArticle";
import { Guide } from "@/public/types/Guide";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function page() {
  //Fetches data about the session(user is required to be logged in before creating a new post)
  const { data, status } = useSession();
  if (status !== "authenticated") {
    return redirect("/api/auth/signin");
  }
  // ------ This code gets executed only if the user is logged in --------- //
  //Data of the guide
  const [articleData, setArticleData] = useState<Guide>({
    userId: data.user?.email,
    date: new Date().toUTCString(),
    content: "",
    title: "",
  } as Guide);
  console.log(articleData);
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
  function saveData() {
    if (editorRef.current) {
      const editorText = editorRef.current.getContent().toString() || "";
      console.log(editorText);
      if (getHash(editorText) === getHash(articleData.content)) {
        return;
      } else {
        setArticleData((prev) => {
          return {
            title: prev.title,
            content: editorText.toString(),
          } as Guide;
        });
      }
    }
  }

  useEffect(() => {
    //Syncs the content of text editor with the state only when required

    const interval = setInterval(saveData, 3000);
    const syncInterval = setInterval(syncData, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [articleData.content]);

  return (
    <main style={{ minHeight: "100vh" }}>
      <h1 className="font-XL font-primary-gradient"> Create a New Guide</h1>
      <div className="flex flex-column">
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Placeholder"
            value={articleData.title}
            onChange={(event) =>
              setArticleData((prev) => ({ ...prev, title: event.target.value }))
            }
          />
          <FormHelperText>Enter the title of your guide</FormHelperText>
        </FormControl>
        <FormLabel>
          Please Choose a coverImage for your guide
          <input type="file" placeholder="Cover Image for your Guide" />
        </FormLabel>
        <Editor
          apiKey={process.env.TINY_MCE_API_KEY}
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
      </div>
    </main>
  );
}
