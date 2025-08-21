// src/pages/admin/AdminConfirmSpacePage.tsx
import TopHeader from "../../components/TopHeader";
import SpaceInfoSimple from "../../components/detail/SpaceInfoSimple";
import type { Space } from "../../constants/dummySpaces";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadKakaoScript } from "../../utils/kakaoMapLoader";
import { resolveGooglePlace, parseGeometry } from "../../apis/resolveGooglePlace";

declare global { interface Window { kakao: any; } }

// 부분만 갖고 있어도 되게
type UISpace = Partial<Space> & { lat?: number; lng?: number };

const AdminConfirmSpacePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as {
    state?: { placeName?: string; googleMapsLink?: string; proposalId?: number }
  };

  const initialName = state?.placeName?.trim() ?? "";
  const googleMapsLink = state?.googleMapsLink ?? "";
  const proposalId = state?.proposalId;

  const [space, setSpace] = useState<UISpace>({
    id: 0,
    name: initialName,
    image: "",
    rating: 0,
    distance: 0,
    tags: [],
    isLiked: false,
    address: "",
    opening: "",  // 운영시간 없으면 빈칸
    holiday: "",
    phone: "",
  });

  const fromGoogle = (g: any): UISpace => {
    const { lat, lng } = parseGeometry(g?.geometry);
    return {
      id: 0,
      name: g?.name ?? initialName,
      image: g?.photoUrl ?? "",
      rating: 0,
      distance: 0,
      tags: [],
      isLiked: false,

      address: g?.formattedAddress ?? "",
      phone: g?.internationalPhoneNumber ?? "",
      opening: g?.openingHours || g?.secondaryOpeningHours || "",

      lat, lng,
    };
  };

  const fromKakao = (k: any): UISpace => ({
    id: Number(k.id ?? 0),
    name: k.place_name ?? initialName,
    image: "",
    rating: 0,
    distance: 0,
    tags: [],
    isLiked: false,

    address: k.road_address_name || k.address_name || "",
    phone: k.phone || "",
    opening: "", // 카카오는 운영시간 없음 → 빈칸

    lat: k?.y ? Number(k.y) : undefined,
    lng: k?.x ? Number(k.x) : undefined,
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // 1) 구글 Resolve 먼저 시도 (링크가 있거나, 이름만으로도 시도)
      const g = await resolveGooglePlace({ shortUrl: googleMapsLink, name: initialName });
      if (!cancelled && g) {
        setSpace(fromGoogle(g));
        return; // 성공했으면 여기서 끝
      }

      // 2) 실패 시 카카오 키워드 검색 폴백
      if (!initialName) return;
      try {
        await loadKakaoScript();
        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(initialName, (data: any[], status: any) => {
          if (cancelled) return;
          if (status !== window.kakao.maps.services.Status.OK || !data?.length) return;
          const norm = (s: string) => s.replace(/\s/g, "");
          const hit = data.find(d => norm(d.place_name) === norm(initialName)) ?? data[0];
          setSpace(fromKakao(hit));
        });
      } catch {
        /* 폴백도 실패 → 빈값 유지 */
      }
    })();

    return () => { cancelled = true; };
  }, [googleMapsLink, initialName]);

  // SpaceInfoSimple 이 기대하는 전체 타입으로 표시 직전에 치환
  const fullSpaceForView: Space = {
    id: space.id ?? 0,
    name: space.name ?? "",
    image: space.image ?? "",
    rating: space.rating ?? 0,
    distance: space.distance ?? 0,
    tags: space.tags ?? [],
    isLiked: space.isLiked ?? false,

    address: space.address ?? "",
    opening: space.opening ?? "", // 비어 있으면 그대로 빈칸 표시
    holiday: space.holiday ?? "",
    phone: space.phone ?? "",

    // 화면 안 쓰는 필드들 기본값
    isFree: (space as any).isFree ?? false,
    congestionGraph: (space as any).congestionGraph ?? [],
    realTimeCongestion: (space as any).realTimeCongestion ?? 0,
    reviews: (space as any).reviews ?? [],
    reviewStats: (space as any).reviewStats ?? { total: 0, avg: 0, breakdown: {} },
  };

  const handleConfirm = () => {
    navigate("/admin/init-space-info", {
      state: {
        placeName: fullSpaceForView.name,
        spaceFromKakao: space,  // 좌표/주소/전화 포함(부분 객체)
        googleMapsLink,
        proposalId,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <TopHeader title="새 공간 등록" />
      <p className="w-[224px] h-[28px] absolute top-[66px] left-1/2 -translate-x-1/2 text-md text-black text-center opacity-100">
        이 공간 정보를 등록하시겠습니까?{"\n"}확인 후 진행해주세요.
      </p>

      <div className="w-full px-[15px] pt-[100px] flex flex-col items-center">
        <div className="w-[344px] flex flex-col gap-[10px]">
          <h2 className="text-xl font-bold">{fullSpaceForView.name}</h2>
          <div className="border border-gray-300 bg-white rounded-lg p-4">
            <SpaceInfoSimple space={fullSpaceForView} />
          </div>
        </div>
      </div>

      <div className="fixed bottom-[20px] left-1/2 -translate-x-1/2 w-[334px] h-[45px] bg-white flex justify-between gap-[6px]">
        <button onClick={() => navigate(-1)} className="w-1/2 h-full border border-gray-300 rounded-md text-sm font-semibold text-gray-600 bg-white">
          취소
        </button>
        <button onClick={handleConfirm} className="w-1/2 h-full rounded-md text-sm font-semibold text-white bg-[#4cb1f1]">
          확인
        </button>
      </div>
    </div>
  );
};

export default AdminConfirmSpacePage;
