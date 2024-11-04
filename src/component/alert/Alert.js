import * as S from "./Alert_style";
import { useState, useEffect } from "react";

const Alert = ({ setChatToggleOpen }) => {
  const [AlertData, setAlertData] = useState([
    { id: 1, title: "tatic-103", contents: "원젠데요...", isRemoving: false },
    { id: 2, title: "tatic-104", contents: "원젠데요...", isRemoving: false },
  ]);
  const [isHovered, setIsHovered] = useState(false);

  const handleDeleteAlert = (id) => {
    // 삭제 애니메이션을 위해 isRemoving 상태를 true로 변경
    setAlertData((prevData) =>
      prevData.map((alert) =>
        alert.id === id ? { ...alert, isRemoving: true } : alert
      )
    );

    // 애니메이션이 끝난 후 데이터 삭제
    setTimeout(() => {
      setAlertData((prevData) => prevData.filter((alert) => alert.id !== id));
      setIsHovered(false);
    }, 300); // 애니메이션 시간과 동일하게 설정
  };

  useEffect(() => {
    // AlertData가 업데이트될 때 isRemoving을 false로 초기화하여 새로 추가된 항목에 등장 애니메이션 적용
    setAlertData((prevData) =>
      prevData.map((alert) => ({ ...alert, isRemoving: false }))
    );
  }, [AlertData.length]); // 데이터 길이에 따라 재렌더링

  return (
    <S.FixedWrapper isHovered={isHovered}>
      <S.AlertIconWrapper
        onMouseEnter={() => AlertData.length > 0 && setIsHovered(true)}
      >
        <S.AlertIcon />
      </S.AlertIconWrapper>
      {AlertData.map((alert) => (
        <S.AlertBubble
          key={alert.id}
          isRemoving={alert.isRemoving}
          onClick={() => {
            setChatToggleOpen(true);
          }}
        >
          <S.CancleToggle onClick={() => handleDeleteAlert(alert.id)} />
          <h3>{alert.title}</h3>
          <p>{alert.contents}</p>
        </S.AlertBubble>
      ))}
    </S.FixedWrapper>
  );
};

export default Alert;
