export function isBrowser() {
  return typeof window === 'object' && typeof document === 'object';
}
