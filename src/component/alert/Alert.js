import { useState, useEffect } from "react";
import * as S from "./Alert_style";
import useAlertSSE from "../hook/Alert/AlertHook";

const Alert = ({ setChatToggleOpen, getPromptSession, InAlert }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [AlertData, setAlertData] = useState([
    {
      is_attack: true,
      technique: "string",
      tactic: "string",
      prompt_session_id: "673723b837274528bb2daf13",
    },
  ]);

  const { connectSSE } = useAlertSSE();
  useEffect(() => {
    connectSSE();
  }, []);

  const handleAlertBubbleClick = (promptSessionId) => {
    setChatToggleOpen(true);
    getPromptSession(promptSessionId);
    InAlert();
  };

  return (
    <S.FixedWrapper isHovered={isHovered}>
      {/* AlertData가 있을 때만 AlertIcon을 보여줌 */}
      {AlertData.length > 0 && (
        <S.AlertIconWrapper onMouseEnter={() => AlertData.length > 0}>
          <S.AlertIcon
            onMouseEnter={() => AlertData.length > 0 && setIsHovered(true)}
            onClick={() => setIsHovered(false)}
          />
        </S.AlertIconWrapper>
      )}
      {AlertData.map((alert) => (
        <S.AlertBubble
          key={alert.id}
          isRemoving={alert.isRemoving}
          onClick={() => {
            setChatToggleOpen(true);
            getPromptSession(alert.prompt_session_id);
            InAlert();
          }}
        >
          <S.CancleToggle onClick={() => {}} />
          <h3>{alert.technique + alert.tactic}</h3>
          <p>{"test"}</p>
        </S.AlertBubble>
      ))}
    </S.FixedWrapper>
  );
};

export default Alert;
