"use client";

import { generateNewArticle } from "@/lib/syncArticle";
import { API_RES } from "@/public/types/API";
import { Button } from "@mui/joy";
import { useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";

export default function NewGuideButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { data, status } = useSession();
  return (
    <Button
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
            const res: API_RES = JSON.parse(await generateNewArticle());
            if (res.success) {
              const searchParams = new URLSearchParams();
              searchParams.append("aID", res.res.id);
              router.push(`${pathname}/create?${searchParams.toString()}`);
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
      Create a new Guide
    </Button>
  );
}
