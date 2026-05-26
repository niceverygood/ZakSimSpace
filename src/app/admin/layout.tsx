import type { ReactNode } from "react";
import { AdminShell } from "./AdminShell";

export const metadata = {
  title: "어드민 콘솔",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
