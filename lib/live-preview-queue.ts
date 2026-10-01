/**
 * Loads live previews a couple at a time instead of all at once.
 * Opening six full websites simultaneously freezes the page; with a queue each one loads in turn
 * (a site that never finishes loading frees its slot after a few seconds).
 */
const MAX_LOADING = 1;
const LOAD_TIMEOUT_MS = 6000;

let granted: string[] = []; // previews allowed to mount their iframe
let loading: string[] = []; // granted previews that haven't finished loading yet
let waiting: string[] = []; // previews on screen waiting for a free slot
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function grant(id: string) {
  granted = [...granted, id];
  loading = [...loading, id];
  setTimeout(() => finished(id), LOAD_TIMEOUT_MS);
}

function promote() {
  while (loading.length < MAX_LOADING && waiting.length > 0) {
    const [next, ...rest] = waiting;
    waiting = rest;
    grant(next);
  }
}

function finished(id: string) {
  if (!loading.includes(id)) return;
  loading = loading.filter((l) => l !== id);
  promote();
  emit();
}

export const livePreviewQueue = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  isGranted: (id: string) => granted.includes(id),
  /** Ask for permission to load (call when the preview scrolls into view). */
  request(id: string) {
    if (granted.includes(id) || waiting.includes(id)) return;
    if (loading.length < MAX_LOADING) grant(id);
    else waiting = [...waiting, id];
    emit();
  },
  /** The iframe finished loading: free its slot for the next one. */
  loaded: finished,
  /** The preview left the screen / unmounted. */
  release(id: string) {
    waiting = waiting.filter((w) => w !== id);
    granted = granted.filter((g) => g !== id);
    loading = loading.filter((l) => l !== id);
    promote();
    emit();
  },
};
