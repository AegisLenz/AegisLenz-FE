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
  getReportData,
  setESResultData,
  setDBResultData,
  getGraphData,
  getPromptSession,
  getGraphDataPrompt,
  type,
}) => {
  const [inputValue, setInputValue] = useState("");

  const [session, setSession] = useState("");

  const [ChatData, setChatData] = useState([]);
  const [SuggestData, setSuggestData] = useState([
    "EC2 인스턴스 i-01c646c4b28fcf780의 IAM 역할과 정책을 확인하여, 현재 할당된 권한과 최근 90일간 사용자의 권한 변화를 비교해 주세요.",
    "MongoDB에서 IAM 사용자 'Victim'의 현재 권한과 90일간 사용된 권한을 비교하여 불필요한 권한 또는 의심스러운 액세스를 확인할 수 있도록 해 주세요.",
    "공격자가 성공적으로 탐색하고자 했던 IAM 역할 목록('testrole', 'AWSServiceRoleForTrustedAdvisor', 'AWSServiceRoleForSupport')에 대해 각 역할의 현재 정책 및 연관된 사용자 정보를 제공해 주세요.",
  ]);

  const [isDataLoaded, setIsDataLoaded] = useState(false); // useEffect 완료 상태 관리

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 세션 관리
        const fetchPromptsContents = async () => {
          if (promptSession) {
            setSession(promptSession);
          }
          if (type === "prompt" && promptSession === "") {
            setSession("");
          }
        };

        // 대화 불러오기
        const fetchPrevChat = async (Session) => {
          if (Session !== "") {
            const data = await GetPromptContents(Session);
            if (data.chats !== null) {
              setChatData(data.chats);
            }
            if (data.report !== null) {
              getReportData(data.report);
            }
            if (data.attack_graph !== null) {
              getGraphData(data.attack_graph);
            }
            if (
              data.init_recommend_questions !== null &&
              data.init_recommend_questions.length !== 0
            ) {
              setSuggestData([]);
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
              setChatData((prev) => [
                ...prev,
                {
                  text: "무엇을 도와드릴까요?\n\n",
                  isUser: false,
                  isBookmark: true,
                },
              ]);
            }
          }
          if (promptSession === "") {
            setChatData([]);
          }
        };

        // 순차적으로 실행
        await fetchPromptsContents();
        if (promptSession || promptSession === "") {
          await fetchPrevChat(promptSession);
        }

        setIsDataLoaded(true); // 데이터 로딩 완료 상태 업데이트
      } catch (error) {
        console.error("Error during fetching data:", error);
        setIsDataLoaded(true); // 실패 시에도 완료 상태로 업데이트
      }
    };

    //실행
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promptSession, type]);

  useEffect(() => {
    if (ChatData.length === 0) {
      setChatData((prev) => [
        ...prev,
        {
          text: "안녕하세요! AegisLenz의 사용자 도우미 Aegis입니다!\n무엇을 도와드릴까요?",
          isUser: false,
          isFirst: true,
          isBookmark: true,
        },
      ]);
    }
  }, [ChatData]);

  const handleMarkData = (data) => {
    if (data && data.length > 0) {
      const Arraydata = [...new Set([...data, "scroll", "chat", "ShowLog"])];
      markData(Arraydata);
    }
  };

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
    setChatData((prev) => [
      ...prev,
      {
        text: "무엇을 도와드릴까요?\n\n",
        isUser: false,
        isBookmark: true,
      },
    ]);
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
      updatedChatData[index].isESQuery = `${JSON.stringify(data, null, 2)}`;
      return updatedChatData;
    });
  };
  const handleESResult = (data) => {
    setESResultData(data);
  };
  const handleDBQuery = (data, index) => {
    setChatData((prev) => {
      const updatedChatData = [...prev];
      updatedChatData[index].isQuery = true;
      updatedChatData[index].isDBQuery = `${JSON.stringify(data, null, 2)}`;
      return updatedChatData;
    });
  };
  const handleDBResult = (data) => {
    setDBResultData(data);
  };

  // API 호출 및 데이터 처리
  const SendMessage = async (inputValue, session) => {
    setChatData((prev) => prev.filter((msg) => !msg.isBookmark));
    if (!isDataLoaded) {
      console.error(
        "데이터가 아직 로드되지 않았습니다. 잠시 후 다시 시도하세요."
      );
      return;
    }

    setChatData((prev) => [
      ...prev,
      { text: "", isUser: false, isStreem: true },
    ]);
    const messageIndex = ChatData.length;
    if (!session || session === "") {
      // session이 빈 문자열 또는 undefined일 경우
      try {
        const NewSession = await CreateSession();
        setSession(NewSession.prompt_session_id);

        // session 업데이트 후 실행을 보장
        session = NewSession.prompt_session_id;
      } catch (error) {
        console.error("새 세션 생성 중 오류 발생:", error);
        return; // 에러 발생 시 Prompthook 호출 중단
      }
    }
    try {
      // Prompthook 호출 시 스트림 데이터 처리 콜백 전달
      await Prompthook(
        inputValue,
        session,
        (data) => handleMarkData(data),
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
  const handleSendMessage = async () => {
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
  const [isComposing, setIsComposing] = useState(false);

  // IME 입력 시작
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  // IME 입력 종료
  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  // 엔터로 값 집어넣기
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isComposing) {
      handleSendMessage();
    }
  };

  const addExample = (value) => {
    if (value.trim() === "") return; // 빈 입력 방지
    setInputValue(value);
  };

  return (
    <S.Wrapper isOpen={isChattoggleOpen} sizeFull={sizeFull}>
      {!setIsDataLoaded ? (
        "로딩중"
      ) : (
        <>
          <InnerChat
            isOpen={isChattoggleOpen}
            isFull={sizeFull}
            chatData={ChatData}
            addExample={addExample}
            SuggestData={SuggestData}
          />
          <S.ChatBox isOpen={isChattoggleOpen}>
            <S.ChatInputWrapper isOpen={isChattoggleOpen}>
              <S.AiIcon sizeFull={sizeFull} />
              <S.Input>
                <S.ChatInput
                  value={inputValue}
                  onFocus={setChatToggleOpen}
                  onChange={(e) => setInputValue(e.target.value)}
                  onCompositionStart={handleCompositionStart}
                  onCompositionEnd={handleCompositionEnd}
                  onKeyDown={handleKeyDown}
                  isOpen={isChattoggleOpen}
                  isFull={sizeFull}
                  placeholder="질문을 입력해 주세요"
                />
                <S.InputUnderbar isOpen={isChattoggleOpen} />
              </S.Input>
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
        </>
      )}
    </S.Wrapper>
  );
};

export default ToggleChat;
