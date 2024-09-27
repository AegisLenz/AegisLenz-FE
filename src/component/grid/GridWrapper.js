import * as S from "./Grid_style";
import { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ChatToggle from "../chat/ToggleChat";
import FilterToggle from "../filter/Filter";

function Grid() {
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
    { i: "1", x: 0, y: 0, w: 4, h: 2, isResizable: false },
    { i: "2", x: 4, y: 0, w: 4, h: 2 },
    { i: "3", x: 8, y: 1, w: 4, h: 2 },
    { i: "4", x: 0, y: 2, w: 4, h: 2 },
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
        { i: "1", x: 0, y: 0, w: 47, h: 9, isResizable: false },
        { i: "2", x: 20, y: 0, w: 20, h: 5 },
        { i: "3", x: 0, y: 0, w: 20, h: 5 },
        { i: "4", x: 20, y: 0, w: 20, h: 5 },
      ]);
    }
  }, [isChattoggleOpen]);

  const rowHeight = window.innerHeight * 0.01;
  const width = window.innerWidth * 0.01;
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
        cols={95}
        rowHeight={rowHeight}
        width={width * 95}
        draggableHandle=".grid-item"
        style={{ backgroundColor: "transparent", padding: "2vh 0 0 0" }}
      >
        <S.GridElement
          key="chat"
          style={{ backgroundColor: "transparent" }}
        ></S.GridElement>
        <S.GridElement
          key="1"
          style={{ backgroundColor: "transparent" }}
        ></S.GridElement>
        <S.GridElement key="2" className="grid-item">
          Box 2
        </S.GridElement>
        <S.GridElement key="3" className="grid-item">
          Box 3
        </S.GridElement>
        <S.GridElement key="4" className="grid-item">
          Box 4
        </S.GridElement>
      </GridLayout>
    </S.Wrapper>
  );
}

export default Grid;
