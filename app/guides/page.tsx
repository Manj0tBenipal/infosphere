import { app, db, guidesCollection, storageBucket } from "@/lib/firebase";
import NewGuideButton from "./NewGuideButton";
import serviceAccount from "@/key.json";
import { getApps } from "firebase-admin/app";

export default function page() {
  return (
    <div>
      <NewGuideButton />
    </div>
  );
}
