import { FieldNotes } from "@/components/FieldNotes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("ar", "experience");
export default function Page() { return <FieldNotes lang="ar" id="experience" />; }
