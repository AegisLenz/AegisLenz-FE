import * as S from "./ToggleChat_style";
import { useState, useEffect } from "react";
import InnerChat from "./innerchat/InnerChat";
import GetPromptContents from "../../hook/Prompt/GetPromptContents";
import Prompthook from "../../hook/Prompt/Prompthook";
import CreateSession from "../../hook/Prompt/CreateNewPrompt";

const ToggleChat = ({
  ChatToggleButton,
  isChattoggleOpen,
  setChatToggleOpen,
  sizeFull,
  markData,
  promptSession,
  promptIndex,
  getPromptSession,
  getReportData,
}) => {
  const [inputValue, setInputValue] = useState("");

  const [session, setSession] = useState();

  const [ChatData, setChatData] = useState([]);
  const [SuggestData, setSuggestData] = useState([]);

  const [ESResult, setESResult] = useState([]);
  const [DBResult, setDBResult] = useState([]);

  //ESResult, DBResult에 따라 markData수정
  // useEffect(() => {
  //   if (ESResult && DBResult) {
  //     markData();
  //   }
  // }, [ESResult, DBResult]);

  //이전 대화 기록 불러오기
  useEffect(() => {
    const fetchPromptsContents = async () => {
      try {
        let session = "";
        if (promptSession) {
          session = promptSession;
        } else {
          if (promptIndex.length !== 0) {
            session = promptIndex[0];
          } else {
            const NewSession = await CreateSession();
            session = NewSession.prompt_session_id;
            getPromptSession(NewSession.prompt_session_id);
          }
        }

        if (promptSession === "Grid") {
          const NewSession = await CreateSession();
          session = NewSession.prompt_session_id;
          getPromptSession(NewSession.prompt_session_id);
        }

        if (session !== "") {
          setSession(session);
          const data = await GetPromptContents(session);
          setChatData(data.chats);
          getReportData(data.report);
          if (
            data.init_recommend_questions.length !== null &&
            data.init_recommend_questions.length !== 0
          ) {
            setSuggestData(data.init_recommend_questions);
            setChatData((prev) => [
              ...prev,
              {
                text: "다음 입력하실 질문을 예측해 봤습니다.",
                isUser: false,
                isFirst: true,
                isStart: true,
              },
            ]);
          } else {
            setSuggestData([]);
          }
        } else {
          console.log("No valid session available");
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchPromptsContents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promptSession]);

  useEffect(() => {
    if (ChatData.length === 0) {
      setChatData((prev) => [
        ...prev,
        {
          text: "안녕하세요! AegisLenz의 사용자 도우미 Aegis입니다!\n무엇을 도와드릴까요?\n\n저는 이런 질문들을 도와드릴 수 있어요!\n\n",
          isUser: false,
          isFirst: true,
        },
      ]);
    }
  }, [ChatData]);

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
    setChatData((prev) => {
      const updatedChatData = [...prev];
      updatedChatData[index].text = finalText; // 최종 데이터를 해당 인덱스에 설정
      updatedChatData[index].isUser = false;
      updatedChatData[index].isStreem = false;
      return updatedChatData;
    });
    if (SuggestData !== null && SuggestData.length !== 0) {
      setChatData((prev) => [
        ...prev,
        {
          text: "다음 입력하실 질문을 예측해 봤습니다.",
          isUser: false,
          isFirst: true,
          isStart: true,
        },
      ]);
    }
  };

  const handleRecommendQuestionsChunk = (data) => {
    if (data !== null && data.length !== 0) {
      setSuggestData(data);
    } else {
      setSuggestData([]);
    }
  };

  const handleESQuery = (data, index) => {
    setChatData((prev) => {
      const updatedChatData = [...prev];
      updatedChatData[index].isQuery = true;
      updatedChatData[index].isESQuery = data;
      return updatedChatData;
    });
  };
  const handleESResult = (data) => {
    if (data.length !== 0) {
      setESResult(data);
    }
  };
  const handleDBQuery = (data, index) => {
    setChatData((prev) => {
      const updatedChatData = [...prev];
      updatedChatData[index].isQuery = true;
      updatedChatData[index].isDBQuery = data;
      return updatedChatData;
    });
  };
  const handleDBResult = (data) => {
    if (data.length !== 0) {
      setDBResult(data);
    }
  };

  // API 호출 및 데이터 처리
  const SendMessage = async (inputValue, session) => {
    if (!session) {
      console.error("Session 값이 정의되지 않았습니다.");
      return;
    }

    setChatData((prev) => [
      ...prev,
      { text: "", isUser: false, isStreem: true },
    ]);
    const messageIndex = ChatData.length + 1; // 새로 추가할 요소의 인덱스

    try {
      // Prompthook 호출 시 스트림 데이터 처리 콜백 전달
      await Prompthook(
        inputValue,
        session,
        (currentText) => handleStreamData(currentText, messageIndex),
        (finalText) => handleStreamComplete(finalText, messageIndex),
        handleRecommendQuestionsChunk,
        (data) => handleESQuery(data, messageIndex),
        (data) => handleESResult(data),
        (data) => handleDBQuery(data, messageIndex),
        (data) => handleDBResult(data)
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

    SendMessage(inputValue, session);

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

    SendMessage(value, session);

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
        SuggestData={SuggestData}
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
