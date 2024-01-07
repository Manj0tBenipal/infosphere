"use client";

import { generateNewArticle } from "@/lib/syncArticle";
import { Button } from "@mui/joy";
import { usePathname, useRouter } from "next/navigation";

export default function NewGuideButton() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Button
      onClick={async () => {
        const id: string = await generateNewArticle();
        const searchParams = new URLSearchParams();
        searchParams.append("aID", id);
        router.push(`${pathname}/create?${searchParams.toString()}`);
      }}
      className="btn-dark"
      href={`/guides/create`}
    >
      Create a new Guide
    </Button>
  );
}
