import type { ReactNode } from "react";
import type { Viewport } from "next";
import "../globals.css";

export const viewport: Viewport = { themeColor: "#080f1c" };
export default function Layout({ children }: { children: ReactNode }) {
  return <html lang="en" dir="ltr"><body>{children}</body></html>;
}
