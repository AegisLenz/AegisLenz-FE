import * as S from "./ToggleChat_style";

const ToggleChat = ({
  ChatToggleButton,
  isChattoggleOpen,
  setChatToggleOpen,
}) => {
  return (
    <S.Wrapper isOpen={isChattoggleOpen}>
      <S.ChatBox isOpen={isChattoggleOpen}>
        <S.AI_Icon src="/icon/AI_Icon_Green.svg"></S.AI_Icon>
        <S.ChatInputWrapper>
          <S.ChatInput
            onFocus={setChatToggleOpen}
            isOpen={isChattoggleOpen}
            placeholder="Use Prompt..."
          ></S.ChatInput>
          <S.ToggleButton
            onClick={ChatToggleButton}
            isOpen={isChattoggleOpen}
          ></S.ToggleButton>
        </S.ChatInputWrapper>
      </S.ChatBox>
    </S.Wrapper>
  );
};

export default ToggleChat;
