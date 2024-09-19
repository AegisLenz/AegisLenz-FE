import { useState } from "react";
import * as S from "./Grid_style";
import ToggleChat from "../chat/ToggleChat";

function Grid() {
  const [activeFrame, setActiveFrame] = useState(null);

  const handleClick = (index) => {
    setActiveFrame(index);
  };

  return (
    <S.Wrapper>
      <S.GridContainer>
        <ToggleChat></ToggleChat>
        <S.Figure key="toggle-chat" onClick={() => handleClick("toggle-chat")}>
          <S.FrameImage>Toggle Chat</S.FrameImage>
          <S.Figcaption>Toggle Chat Box</S.Figcaption>
        </S.Figure>
        {Array.from({ length: 6 }, (_, index) => (
          <S.Figure
            key={index}
            active={activeFrame === index}
            onClick={() => handleClick(index)}
          >
            <S.FrameImage>Frame {index + 1}</S.FrameImage>
            <S.Figcaption>Frame {index + 1} Caption</S.Figcaption>
          </S.Figure>
        ))}
      </S.GridContainer>
    </S.Wrapper>
  );
}

export default Grid;
