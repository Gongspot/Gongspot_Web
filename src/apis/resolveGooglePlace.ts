// resolveGooglePlace.ts
import { axiosInstance } from "./axios";

export async function resolveGooglePlace(params: { shortUrl?: string; name?: string }) {
  try {
    const res = await axiosInstance.get("/places/google/resolve", {
      params,
      withCredentials: true, // axiosInstance에 이미 있다면 생략 가능
    });
    return res.data?.result ?? null;
  } catch (e: any) {
    console.log("[resolveGooglePlace] error payload:", e?.response?.data);
    console.log("[resolveGooglePlace] status:", e?.response?.status);
    return null;
  }
}

export function parseGeometry(geometry?: string): { lat?: number; lng?: number } {
  if (!geometry) return {};
  const [latStr, lngStr] = geometry.split(",");
  const lat = Number(latStr?.trim());
  const lng = Number(lngStr?.trim());
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return {};
  return { lat, lng };
}