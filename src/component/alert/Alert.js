import { useState, useEffect } from "react";
import * as S from "./Alert_style";
import useAlertSSE from "../hook/Alert/AlertHook";

const Alert = ({ setChatToggleOpen, getPromptSession, InAlert }) => {
  const [AlertData, setAlertData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHoverIndex, setIsHoverIndex] = useState(false);
  const [isHoverIcon, setIsHoverIcon] = useState(false);

  const { connectSSE } = useAlertSSE();

  useEffect(() => {
    connectSSE(
      (newData) => {
        const mappedData = {
          technique: newData.mitreAttackTechnique || "Unknown Technique",
          tactic: newData.mitreAttackTactic || "Unknown Tactic",
          prompt_session_id: newData.prompt_session_id || "N/A",
          id: Date.now(),
        };

        setAlertData((prevData) => {
          if (prevData.some((alert) => alert.prompt_session_id === mappedData.prompt_session_id)) {
            return prevData;
          }
          return [...prevData, mappedData].slice(-5);
        });
      },
      () => {
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
    setAlertData((prevData) => prevData.filter((a) => a.id !== alert.id));
  };

  useEffect(() => {
    let timeoutId;
    if (isHoverIcon || isHoverIndex) {
      setIsOpen(true);
    } else {
      timeoutId = setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isHoverIcon, isHoverIndex]);

  return (
    <S.FixedWrapper ishovered={isOpen || undefined}>
      {AlertData.length > 0 && (
        <S.AlertIconWrapper
          onMouseEnter={() => setIsHoverIndex(true)}
          onMouseLeave={() => setIsHoverIndex(false)}
        >
          <S.AlertIcon
            onMouseEnter={() => setIsHoverIcon(true)}
            onMouseLeave={() => setIsHoverIcon(false)}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </S.AlertIconWrapper>
      )}
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
