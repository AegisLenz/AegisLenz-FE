import * as S from "./PromptContent_style";
import GridArea from "../../grid/GridWrapper";

const PromptContent = ({ isSideContent, MarkData, SideContent }) => {
  return (
    <S.Wrapper>
      <S.GridWrapper isSideToggle={isSideContent}>
        <S.SideInnerToggle
          onClick={() => SideContent(false)}
          path={"/icon/double_arrow.svg"}
        />
        {isSideContent ? (
          <GridArea MarkData={MarkData} Gridtype={"prompt"} />
        ) : (
          ""
        )}
      </S.GridWrapper>
    </S.Wrapper>
  );
};

export default PromptContent;
