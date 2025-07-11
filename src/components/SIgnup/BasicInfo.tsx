import { useReducer } from "react";
import BasicInfoItem from "./BasicInfoItem";
import NextButton from "../NextButton";
import SelectButton from "./SelectButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface BasicInfoProps {
  nickname: string;
}

const PLACE_OPTIONS = [
  "도서관", "카페", "민간 학습 공간",
  "교내 학습 공간", "공공 학습 공간",
];

const PURPOSE_OPTIONS = [
  "개인 공부", "그룹 공부", "집중 공부",
  "휴식", "노트북 작업",
];

const REGION_OPTIONS = [
  "강남권", "강북권", "도심권", "성동·광진권",
  "서남권", "서북권", "동남권",
];

const MAX_SELECT = 3;

interface IState {
  places: string[];
  purposes: string[];
  regions: string[];
}

interface IAction {
  type: 'TOGGLE_SELECT';
  group: 'places' | 'purposes' | 'regions';
  payload: string;
}

function reducer(state: IState, action: IAction): IState {
  const { group, payload } = action;
  const selectedArr = state[group];

  if (selectedArr.includes(payload)) {
    return {
      ...state,
      [group]: selectedArr.filter((item) => item !== payload),
    };
  } else if (selectedArr.length < MAX_SELECT) {
    return {
      ...state, [group]: [...selectedArr, payload],
    };
  } else {
    return state;
  }
}

const BasicInfo = ({ nickname }: BasicInfoProps) => {
  const navigate = useNavigate();
  
  const [state, dispatch] = useReducer(reducer, {
    places: [], purposes: [], regions: []
  });

    const handleClick = async () => {
    try {
      const requestBody = {
        nickname,
        // 기본 정보 추가 예정
      };
      const response = await axios.post(
        "http://localhost:8080/api/users/kakao/signup", //테스트용 URL
        requestBody
      );
      if (response.status === 200) {
        navigate("/home");
      } else {
        alert("회원가입에 실패했습니다.");
        navigate("/");
      }
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
        <div className="mt-[2.25rem] mb-[1.5rem] w-full px-[1.25rem]">
          <div className="rounded-[15px] border border-[#B1B8C180] bg-white">
            <div className="my-[1.5rem] ml-[1.125rem] mr-[2.375rem]">
              <BasicInfoItem text={"자주 이용하는 공부 장소를 선택해주세요."} />
              <div className="mt-[1rem]">
                <span className="flex justify-start space-x-[0.5rem]">
                  {PLACE_OPTIONS.slice(0, 3).map((option) => (
                    <SelectButton 
                      key={option}
                      text={option}
                      selected={state.places.includes(option)}
                      onClick={() =>
                        dispatch({ type: 'TOGGLE_SELECT', group: 'places', payload: option })
                      }
                      disabled={
                        !state.places.includes(option) && state.places.length >= MAX_SELECT
                      }
                    />
                  ))}
                </span>
                <span className="flex justify-start mt-[0.5rem] space-x-[0.5rem]">
                  {PLACE_OPTIONS.slice(3).map((option) => (
                    <SelectButton 
                      key={option}
                      text={option}
                      selected={state.places.includes(option)}
                      onClick={() =>
                        dispatch({ type: 'TOGGLE_SELECT', group: 'places', payload: option })
                      }
                      disabled={
                        !state.places.includes(option) && state.places.length >= MAX_SELECT
                      }
                    />
                  ))}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-[1.25rem] rounded-[15px] border border-[#B1B8C180] bg-white">
            <div className="my-[1.5rem] ml-[1.125rem] mr-[2.375rem]">
              <BasicInfoItem text={"방문하시는 목적을 선택해주세요."} />
              <div className="mt-[1rem]">
                <span className="flex justify-start space-x-[0.5rem]">
                  {PURPOSE_OPTIONS.slice(0, 3).map((option) => (
                    <SelectButton 
                      key={option}
                      text={option}
                      selected={state.purposes.includes(option)}
                      onClick={() =>
                        dispatch({ type: 'TOGGLE_SELECT', group: 'purposes', payload: option })
                      }
                      disabled={
                        !state.purposes.includes(option) && state.purposes.length >= MAX_SELECT
                      }
                    />
                  ))}
                </span>
                <span className="flex justify-start mt-[0.5rem] space-x-[0.5rem]">
                  {PURPOSE_OPTIONS.slice(3).map((option) => (
                    <SelectButton 
                      key={option}
                      text={option}
                      selected={state.purposes.includes(option)}
                      onClick={() =>
                        dispatch({ type: 'TOGGLE_SELECT', group: 'purposes', payload: option })
                      }
                      disabled={
                        !state.purposes.includes(option) && state.purposes.length >= MAX_SELECT
                      }
                    />
                  ))}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-[1.25rem] rounded-[15px] border border-[#B1B8C180] bg-white">
            <div className="my-[1.5rem] ml-[1.125rem] mr-[2.375rem]">
              <BasicInfoItem text={"주 활동 지역을 선택해주세요."} />
              <div className="mt-[1rem]">
                <span className="flex justify-start space-x-[0.5rem]">
                  {REGION_OPTIONS.slice(0, 4).map((option) => (
                    <SelectButton 
                      key={option}
                      text={option}
                      selected={state.regions.includes(option)}
                      onClick={() =>
                        dispatch({ type: 'TOGGLE_SELECT', group: 'regions', payload: option })
                      }
                      disabled={
                        !state.regions.includes(option) && state.regions.length >= MAX_SELECT
                      }
                    />
                  ))}
                </span>
                <span className="flex justify-start mt-[0.5rem] space-x-[0.5rem]">
                  {REGION_OPTIONS.slice(4).map((option) => (
                    <SelectButton 
                      key={option}
                      text={option}
                      selected={state.regions.includes(option)}
                      onClick={() =>
                        dispatch({ type: 'TOGGLE_SELECT', group: 'regions', payload: option })
                      }
                      disabled={
                        !state.regions.includes(option) && state.regions.length >= MAX_SELECT
                      }
                    />
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NextButton text={"시작하기"} onClick={handleClick} />
    </div>
  );
};
export default BasicInfo;