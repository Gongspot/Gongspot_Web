import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import BasicInfoSection from "./BasicInfoSection";
import NextButton from "../NextButton";
import { reducer, MAX_SELECT, PLACE_OPTIONS, PURPOSE_OPTIONS, REGION_OPTIONS } from "../../constants/basicInfoConfig";
import { postNickname, postPrefer } from "../../apis/home";

interface BasicInfoProps {
  nickname: string;
}

const BasicInfo = ({ nickname }: BasicInfoProps) => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, {
    places: [],
    purposes: [],
    regions: [],
  });

  const removeSpacesAndSpecialChars = (str: string) => {
    if (str === "성동·광진권") {
      return "성동_광진권";
    }
    return str.replace(/[^가-힣]/g, "");
  };

  const handleClick = async () => {
    try {
      const nicknameRequestBody = {
        nickname: nickname,
      };
      await postNickname(nicknameRequestBody);

      const preferRequestBody = {
        preferPlace: state.places.map(removeSpacesAndSpecialChars),
        purpose: state.purposes.map(removeSpacesAndSpecialChars),
        location: state.regions.map(removeSpacesAndSpecialChars),
      };
      await postPrefer(preferRequestBody);

      navigate("/home");
    } catch (error) {
      alert("오류가 발생했습니다.");
      console.error(error);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-center bg-[#EFF7FB]">
      <div className="flex-1">
        <h1 className="mt-[3.5rem] text-[1.25rem] text-[#4CB1F1]">
          어떤 공부장소를 선호하세요?
        </h1>
        <p className="mt-[0.75rem] text-[0.875rem] text-[#4CB1F1]">
          취향에 맞는 장소를 추천해드릴게요!
        </p>
        <div className="mt-[1rem] mb-[1.5rem] w-full px-[1.25rem]">
          <BasicInfoSection
            title="자주 이용하는 공부 장소를 선택해주세요."
            options={PLACE_OPTIONS}
            selected={state.places}
            onChange={(option) =>
              dispatch({ type: "TOGGLE_SELECT", group: "places", payload: option })
            }
            maxSelect={MAX_SELECT}
          />
          
          <BasicInfoSection
            title="방문하시는 목적을 선택해주세요."
            options={PURPOSE_OPTIONS}
            selected={state.purposes}
            onChange={(option) =>
              dispatch({ type: "TOGGLE_SELECT", group: "purposes", payload: option })
            }
            maxSelect={MAX_SELECT}
          />

          <BasicInfoSection
            title="주 활동 지역을 선택해주세요."
            options={REGION_OPTIONS}
            selected={state.regions}
            onChange={(option) =>
              dispatch({ type: "TOGGLE_SELECT", group: "regions", payload: option })
            }
            maxSelect={MAX_SELECT}
          />
        </div>
      </div>

      <NextButton text="시작하기" onClick={handleClick} />
    </div>
  );
};

export default BasicInfo;
