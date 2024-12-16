import { useEffect, useState } from "react";
import * as S from "./ViewReportForm_style";
import Loading2 from "../../toggle/loading2/loading2";
import GetFormReport from "../../hook/report/GeForm";

const ViewReportForm = () => {
  const [Index, setIndex] = useState([]);
  const [nowIndexLoad, setnowIndexLoad] = useState(true);

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
  });
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
