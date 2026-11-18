import { Home } from "@/components/Portfolio";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("en");
export default function Page() { return <Home lang="en" />; }
