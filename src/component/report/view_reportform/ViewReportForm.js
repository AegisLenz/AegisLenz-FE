import { useState } from "react";
import * as S from "./ViewReportForm_style";

const ViewReportForm = () => {
  // eslint-disable-next-line no-unused-vars
  const [Index, setIndex] = useState([
    "보고서 형식 제목이 여기에 이렇게..",
    "보고서 형식 제목이...",
    "보고서 형식 제목이 여기에 이렇게..",
    "보고서 형식 제목이...",
  ]);

  return (
    <S.Wrapper>
      <S.IndexWrapper>
        <S.IndexHead>
          <h1>Report Index</h1>
        </S.IndexHead>
        {Index.map((prompt, index) => (
          <S.IndexBubble key={index}>
            <S.IndexDate>{"2024-10-15"}</S.IndexDate>
            <S.IndexTitle>{prompt}</S.IndexTitle>
          </S.IndexBubble>
        ))}
      </S.IndexWrapper>
      <S.ContentWrapper>
        <S.ContentSelectWrapper>
          <S.ContentSelectTitle>
            <h1>Form Edit</h1>
          </S.ContentSelectTitle>
          <S.ContentSelect>
            <S.InputWrapper>
              제목 :
              <input
                type="text"
                placeholder="입력하지 않으면 자동으로 생성됩니다."
              ></input>
            </S.InputWrapper>
            <S.InputWrapper>
              날짜 :
              <input
                type="text"
                placeholder="입력하지 않으면 생성 당시 날짜가 사용됩니다."
              ></input>
            </S.InputWrapper>
            <S.RadioButtonWrapper>
              <input type="checkbox" name="options1" value="option1" />
              로그 포함하기
            </S.RadioButtonWrapper>
            <S.RadioButtonWrapper>
              <input type="checkbox" name="options2" value="option2" />
              공격근거 포함하기
            </S.RadioButtonWrapper>
            <S.RadioButtonWrapper>
              <input type="checkbox" name="options3" value="option3" />
              결과요약 포함하기
            </S.RadioButtonWrapper>
          </S.ContentSelect>
        </S.ContentSelectWrapper>
        <S.ContentPromptWrapper>
          <S.ContentPromptTitle>
            <h1>Prompt</h1>
          </S.ContentPromptTitle>
          <S.ContentPromptInnerText>test</S.ContentPromptInnerText>
          <S.SaveButton onClick={() => {}}>Save</S.SaveButton>
        </S.ContentPromptWrapper>
      </S.ContentWrapper>
    </S.Wrapper>
  );
};

export default ViewReportForm;
