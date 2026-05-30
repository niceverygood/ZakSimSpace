import type { Metadata } from "next";
import { SettingsForm } from "./SettingsForm";
import { meUser, myPaidOrders } from "../data";

export const metadata: Metadata = { title: "계정 설정" };
export const dynamic = "force-dynamic";

export default async function MeSettingsPage() {
  const [user, orders] = await Promise.all([meUser(), myPaidOrders()]);
  // 상호/대표자 are sourced from the most recent paid order when present.
  const latest = orders[0];

  return (
    <div className="space-y-6">
      <SettingsForm
        initialName={latest?.buyerName || user?.name || ""}
        initialEmail={user?.email || ""}
        initialCompany={latest?.buyerName || ""}
      />
    </div>
  );
}
