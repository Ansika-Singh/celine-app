const DB_NAME = 'CelineOfflineDB';
const DB_VERSION = 1;
const STORE_NAME = 'syncQueue';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

export async function queueMutation(mutation) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.add({
      ...mutation,
      timestamp: Date.now()
    });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getQueuedMutations() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result.sort((a, b) => a.timestamp - b.timestamp));
    request.onerror = () => reject(request.error);
  });
}

export async function clearQueue() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function removeMutation(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

let isSyncing = false;

export async function flushQueue() {
  if (isSyncing) return;
  if (typeof navigator !== 'undefined' && !navigator.onLine) return;

  isSyncing = true;
  try {
    const queue = await getQueuedMutations();
    if (!queue || queue.length === 0) {
      isSyncing = false;
      return;
    }

    for (const item of queue) {
      try {
        const response = await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });

        if (response.ok) {
          await removeMutation(item.id);
        } else if (response.status >= 500) {
          // Server error, leave it in the queue but continue processing others
          continue;
        } else {
          // Client error, remove to not block queue
          await removeMutation(item.id);
        }
      } catch (err) {
        // Network error, leave in queue and continue
        continue;
      }
    }
  } finally {
    isSyncing = false;
  }
}
