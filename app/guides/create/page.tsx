"use client";
import { getHash, sizeBasedUploadDecision } from "@/lib/utils";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { useRef, useState, useEffect } from "react";
import FormControl from "@mui/joy/FormControl";

import Input from "@mui/joy/Input";
import { deleteGuide, uploadImage } from "@/lib/syncArticle";
import { Guide, Image } from "@/public/types/Guide";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@mui/joy";
import LoadingCurtain from "@/components/LoadingCurtain";
import { API_RES } from "@/public/types/API";
import { MessageDialog } from "@/public/types/mysc";
export default function Page() {
  //Fetches data about the session(user is required to be logged in before creating a new post)
  const { data, status } = useSession();
  // if (status !== "authenticated") {
  //   return redirect("/api/auth/signin");
  // }
  // ------ This code gets executed only if the user is logged in --------- //
  const router = useRouter();
  const searchParams = useSearchParams();
  //Data of the guide
  const [articleData, setArticleData] = useState<Guide>({
    id: searchParams.get("aID"),
    userId: data?.user?.email,
    content: "",
    title: "",
    isPublic: false,
  } as Guide);
  const [messageDialog, setMessageDialog] = useState<MessageDialog>({
    isVisible: false,
    message: "",
    loading: false,
  });
  const [coverImg, setCoverImg] = useState<File | null>(null);
  //Used to retrieve the data from the Text Editor
  const editorRef = useRef<TinyMCEEditor | null>(null);
  async function saveImageAndArticle() {
    if (coverImg) {
      const formData = new FormData();
      formData.append("img", coverImg);
      const response: API_RES = JSON.parse(await uploadImage(formData));
      console.log(response);
      if (response.success) {
        setArticleData(
          (prev: Guide) => ({ ...prev, img: response.res.img } as Guide)
        );
        const res: API_RES = await sizeBasedUploadDecision(articleData);
        setMessageDialog((prev: MessageDialog) => ({
          ...prev,
          message: "Uploading Data",
          isVisible: true,
          loading: true,
        }));
        if (res.success) {
          setMessageDialog((prev: MessageDialog) => ({
            ...prev,
            message: "Data Saved Successfully",
            isVisible: true,
            loading: false,
          }));
        } else {
          setMessageDialog((prev: MessageDialog) => ({
            ...prev,
            message: "Failed to save data",
            isVisible: true,
            loading: false,
          }));
        }
      }
    } else {
      alert("Please Provide a Cover Image!");
    }
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
    async function a() {
      await sizeBasedUploadDecision(articleData);
    }
    return () => {
      //in case the Component gets Unmounted the most recent changes are synced with database
      a();
      //Clearing the editor reference to prevent memoryleaks
      editorRef.current = null;
    };
  }, []);

  useEffect(() => {
    /**
     * This function adds the behavior of one way data-binding from the textEditor to the state
     * Checks if there is any differendce between the content of text editor and articleData.content
     * if there is no difference, the state of articleData is not updated
     * If a difference is found the state is updated witht he latest data from text editor
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
     * If the articleData is unchanged for 4 seconds the data is pushed to the database
     *
     * The function is not executed if:
     * 1. The articleData keeps changing at a frequency of every 4 seconds or less
     * 2. The data reamains unchanged after the most recent push to the database
     */
    const debounceTimeoutInstance = setTimeout(
      async () => await sizeBasedUploadDecision(articleData),
      6000
    );

    return () => {
      clearInterval(interval);
      clearTimeout(debounceTimeoutInstance);
    };
  }, [articleData]);
  console.log(articleData);
  return (
    <main
      style={{ minHeight: "100vh", position: "relative" }}
      className="flex flex-center flex-column flex-gap-1"
    >
      {messageDialog.isVisible && (
        <LoadingCurtain
          properties={messageDialog}
          setProperties={setMessageDialog}
        />
      )}
      <h1 className="fontXL primary-gradient-font"> Create a New Guide</h1>
      <div className="flex flex-gap-1 width-full">
        <Button
          className="btn-dark "
          /**
           * Deletes the Guide and its cover image from  firestore and firebase storage respectively
           * After deletion:
           * 1. An alert box is displayed (suceess ot failure)
           * 2. if data is deleted successfully, the user is redirected to /guides
           */
          onClick={async () => {
            const res: API_RES = JSON.parse(
              await deleteGuide(articleData.id, articleData?.img?.id)
            );
            if (res.success) {
              alert("Deleted Successfully");
              return router.push("/guides");
            } else {
              setMessageDialog((prev: MessageDialog) => ({
                ...prev,
                isVisible: true,
                loading: false,
                message: "Failed to Delete Guide",
              }));
            }
          }}
        >
          Discard
        </Button>

        <Button
          className={articleData.isPublic ? "btn-dark" : "btn-gradient"}
          onClick={async () => {
            setArticleData((prev: Guide) => ({
              ...prev,
              isPublic: !prev.isPublic,
            }));
            await saveImageAndArticle();
          }}
        >
          {articleData.isPublic ? "Move to Drafts" : "Publish"}
        </Button>

        <Button
          className="btn-gradient"
          /**
           * Uploads the image to firebase storage and adds the downloadURL of the image to articleData
           * This URL then gets synced with the database of guides
           */
          onClick={async () => await saveImageAndArticle()}
        >
          Save
        </Button>
      </div>

      <div className="flex flex-column flex-gap-1 width-full">
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
              font_formats:
                "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats, Poppins=Poppins, sans-serif",
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter | fontselect " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style: `import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");`,
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
