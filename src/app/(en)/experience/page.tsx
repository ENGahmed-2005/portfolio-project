import { FieldNotes } from "@/components/FieldNotes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("en", "experience");
export default function Page() { return <FieldNotes lang="en" id="experience" />; }
