import * as S from "./PromptIndex_style";
import { useEffect, useState } from "react";

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
      </S.SideIndex>
    </S.Wrapper>
  );
};

export default Prompt;
