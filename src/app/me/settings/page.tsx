import type { Metadata } from "next";
import { SettingsForm } from "./SettingsForm";

export const metadata: Metadata = { title: "계정 설정" };

export default function MeSettingsPage() {
  return (
    <div className="space-y-6">
      <SettingsForm />
    </div>
  );
}
