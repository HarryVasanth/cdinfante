// @author HarryVasanth (https://github.com/harryvasanth)
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility for Tailwind class merging
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
