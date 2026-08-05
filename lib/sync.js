import { getSyncQueue, clearSyncItem } from "./offline";

let isSyncing = false;

export async function flushSyncQueue() {
  if (isSyncing) return;
  if (typeof navigator !== 'undefined' && !navigator.onLine) return;

  isSyncing = true;
  
  try {
    const queue = await getSyncQueue();
    if (!queue || queue.length === 0) {
      isSyncing = false;
      return;
    }

    // Sort by timestamp to ensure FIFO
    queue.sort((a, b) => a.timestamp - b.timestamp);

    for (const item of queue) {
      try {
        const response = await fetch(item.url, {
          method: item.method,
          headers: { 'Content-Type': 'application/json' },
          body: item.body ? JSON.stringify(item.body) : undefined
        });

        if (response.ok) {
          // Success, remove from queue
          await clearSyncItem(item.id);
        } else if (response.status >= 400 && response.status < 500) {
          // Client error (e.g. validation). Hard fail, remove to prevent blocking queue forever
          console.error(`Sync item ${item.id} failed with ${response.status}. Removing from queue.`);
          await clearSyncItem(item.id);
        } else {
          // 5xx Server error. Break and try again later
          console.warn(`Server error during sync of item ${item.id}. Halting queue.`);
          break;
        }
      } catch (err) {
        // Network error. Break and try again when online
        console.warn(`Network error during sync of item ${item.id}. Halting queue.`, err);
        break;
      }
    }
  } finally {
    isSyncing = false;
  }
}
