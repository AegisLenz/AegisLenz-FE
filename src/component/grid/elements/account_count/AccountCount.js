import * as S from "./AccountCount_style";
import { useState, useRef, useEffect } from "react";
function SideBar() {
  const ColorList = [
    { key: "IAM", color: "#216261" },
    { key: "Kubernetes", color: "#6A4FA3" },
    { key: "Network", color: "#CD62B0" },
  ];
  // eslint-disable-next-line no-unused-vars
  const [AccountCountList, setAccountCountList] = useState({
    IAM: 102312,
    Kubernetes: 10,
    Network: 5,
  });
  const [fontSize, setFontSize] = useState(16);
  const innerWrapperRef = useRef(null);

  useEffect(() => {
    // ResizeObserver를 사용해 div 크기 변화 감지
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        const newFontSize = width * 0.05; // 너비의 5%로 폰트 크기 설정 (비율은 필요에 맞게 조절 가능)
        setFontSize(newFontSize);
      }
    });

    if (innerWrapperRef.current) {
      resizeObserver.observe(innerWrapperRef.current); // 요소 크기 관찰 시작
    }
  }, []);

  return (
    <S.Wrapper>
      {ColorList.map(({ key, color }) => (
        <S.InnerWrapper key={key} color={color} ref={innerWrapperRef}>
          <S.Index fontSize={fontSize}>{`${key}\nResources`}</S.Index>
          <S.Number fontSize={fontSize}>{AccountCountList[key]}</S.Number>
        </S.InnerWrapper>
      ))}
    </S.Wrapper>
  );
}

export default SideBar;
