import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility for Tailwind class merging.
 * Combines clsx and tailwind-merge for efficient class name management.
 *
 * @author Harry Vasanth (harryvasanth.com)
 * @copyright (c) 2026
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
