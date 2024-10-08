import * as S from "./PromptContent_style";
import GridArea from "../../grid/GridWrapper";

const PromptContent = ({ isSideContent, MarkData }) => {
  return (
    <S.Wrapper isSideToggle={isSideContent}>
      {isSideContent ? <GridArea MarkData={MarkData} isChatOFF={true} /> : ""}
    </S.Wrapper>
  );
};

export default PromptContent;
