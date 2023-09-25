import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFaviconUrl(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${128}`;
}
