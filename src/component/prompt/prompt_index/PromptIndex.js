import * as S from "./PromptIndex_style";
import { useEffect, useState } from "react";

const testData = [
  ["2024-10-15", "로그 조회"],
  ["2024-10-13", "공격 경로 확인"],
];

const Prompt = ({ SideIndex }) => {
  const [isSideToggle, setSideToggle] = useState(true);
  useEffect(() => {
    if (isSideToggle) {
      SideIndex(true);
    } else {
      SideIndex(false);
    }
  }, [SideIndex, isSideToggle]);
  return (
    <S.Wrapper>
      <S.OuterToggleArea isSideToggle={isSideToggle}>
        <S.SideOuterToggle
          onClick={() => setSideToggle((prev) => !prev)}
          path={"/icon/double_arrow.svg"}
        />
        <S.SideOuterToggle path={"/icon/add_page.svg"} />
      </S.OuterToggleArea>

      <S.SideIndex isSideToggle={isSideToggle}>
        <S.TopArea>
          <S.SideInnerToggle
            onClick={() => setSideToggle((prev) => !prev)}
            path={"/icon/double_arrow.svg"}
          />
          <S.SideInnerToggle onClick={() => ""} path={"/icon/add_page.svg"} />
        </S.TopArea>
        <S.ContentsArea>
          {testData.map((row) => (
            <S.Content>
              <S.ContetnsDate>{row[0]}</S.ContetnsDate>
              <S.ContentsTitle>{row[1]}</S.ContentsTitle>
            </S.Content>
          ))}
        </S.ContentsArea>
      </S.SideIndex>
    </S.Wrapper>
  );
};

export default Prompt;
