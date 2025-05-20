import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isTokenExpired(token: string): boolean {
  try {
    const [, payload] = token.split("."); 
    const decoded = JSON.parse(atob(payload));
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  } catch (e) {
    return true;
  }
}

export function getUserId(token: string): string | null {
  try {
    const [, payload] = token.split("."); 
    const decoded = JSON.parse(atob(payload));
    return decoded.uid;
  } catch (e) {
    return null;
  }
}
