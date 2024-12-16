import { useState, useEffect } from "react";
import * as S from "./Alert_style";
import useAlertSSE from "../hook/Alert/AlertHook";

const Alert = ({ setChatToggleOpen, getPromptSession, InAlert }) => {
  const [AlertData, setAlertData] = useState([
    {
      is_attack: true,
      technique: "string",
      tactic: "string",
      prompt_session_id: "673723b837274528bb2daf13",
      id: Date.now(),
    },
  ]);

  const { connectSSE } = useAlertSSE();
  useEffect(() => {
    connectSSE((newData) => {
      setAlertData((prevData) => [...prevData, { ...newData, id: Date.now() }]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAlertBubbleClick = (e) => {
    if (e.prompt_session_id !== undefined) {
      getPromptSession(e.prompt_session_id);
    }

    setIsOpen(false);
    setChatToggleOpen(true);
    InAlert();
  };
  const handleCancleToggleClick = (e) => {
    setAlertData((prevData) => prevData.filter((alert) => alert.id !== e.id));
  };
  const [isOpen, setIsOpen] = useState(false); // ToolBar 열림 상태
  const [isHoverIndex, setIsHoverIndex] = useState(false); // Hover 상태
  const [isHoverIcon, setIsHoverIcon] = useState(false);

  // useEffect(() => {
  //   let timeoutId;

  //   if (isHoverIcon || isHoverIndex) {
  //     setIsOpen(true);
  //   } else {
  //     timeoutId = setTimeout(() => {
  //       setIsOpen(false);
  //     }, 2000); // 1초 딜레이
  //   }
  //   return () => {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId);
  //     }
  //   };
  // }, [isHoverIcon, isHoverIndex]);

  return (
    <S.FixedWrapper ishovered={isOpen || undefined}>
      {/* AlertData가 있을 때만 AlertIcon을 보여줌 */}
      {AlertData.length > 0 && (
        <S.AlertIconWrapper
          onMouseEnter={() => setIsHoverIndex(true)} // Hover 상태 유지
          onMouseLeave={() => setIsHoverIndex(false)} // 닫기 동작 실행
        >
          <S.AlertIcon
            onMouseEnter={() => setIsHoverIcon(true)}
            onMouseLeave={() => setIsHoverIcon(false)}
            onClick={() => setIsOpen(false)}
          />
        </S.AlertIconWrapper>
      )}
      {AlertData.map((alert) => (
        <S.AlertBubble
          key={alert.id}
          isRemoving={alert.isRemoving}
          onClick={() => handleAlertBubbleClick(alert)}
        >
          <S.CancleToggle
            onClick={(e) => {
              setIsOpen(false);
              e.stopPropagation(); // 부모 요소로의 클릭 이벤트 전파 방지
              handleAlertBubbleClick(alert);
              handleCancleToggleClick(alert);
            }}
          />
          <h3>{alert.technique + alert.tactic}</h3>
          <p>{"test"}</p>
        </S.AlertBubble>
      ))}
    </S.FixedWrapper>
  );
};

export default Alert;
