import * as S from "./ToggleChat_style";
import { useState } from "react";
import InnerChat from "./innerchat/InnerChat";

const ToggleChat = ({
  ChatToggleButton,
  isChattoggleOpen,
  setChatToggleOpen,
  sizeFull,
  SideContent,
  markData,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [ChatData, setChatData] = useState([
    {
      text: "안녕하세요! AegisLenz의 사용자 도우미 Aegis입니다!\n무엇을 도와드릴까요?",
      isUser: false,
    },
  ]);

  const SendMessage = () => {
    //api 호출
    const APIanswer = {
      text: "현재 개발중입니다!",
      Data: ["Detection", "NeedCheck"],
    };

    setChatData((prev) => [
      ...prev,
      {
        text: APIanswer["text"],
        isUser: false,
      },
    ]);

    //오른쪽에 인터랙티브하게 데이터 ON/OFF
    SideContent();

    //띄울 데이터
    markData(APIanswer["Data"]);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return; // 빈 입력 방지

    setChatData((prevChatData) => [
      ...prevChatData,
      {
        text: inputValue,
        isUser: true,
      },
    ]);

    SendMessage();

    // 입력 초기화
    setInputValue("");
  };

  // 엔터로 값 집어넣기
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <S.Wrapper isOpen={isChattoggleOpen} sizeFull={sizeFull}>
      <InnerChat
        isOpen={isChattoggleOpen}
        isFull={sizeFull}
        chatData={ChatData}
      />
      <S.ChatBox isOpen={isChattoggleOpen}>
        <S.ChatInputWrapper>
          <S.AiIcon sizeFull={sizeFull} />
          <S.ChatInput
            value={inputValue}
            onFocus={setChatToggleOpen}
            onChange={(e) => setInputValue(e.target.value)}
            isOpen={isChattoggleOpen}
            isFull={sizeFull}
            onKeyDown={handleKeyDown}
            placeholder="Use Prompt..."
          />
          <S.SendButton
            isOpen={isChattoggleOpen}
            sizeFull={sizeFull}
            onClick={handleSendMessage}
          />
          <S.ToggleButton
            onClick={ChatToggleButton}
            isOpen={isChattoggleOpen}
            sizeFull={sizeFull}
          />
        </S.ChatInputWrapper>
      </S.ChatBox>
    </S.Wrapper>
  );
};

export default ToggleChat;
