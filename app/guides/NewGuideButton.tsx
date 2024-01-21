"use client";

import { generateNewArticle } from "@/lib/syncArticle";
import { API_RES } from "@/public/types/API";
import { Button } from "@mui/joy";
import { useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
interface ButtonProperties {
  text: string;
  disabled: boolean;
}
export default function NewGuideButton() {
  const [buttonProp, setButtonProp] = useState<ButtonProperties>({
    text: "Create a new Guide",
    disabled: false,
  });
  const pathname = usePathname();
  const { data, status } = useSession();
  return (
    <Button
      disabled={buttonProp.disabled}
      onClick={
        /**
         * This function created a new document in firestore and redireacts
         * to create page where the id is used for changing data of the document
         */
        async () => {
          /**
           * New Guide is only created if the user is signed in otherwise
           * the  user is redirected to signin page
           */
          if (status === "authenticated") {
            setButtonProp({ text: "Creating...", disabled: true });
            const res: API_RES = JSON.parse(await generateNewArticle());
            if (res.success) {
              const searchParams = new URLSearchParams();
              searchParams.append("aID", res.res.id);
              setButtonProp({ text: "Create a new Guide", disabled: false });
              window.open(
                `${pathname}/create?${searchParams.toString()}`,
                "_blank"
              );
            } else {
              alert(res.err);
            }
          } else {
            return redirect("/api/auth/signin");
          }
        }
      }
      className="btn-dark"
      href={`/guides/create`}
    >
      {buttonProp.text}
    </Button>
  );
}
