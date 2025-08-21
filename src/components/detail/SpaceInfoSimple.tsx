/* global kakao */
import { useEffect, useRef, useState } from "react";

const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY;

type Props = { space: any };

const SpaceInfoSimple = ({ space }: Props) => {
  // ---- 필드 정규화: 어떤 키로 와도 잡히게 ----
  const address: string =
    space?.address ??
    space?.locationInfo ??
    space?.roadAddressName ??
    space?.roadAddress ??
    space?.jibunAddress ??
    space?.placeAddress ??
    "";

  // hours는 문자열 우선, 없으면 리스트 조합
  const hoursText: string =
    space?.hours ??
    space?.openingHours ??
    space?.businessHours ??
    space?.openHours ??
    space?.opening ??
    (Array.isArray(space?.hoursList) ? space.hoursList.join("\n") : "") ??
    "";

  const tel: string =
    space?.tel ?? space?.phoneNumber ?? space?.phone ?? "";

  const holiday: string | undefined =
    space?.holiday ?? space?.regularHoliday;

  // ---- 좌표 우선 사용 → 없으면 주소 지오코딩 ----
  const latFromProps = space?.lat ?? space?.kakaoPosition?.lat ?? null;
  const lngFromProps = space?.lng ?? space?.kakaoPosition?.lng ?? null;

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    latFromProps && lngFromProps ? { lat: latFromProps, lng: lngFromProps } : null
  );

  const mapEl = useRef<HTMLDivElement | null>(null);

  // 카카오 SDK 로더
  const ensureKakao = () =>
    new Promise<void>((resolve) => {
      if (window.kakao?.maps) return resolve();
      const s = document.createElement("script");
      s.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false&libraries=services`;
      s.async = true;
      s.onload = () => window.kakao.maps.load(() => resolve());
      document.head.appendChild(s);
    });

  // 주소 → 좌표 (props에 좌표 없을 때만 수행)
  useEffect(() => {
    let cancel = false;

    (async () => {
      if (coords || !address) return; // 이미 좌표 있거나 주소 없으면 skip
      await ensureKakao();
      if (cancel) return;

      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (results: any[], status: any) => {
        if (cancel) return;
        if (status === window.kakao.maps.services.Status.OK && results[0]) {
          const { x, y } = results[0];
          setCoords({ lat: parseFloat(y), lng: parseFloat(x) });
        }
      });
    })();

    return () => { cancel = true; };
  }, [address]); // 주소가 바뀌면 다시 수행

  // 지도 렌더
  useEffect(() => {
    if (!coords || !mapEl.current || !window.kakao?.maps) return;

    const center = new window.kakao.maps.LatLng(coords.lat, coords.lng);
    const map = new window.kakao.maps.Map(mapEl.current, {
      center,
      level: 3,
    });

    new window.kakao.maps.Marker({ map, position: center });
  }, [coords]);

  return (
    <div className="text-sm text-gray-800 space-y-6">
      {/* 위치정보 */}
      <div>
        <div className="font-semibold mb-2">위치정보</div>
        <div
          ref={mapEl}
          className="w-full h-28 rounded-xl mb-2"
          style={{ background: "#f5f5f5" }}
        />
        <div>{address || "주소 정보 없음"}</div>
      </div>

      {/* 영업정보 */}
      <div>
        <div className="font-semibold mb-2">영업정보</div>
        <div className="mb-1 whitespace-pre-wrap">
          운영시간: {hoursText || "정보 없음"}
        </div>
        {holiday !== undefined && (
          <div className="mb-1">정기휴무: {holiday || "정보 없음"}</div>
        )}
        <div className="mb-1">전화번호: {tel || "정보 없음"}</div>
      </div>
    </div>
  );
};

export default SpaceInfoSimple;
