import { staticProjects, caseMetadata, casePage, type ProjectParams } from "@/components/ProjectRoute";

export const dynamicParams = false;
export function generateStaticParams() { return staticProjects(); }
export function generateMetadata(props: ProjectParams) { return caseMetadata("ar", props); }
export default function Page(props: ProjectParams) { return casePage("ar", props); }
