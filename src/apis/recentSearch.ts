// src/apis/recentSearch.ts
import { axiosInstance } from "./axios";

export interface RecentSearchItem {
  id: number;
  keyword: string;
}

// 키워드 기준(소문자/trim)으로 중복 제거
const uniqByKeyword = (items: RecentSearchItem[]) => {
  const seen = new Set<string>();
  const out: RecentSearchItem[] = [];
  for (const it of items) {
    const k = it.keyword.trim().toLowerCase();
    if (k && !seen.has(k)) {
      seen.add(k);
      out.push({ id: it.id, keyword: it.keyword.trim() });
    }
  }
  return out;
};

// 응답을 객체 배열로 정규화(서버가 string[]를 주면 id가 없어 삭제 불가)
export const getRecentSearches = async (): Promise<RecentSearchItem[]> => {
  let raw: unknown = undefined;

  try {
    const res = await axiosInstance.get("/recent-search");
    const { isSuccess, result } = res.data;

    if (!isSuccess || !result) return [];

    raw = result.keywords;
    console.log("[recent] raw from server:", raw);

    // 1) { id, keyword }[] (id가 "1" 같은 문자열일 수도 있음)
    if (
      Array.isArray(raw) &&
      raw.every((v: any) => v && (typeof v.id === "number" || typeof v.id === "string") && typeof v.keyword === "string")
    ) {
      const list = raw
        .map((v: any) => ({ id: Number(v.id), keyword: v.keyword?.trim?.() ?? "" }))
        .filter((v) => Number.isInteger(v.id) && v.id >= 0 && v.keyword);
      return uniqByKeyword(list);
    }

    // 2) string[]만 내려오는 경우 → 보여주기만 하고 삭제는 불가
    if (Array.isArray(raw) && raw.every((s: any) => typeof s === "string")) {
      const list = raw
        .map((s: string) => ({ id: -1, keyword: s.trim() })) // id: -1 고정
        .filter((v) => v.keyword);
      return uniqByKeyword(list);
    }

    return [];
  } catch (e) {
    console.error("최근 검색어 조회 오류:", e, "raw:", raw);
    return [];
  }
};

// 최근 검색어 삭제
export const deleteRecentSearchById = async (searchId: number): Promise<boolean> => {
  try {
    if (!Number.isInteger(searchId) || searchId < 0) {
      console.warn("유효하지 않은 searchId:", searchId);
      return false; // 서버 호출 안 함
    }
    const res = await axiosInstance.delete(`/recent-search/${searchId}`);
    return !!res.data?.isSuccess;
  } catch (e) {
    console.error("최근 검색어 삭제 실패:", e);
    return false;
  }
};