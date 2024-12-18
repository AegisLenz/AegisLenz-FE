import { useEffect, useState } from "react";
import * as S from "./ViewReportForm_style";
import Loading2 from "../../toggle/loading2/loading2";
import GetFormReport from "../../hook/report/GeForm";

const ViewReportForm = () => {
  const [Index, setIndex] = useState([]);
  const [nowIndexLoad, setnowIndexLoad] = useState(true);

  // 스위치 상태를 저장하는 배열
  const [toggles, setToggles] = useState([
    false, // 공격자 정보
    false, // 공격 이벤트 정리
    false, // 공격 대상 (리소스)
    false, // 공격 유형
    false, // 로그 포함하기
    false, // 공격근거 포함하기
    false, // 결과요약 포함하기
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setnowIndexLoad(true);
      try {
        const Data = await GetFormReport();
        setIndex(Data.report_template_ids);
      } catch (e) {
        console.log(e);
      } finally {
        setnowIndexLoad(false);
      }
    };
    fetchData();
  }, []);

  // 토글 상태 변경 함수
  const handleToggle = (index) => {
    setToggles((prevToggles) =>
      prevToggles.map((toggle, i) => (i === index ? !toggle : toggle))
    );
  };

  return (
    <S.Wrapper>
      <S.IndexWrapper>
        <S.IndexHead>
          <h1>Report Index</h1>
        </S.IndexHead>
        {nowIndexLoad || Index.length === 0 || Index === undefined ? (
          <Loading2 />
        ) : (
          Index.map((prompt, index) => (
            <S.IndexBubble key={index}>
              <S.IndexDate>{"2024-10-15"}</S.IndexDate>
              <S.IndexTitle>{prompt}</S.IndexTitle>
            </S.IndexBubble>
          ))
        )}
      </S.IndexWrapper>
      <S.ContentWrapper>
        <S.ContentSelectWrapper>
          <S.ContentSelectTitle>
            <h1>Form Edit</h1>
          </S.ContentSelectTitle>

          <S.ContentSelect>
            <S.InputWrapper>
              보고서 제목 :
              <S.TextInput
                type="text"
                placeholder="입력하지 않으면 자동으로 생성됩니다."
              ></S.TextInput>
            </S.InputWrapper>
            <S.InputWrapper>
              {[
                "공격자 정보",
                "공격 이벤트 정리",
                "공격 대상 (리소스)",
                "공격 유형 (Tatic, Technique)",
                "로그 포함하기",
                "공격근거 포함하기",
                "결과요약 포함하기",
              ].map((label, index) => (
                <S.Input>
                  <S.SwitchWrapper key={index}>
                    <S.SwitchSlider
                      checked={toggles[index]}
                      onClick={() => handleToggle(index)}
                    />
                  </S.SwitchWrapper>
                  <p>{label}</p>
                </S.Input>
              ))}
            </S.InputWrapper>
          </S.ContentSelect>
        </S.ContentSelectWrapper>
        <S.ContentPromptWrapper>
          <S.ContentPromptTitle>
            <h1>Prompt</h1>
          </S.ContentPromptTitle>
          <S.ContentPromptInnerText>
            아직 지원되지 않는 기능입니다.
          </S.ContentPromptInnerText>
          <S.SaveButton onClick={() => console.log(toggles)}>Save</S.SaveButton>
        </S.ContentPromptWrapper>
      </S.ContentWrapper>
    </S.Wrapper>
  );
};

export default ViewReportForm;
