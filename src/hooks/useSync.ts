import { useEffect, useState } from "react";
import {
  getStatus,
  initLiveSync,
  subscribeStatus,
  type SyncStatus,
} from "../services/sync";

export type { SyncStatus };

/** Live sync status. Mounting it anywhere starts the shared socket once. */
export function useSync(): SyncStatus {
  const [status, setStatus] = useState<SyncStatus>(getStatus);

  useEffect(() => {
    initLiveSync();
    return subscribeStatus(setStatus);
  }, []);

  return status;
}
