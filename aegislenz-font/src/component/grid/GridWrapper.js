import * as S from "./Grid_style";
import { useState, useEffect } from "react";
import ToggleChat from "../chat/ToggleChat";

function Grid() {
  const [isChattoggleOpen, setChatToggle] = useState(false);
  const [divElements, setDivElements] = useState([
    <S.BasicItenDiv key="1">text</S.BasicItenDiv>,
    <S.BasicItenDiv key="2">text</S.BasicItenDiv>,
    <S.BasicItenDiv key="3">text</S.BasicItenDiv>,
    <S.BasicItenDiv key="4">text</S.BasicItenDiv>,
  ]);

  const ChatToggleButton = () => {
    setChatToggle((prev) => !prev);
  };

  const setChatToggleOpen = () => {
    setChatToggle(true);
  };

  useEffect(() => {
    if (isChattoggleOpen) {
      setDivElements((prevElements) => [
        ...prevElements,
        <S.BasicItenDiv key={prevElements.length + 1}>text</S.BasicItenDiv>,
      ]);
    } else if (!isChattoggleOpen && divElements.length > 4) {
      // Remove the last added div when chat is closed
      setDivElements((prevElements) => prevElements.slice(0, -1));
    }
  }, [isChattoggleOpen]);

  return (
    <S.Wrapper>
      <ToggleChat
        ChatToggleButton={ChatToggleButton}
        setChatToggleOpen={setChatToggleOpen}
        isChattoggleOpen={isChattoggleOpen}
      />
      <S.Ldiv>
        <S.ChatAreaDiv chatToggleOpen={isChattoggleOpen}></S.ChatAreaDiv>
      </S.Ldiv>
      {isChattoggleOpen ? (
        <S.Rdiv_scroll>{divElements}</S.Rdiv_scroll>
      ) : (
        <S.Rdiv>{divElements}</S.Rdiv>
      )}
    </S.Wrapper>
  );
}

export default Grid;
