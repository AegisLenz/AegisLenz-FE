import { useState, useEffect } from "react";
import * as S from "./Alert_style";
import useAlertSSE from "../hook/Alert/AlertHook";

const Alert = ({ setChatToggleOpen, getPromptSession, InAlert }) => {
  const [AlertData, setAlertData] = useState([]);
  const [connectionError, setConnectionError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { connectSSE } = useAlertSSE();

  useEffect(() => {
    connectSSE(
      (newData) => {
        setConnectionError(false);
        console.log("수신된 SSE 데이터:", newData); 

        const mappedData = {
          technique: newData.mitreAttackTechnique || "Unknown Technique",
          tactic: newData.mitreAttackTactic || "Unknown Tactic",
          prompt_session_id: newData.prompt_session_id || "N/A",
          id: Date.now(),
        };

        console.log("매핑된 데이터:", mappedData);

        setAlertData((prevData) => {
          if (prevData.some((alert) => alert.prompt_session_id === mappedData.prompt_session_id)) {
            console.log("중복된 알림 데이터:", mappedData);
            return prevData;
          }

          const updatedData = [...prevData, mappedData];
          console.log("AlertData 업데이트 후:", updatedData);
          return updatedData.slice(-5);
        });
      },
      () => {
        setConnectionError(true);
        console.error("SSE 연결 실패!");
      }
    );
  }, [connectSSE]);

  const handleAlertBubbleClick = (alert) => {
    if (alert.prompt_session_id) {
      getPromptSession(alert.prompt_session_id);
    }
    setIsOpen(false);
    setChatToggleOpen(true);
    InAlert();
  };

  const handleCancleToggleClick = (alert) => {
    setAlertData((prevData) =>
      prevData.filter((item) => item.id !== alert.id)
    );
  };

  return (
    <S.FixedWrapper ishovered={isOpen || undefined}>
      {/* Alert Icon */}
      <S.AlertIconWrapper>
        <S.AlertIcon onClick={() => setIsOpen((prev) => !prev)} />
      </S.AlertIconWrapper>

      {/* 연결 에러 메시지 */}
      {connectionError && (
        <S.ErrorMessage>
          서버와의 연결이 끊어졌습니다. 재연결 중...
        </S.ErrorMessage>
      )}

      {/* 알림 데이터 표시 */}
      {AlertData.length > 0 ? (
        AlertData.map((alert) => (
          <S.AlertBubble key={alert.id} onClick={() => handleAlertBubbleClick(alert)}>
            <S.CancleToggle
              onClick={(e) => {
                e.stopPropagation();
                handleCancleToggleClick(alert);
              }}
            />
            <h3>{alert.technique + " / " + alert.tactic}</h3>
            <p>{alert.prompt_session_id}</p>
          </S.AlertBubble>
        ))
      ) : (
        <S.AlertBubble>
          <h3>공격 데이터 없음</h3>
          <p>SSE 데이터를 기다리는 중입니다...</p>
        </S.AlertBubble>
      )}
    </S.FixedWrapper>
  );
};

export default Alert;
