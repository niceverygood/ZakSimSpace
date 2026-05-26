"use client";

import { useEffect } from "react";
import { useRecentBranches } from "./useFavorites";

/** Side-effect-only component: records this branch as recently viewed. */
export function RecordRecentBranch({ branchId }: { branchId: string }) {
  const { push } = useRecentBranches();
  useEffect(() => {
    push(branchId);
  }, [branchId, push]);
  return null;
}
