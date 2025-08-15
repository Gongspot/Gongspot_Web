// src/pages/admin/AdminConfirmSpacePage.tsx
import TopHeader from "../../components/TopHeader";
import SpaceInfoSimple from "../../components/detail/SpaceInfoSimple";
import dummySpaces from "../../constants/dummySpaces";
import type { Space } from "../../constants/dummySpaces";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadKakaoScript } from "../../utils/kakaoMapLoader"; // 카카오 스크립트 로더만 사용

declare global {
  interface Window { kakao: any; }
}

const AdminConfirmSpacePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { placeName?: string } };
  const initialName = state?.placeName?.trim() ?? "";

  // UI는 유지하고, 데이터만 더미→실데이터로 치환
  const [space, setSpace] = useState<Space>(dummySpaces[0]);

  // 카카오 장소검색 → UI Space로 매핑
  const toUISpaceFromKakao = (k: any): Space => {
    const base = dummySpaces[0]; // 누락 필드는 더미가 채움 (UI 타입 보장)
    return {
      ...base,
      id: Number(k.id ?? base.id),
      name: k.place_name ?? base.name,
      // Kakao 검색결과에는 대표사진이 없음 → 더미 유지(또는 플레이스 썸네일 로직 추가 가능)
      image: base.image,
      rating: base.rating,
      distance: base.distance,
      tags: base.tags,
      isLiked: base.isLiked,

      // 상세정보 필드 매핑
      address: k.road_address_name || k.address_name || base.address,
      phone: k.phone || base.phone,
      opening: base.opening,       // 카카오는 영업시간 미제공 → 더미 유지
      isFree: base.isFree,
    };
  };

  useEffect(() => {
    if (!initialName) return;

    (async () => {
      try {
        await loadKakaoScript(); // services 로드 필수
        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(initialName, (data: any[], status: any) => {
          if (status !== window.kakao.maps.services.Status.OK || !data?.length) return;

          // 공백 무시 정확매칭 우선, 없으면 첫 번째
          const norm = (s: string) => s.replace(/\s/g, "");
          const hit = data.find(d => norm(d.place_name) === norm(initialName)) ?? data[0];

          setSpace(toUISpaceFromKakao(hit));
        });
      } catch (e) {
        console.warn("카카오 장소검색 실패:", e);
        // 실패 시 더미 유지 (UI 변경 없음)
      }
    })();
  }, [initialName]);

  // handleConfirm 수정
  const handleConfirm = () => {
    navigate("/admin/init-space-info", {
      state: {
        placeName: space.name,
        spaceFromKakao: space,   // 카카오에서 매핑한 공간 데이터 함께 전달
      },
    });
  };


  return (
    <div className="min-h-screen bg-white">
      <TopHeader title="새 공간 등록" />

      <p className="w-[224px] h-[28px] absolute top-[66px] left-1/2 -translate-x-1/2 text-md text-black text-center opacity-100">
        이 공간 정보를 등록하시겠습니까?
        {"\n"}확인 후 진행해주세요.
      </p>

      <div className="w-full px-[15px] pt-[100px] flex flex-col items-center">
        <div className="w-[344px] flex flex-col gap-[10px]">
          <h2 className="text-xl font-bold">{space.name}</h2>
          <div className="border border-gray-300 bg-white rounded-lg p-4">
            <SpaceInfoSimple space={space} />
          </div>
        </div>
      </div>

      <div className="fixed bottom-[20px] left-1/2 -translate-x-1/2 w-[334px] h-[45px] bg-white flex justify-between gap-[6px]">
        <button
          onClick={() => navigate(-1)}
          className="w-1/2 h-full border border-gray-300 rounded-md text-sm font-semibold text-gray-600 bg-white"
        >
          취소
        </button>
        <button
          onClick={handleConfirm}
          className="w-1/2 h-full rounded-md text-sm font-semibold text-white bg-[#4cb1f1]"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default AdminConfirmSpacePage;
