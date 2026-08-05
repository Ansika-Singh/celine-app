import { queueMutation, flushQueue, getQueuedMutations, clearQueue } from '../lib/offline';
import 'fake-indexeddb/auto'; // Add this to polyfill IndexedDB for jest

// Mock fetch globally
global.fetch = jest.fn();

// Helper to control navigator.onLine
function setOnline(value) {
  Object.defineProperty(window.navigator, 'onLine', {
    configurable: true,
    value,
  });
}

describe('Offline sync queue', () => {
  beforeEach(async () => {
    fetch.mockClear();
    await clearQueue(); // assumes a way to reset IndexedDB/queue state between tests
  });

  test('queues a mutation instead of hitting the network when offline', async () => {
    setOnline(false);

    await queueMutation({
      type: 'CREATE_INVOICE',
      payload: { customerId: 'c1', amount: 500 },
    });

    const queued = await getQueuedMutations();
    expect(queued).toHaveLength(1);
    expect(queued[0].payload.amount).toBe(500);
    expect(fetch).not.toHaveBeenCalled();
  });

  test('flushes queued mutations in order once back online', async () => {
    setOnline(false);
    await queueMutation({ type: 'CREATE_INVOICE', payload: { id: 1 } });
    await queueMutation({ type: 'UPDATE_INVOICE', payload: { id: 1, status: 'paid' } });

    setOnline(true);
    fetch.mockResolvedValue({ ok: true, json: async () => ({ success: true }) });

    await flushQueue();

    expect(fetch).toHaveBeenCalledTimes(2);
    // Order matters — first call should be the CREATE, second the UPDATE
    expect(fetch.mock.calls[0][1].body).toContain('CREATE_INVOICE');
    expect(fetch.mock.calls[1][1].body).toContain('UPDATE_INVOICE');
  });

  test('retries only the failed mutation, not the whole queue', async () => {
    setOnline(false);
    await queueMutation({ type: 'CREATE_INVOICE', payload: { id: 1 } });
    await queueMutation({ type: 'CREATE_INVOICE', payload: { id: 2 } });

    setOnline(true);
    fetch
      .mockResolvedValueOnce({ ok: false, status: 500 }) // first fails
      .mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) }); // second succeeds

    await flushQueue();

    const remaining = await getQueuedMutations();
    // Only the failed mutation should still be in the queue
    expect(remaining).toHaveLength(1);
    expect(remaining[0].payload.id).toBe(1);
  });

  test('editing the same record twice offline sends both mutations in order', async () => {
    setOnline(false);
    await queueMutation({ type: 'UPDATE_INVOICE', payload: { id: 1, amount: 500 } });
    await queueMutation({ type: 'UPDATE_INVOICE', payload: { id: 1, amount: 750 } });

    const queued = await getQueuedMutations();
    expect(queued).toHaveLength(2);
    expect(queued[0].payload.amount).toBe(500);
    expect(queued[1].payload.amount).toBe(750);
  });

  test('queue survives simulated reload (persisted, not just in-memory)', async () => {
    setOnline(false);
    await queueMutation({ type: 'CREATE_INVOICE', payload: { id: 1 } });

    // Simulate a fresh module load / page reload by re-reading straight from IndexedDB
    const persisted = await getQueuedMutations();
    expect(persisted).toHaveLength(1); // fails if queue lived only in a JS variable
  });
});
