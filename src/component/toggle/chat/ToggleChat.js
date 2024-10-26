import * as S from "./ToggleChat_style";
import { useState } from "react";
import InnerChat from "./innerchat/InnerChat";
import Prompthook from "../../hook/Hook";

const ToggleChat = ({
  ChatToggleButton,
  isChattoggleOpen,
  setChatToggleOpen,
  sizeFull,
  markData,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [ChatData, setChatData] = useState([
    {
      text: "안녕하세요! AegisLenz의 사용자 도우미 Aegis입니다!\n무엇을 도와드릴까요?\n\n저는 이런 질문들을 도와드릴 수 있어요!\n\n",
      isUser: false,
      isFirst: true,
      isQuery: `{
      "query": {
        "bool": {
          "must": [
            {
              "term": {
                "eventName": "CreateUser"
              }
            },
            {
              "range": {
                "eventTime": {
                  "gte": "now-7d/d",
                  "lt": "now/d"
                }
              }
            }
          ]
        }
      }
    }`,
    },
  ]);

  // 로딩 상태관리
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  const handleStreamData = (currentText, index) => {
    // 특정 인덱스의 메시지를 업데이트
    setChatData((prevChatData) => {
      const updatedChatData = [...prevChatData];
      updatedChatData[index].text = currentText; // 실시간으로 데이터 업데이트
      return updatedChatData;
    });
  };

  // 스트림이 완료되었을 때 호출되는 함수
  const handleStreamComplete = (finalText, index) => {
    setLoading(false); // 로딩 상태 종료
    setChatData((prev) => {
      const updatedChatData = [...prev];
      updatedChatData[index].text = finalText; // 최종 데이터를 해당 인덱스에 설정
      updatedChatData[index].isUser = false;
      updatedChatData[index].isStreem = false;
      return updatedChatData;
    });
  };
  const handleLastChunk = (lastChunk) => {
    const originalString = lastChunk;

    // 1. 먼저 외부의 이중 따옴표를 제거하기 위해 다시 한번 replace 적용
    const cleanedString = originalString.replace(/\\"/g, '"');

    // 2. 첫 번째와 마지막 따옴표를 제거하여 배열로 변환할 수 있는 형태로 만듭니다
    const jsonString = cleanedString.slice(1, -1);
    // 2. 문자열을 실제 배열로 파싱
    const parsedArray = JSON.parse(jsonString);
    console.log(parsedArray);
    markData(parsedArray);
  };
  // API 호출 및 데이터 처리
  const SendMessage = async (inputValue) => {
    setLoading(true); // API 호출 시작 전에 로딩 상태 설정

    setChatData((prev) => [
      ...prev,
      { text: "", isUser: false, isStreem: true },
    ]);
    const messageIndex = ChatData.length + 1; // 새로 추가할 요소의 인덱스
    try {
      // Prompthook 호출 시 스트림 데이터 처리 콜백 전달
      await Prompthook(
        inputValue,
        (currentText) => handleStreamData(currentText, messageIndex),
        (finalText) => handleStreamComplete(finalText, messageIndex),
        handleLastChunk
      );
    } catch (error) {
      setChatData((prev) => prev.filter((msg) => !msg.isLoading));
      // 에러 발생 시 로딩 메시지를 오류 메시지로 변경
      setChatData((prev) =>
        prev.map((msg, idx) =>
          idx === messageIndex
            ? { ...msg, text: "Server Connect Error", isUser: false }
            : msg
        )
      );
    } finally {
      setLoading(false); // API 호출 완료 후 로딩 상태 종료
    }
  };

  // 토글에 데이터 입력
  const handleSendMessage = () => {
    if (inputValue.trim() === "") return; // 빈 입력 방지

    // 현재 입력값 추가
    setChatData((prevChatData) => [
      ...prevChatData,
      {
        text: inputValue,
        isUser: true,
      },
    ]);

    SendMessage(inputValue);

    // 입력 초기화
    setInputValue("");
  };
  // 엔터로 값 집어넣기
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const addExample = (value) => {
    if (value.trim() === "") return; // 빈 입력 방지

    // 현재 입력값 추가
    setChatData((prevChatData) => [
      ...prevChatData,
      {
        text: value,
        isUser: true,
      },
    ]);

    SendMessage(value);

    // 입력 초기화
    setInputValue("");
  };

  return (
    <S.Wrapper isOpen={isChattoggleOpen} sizeFull={sizeFull}>
      <InnerChat
        isOpen={isChattoggleOpen}
        isFull={sizeFull}
        chatData={ChatData}
        addExample={addExample}
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
