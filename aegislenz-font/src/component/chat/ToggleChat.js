import { useState } from "react";
import * as S from "./ToggleChat_style";

function ToggleChat() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <S.Wrapper>
      <S.ChatBox isOpen={isOpen}>
        <S.AI_Icon src="/icon/AI_Icon_Green.svg"></S.AI_Icon>
        <S.ChatInputWrapper>
          <S.ChatInput
            onFocus={() => {
              setIsOpen(true);
            }}
            isOpen={isOpen}
            placeholder="Use Prompt..."
          ></S.ChatInput>
          <S.ToggleButton onClick={toggleChat} isOpen={isOpen}></S.ToggleButton>
        </S.ChatInputWrapper>
      </S.ChatBox>
    </S.Wrapper>
  );
}

export default ToggleChat;
