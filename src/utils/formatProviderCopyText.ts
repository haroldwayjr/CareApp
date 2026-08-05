import type { ProviderResult } from '../data/mockCareResults'

/** Clipboard payload matching CareResultCard copy format. */
export function formatProviderCopyText(result: ProviderResult): string {
  const displayName = `${result.name}, ${result.credentials}`
  return [
    displayName,
    result.specialty,
    result.group,
    `${result.address} · ${result.distanceMiles.toFixed(1)} mi`,
    result.phone,
  ].join('\n')
}
