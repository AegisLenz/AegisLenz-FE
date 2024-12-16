import { useEffect, useState, useRef } from "react";
import GridLayout from "react-grid-layout";
import * as S from "./Risk_style";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const Risk = () => {
  const indexWrapperRefs = useRef([]); // 각 IndexWrapper 참조 배열
  const [dimensions, setDimensions] = useState({});

  const [Data, setData] = useState({
    MFA_not_enabled_for_root_user: ["Information", "Debug"],
    MFA_not_enabled_for_users: ["Notice", "Error"],
    default_security_groups_allow_traffic: ["Warning"],
  });

  // 각 IndexWrapper의 크기를 동적으로 계산
  useEffect(() => {
    const calculateDimensions = () => {
      const newDimensions = {};
      indexWrapperRefs.current.forEach((ref, idx) => {
        if (ref) {
          const key = Object.keys(Data)[idx];
          newDimensions[key] = {
            width: ref.clientWidth,
            height: ref.clientHeight,
          };
        }
      });
      setDimensions(newDimensions);
    };

    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);

    return () => {
      window.removeEventListener("resize", calculateDimensions);
    };
  }, [Data]);

  // 각 항목을 개별 GridLayout으로 생성
  const grids = Object.entries(Data).map(([key, values], idx) => (
    <S.IndexWrapper key={key}>
      <S.CountWrapper>
        <p>{key}</p>
        <h1>{values.length}</h1> {/* 해당 항목의 데이터 개수를 출력 */}
      </S.CountWrapper>
      <S.Index
        ref={(el) => (indexWrapperRefs.current[idx] = el)} // 각 Wrapper를 refs 배열에 저장
      >
        {dimensions[key] && (
          <GridLayout
            className="layout"
            cols={2}
            rowHeight={50}
            width={dimensions[key].width} // IndexWrapper의 너비 적용
            height={dimensions[key].height} // IndexWrapper의 높이 적용
            isDraggable={false}
            isResizable={false}
          >
            <div key={`${key}-content`} data-grid={{ x: 0, y: 0, w: 2, h: 1 }}>
              {values.map((item, i) => (
                <S.Label key={i}>{item}</S.Label>
              ))}
            </div>
          </GridLayout>
        )}
      </S.Index>
    </S.IndexWrapper>
  ));

  return (
    <S.Wrapper>
      <S.Title>Risk</S.Title>
      <S.ContentWrapper>{grids}</S.ContentWrapper>
    </S.Wrapper>
  );
};

export default Risk;
