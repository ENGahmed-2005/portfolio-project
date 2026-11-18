import { Explore } from "@/components/Explore";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("en", "explore");
export default function Page() { return <Explore lang="en" />; }
