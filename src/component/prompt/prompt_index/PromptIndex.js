import * as S from "./PromptIndex_style";

const testData = [
  ["2024-10-15", "로그 조회"],
  ["2024-10-13", "공격 경로 확인"],
];

const Prompt = ({ SideIndex, isSideIndex }) => {
  return (
    <S.Wrapper>
      <S.OuterToggleArea isSideToggle={isSideIndex}>
        <S.SideOuterToggle
          onClick={() => SideIndex((prev) => !prev)}
          path={"/icon/double_arrow.svg"}
        />
        <S.SideOuterToggle path={"/icon/add_page.svg"} />
      </S.OuterToggleArea>

      <S.SideIndex isSideToggle={isSideIndex}>
        <S.TopArea>
          <S.SideInnerToggle
            onClick={() => SideIndex((prev) => !prev)}
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
