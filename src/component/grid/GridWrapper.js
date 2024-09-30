import * as S from "./Grid_style";
import { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ChatToggle from "../toggle/chat/ToggleChat";
import FilterToggle from "../toggle/filter/Filter";
import AccountCount from "./elements/account_count/AccountCount";
// import Detection from "./elements/detection/AccountCount";
import DailyInsight from "./elements/daily_insight_report/DailyInsightReport";

const Grid = ({ isEditOn }) => {
  const [isChattoggleOpen, setChatToggle] = useState(false);
  const [isFilterOpen, setFilter] = useState(false);

  const ChatToggleButton = () => {
    setChatToggle((prev) => !prev);
  };

  const setChatToggleOpen = () => {
    setChatToggle(true);
  };

  const FilterToggleButton = () => {
    setFilter((prev) => !prev);
  };

  const setFilterOpen = () => {
    setFilter(true);
  };

  // 레이아웃 설정 (x, y, w, h: 각 박스의 초기 위치 및 크기)
  const [gridLayout, setGridLayout] = useState([
    {
      i: "chat",
      x: 0,
      y: 0,
      w: 47,
      h: 16,
      isResizable: false,
    },
    { i: "filter", x: 0, y: 0, w: 47, h: 8, isResizable: false },
    { i: "1", x: 4, y: 0, w: 4, h: 10 },
    { i: "2", x: 8, y: 1, w: 4, h: 2 },
    { i: "3", x: 0, y: 2, w: 4, h: 2 },
  ]);

  useEffect(() => {
    if (isChattoggleOpen) {
      setGridLayout((prevLayout) =>
        prevLayout.map((item) =>
          item.i === "chat" ? item : { ...item, x: 48 }
        )
      );
    } else {
      // 원래대로 복원
      setGridLayout([
        {
          i: "chat",
          x: 0,
          y: 0,
          w: 47,
          h: 3,
          isResizable: false,
        },
        { i: "filter", x: 0, y: 0, w: 47, h: 8, isResizable: false },
        { i: "1", x: 47, y: 0, w: 47, h: 10 },
        { i: "2", x: 0, y: 0, w: 20, h: 5 },
        { i: "3", x: 20, y: 0, w: 20, h: 5 },
      ]);
    }
  }, [isChattoggleOpen]);

  const [rowHeight, setrowHeight] = useState(window.innerHeight);
  const [width, setwidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setrowHeight(window.innerHeight); // 창 크기가 변할 때 rowHeight 업데이트
      setwidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <S.Wrapper>
      <ChatToggle
        isChattoggleOpen={isChattoggleOpen}
        ChatToggleButton={ChatToggleButton}
        setChatToggleOpen={setChatToggleOpen}
      />
      <FilterToggle
        isFilterOpen={isFilterOpen}
        isChattoggleOpen={isChattoggleOpen}
        FilterToggleButton={FilterToggleButton}
        setFilterOpen={setFilterOpen}
      />
      <GridLayout
        layout={gridLayout}
        cols={94}
        rowHeight={rowHeight * 0.01}
        width={width * 0.95}
        draggableHandle=".grid-item"
        style={{ backgroundColor: "transparent", padding: "2vh 0 0 0" }}
      >
        <S.GridElement key="chat"></S.GridElement>
        <S.GridElement key="filter"></S.GridElement>
        <S.GridElement key="1">
          <AccountCount />
          <S.MoveAreaInGrid
            className={isEditOn ? "grid-item" : ""}
            isEditOn={isEditOn}
          />
        </S.GridElement>
        <S.GridElement key="2">
          <DailyInsight />
          <S.MoveAreaInGrid
            className={isEditOn ? "grid-item" : ""}
            isEditOn={isEditOn}
          />
        </S.GridElement>
        <S.GridElement
          key="3"
          className="grid-item"
          style={{ backgroundColor: "white" }}
        >
          Box 4
        </S.GridElement>
      </GridLayout>
    </S.Wrapper>
  );
};

export default Grid;
