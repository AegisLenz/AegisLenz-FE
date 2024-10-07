import * as S from "./ToggleChat_style";
import InnerChat from "./innerchat/InnerChat";

const ToggleChat = ({
  ChatToggleButton,
  isChattoggleOpen,
  setChatToggleOpen,
  sizeFull,
}) => {
  return (
    <S.Wrapper isOpen={isChattoggleOpen} sizeFull={sizeFull}>
      {sizeFull ? (
        <InnerChat isOpen={isChattoggleOpen} isFull={sizeFull} />
      ) : (
        ""
      )}
      <S.ChatBox isOpen={isChattoggleOpen}>
        {sizeFull ? (
          ""
        ) : (
          <InnerChat isOpen={isChattoggleOpen} isFull={sizeFull} />
        )}
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
            sizeFull={sizeFull}
          ></S.ToggleButton>
          <S.SendButton
            isOpen={isChattoggleOpen}
            sizeFull={sizeFull}
          ></S.SendButton>
        </S.ChatInputWrapper>
      </S.ChatBox>
    </S.Wrapper>
  );
};

export default ToggleChat;
