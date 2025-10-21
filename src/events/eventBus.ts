type Listener = (...args: any[]) => void;

const listeners: Record<string, Listener[]> = {};

export function on(event: string, callback: Listener) {
  if (!listeners[event]) listeners[event] = [];
  listeners[event].push(callback);
  return () => off(event, callback);
}

export function off(event: string, callback: Listener) {
  listeners[event] = (listeners[event] || []).filter(cb => cb !== callback);
}

export function emit(event: string, ...args: any[]) {
  (listeners[event] || []).forEach(cb => cb(...args));
}