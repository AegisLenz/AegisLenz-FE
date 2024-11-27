import { useState } from "react";
import * as S from "./ViewReportForm_style";

const ViewReportForm = () => {
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
      <S.ContetnWrapper></S.ContetnWrapper>
    </S.Wrapper>
  );
};

export default ViewReportForm;
