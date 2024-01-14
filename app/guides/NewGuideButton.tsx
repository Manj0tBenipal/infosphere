"use client";

import { generateNewArticle } from "@/lib/syncArticle";
import { API_RES } from "@/public/types/API";
import { Button } from "@mui/joy";
import { usePathname, useRouter } from "next/navigation";

export default function NewGuideButton() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Button
      onClick={async () => {
        const res: API_RES = JSON.parse(await generateNewArticle());
        if (res.success) {
          const searchParams = new URLSearchParams();
          searchParams.append("aID", res.res.id);
          router.push(`${pathname}/create?${searchParams.toString()}`);
        } else {
          alert(res.err);
        }
      }}
      className="btn-dark"
      href={`/guides/create`}
    >
      Create a new Guide
    </Button>
  );
}
