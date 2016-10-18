export function isBrowser() {
  return ('window' in global) && ('document' in global)
}
