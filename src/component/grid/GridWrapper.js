import * as S from "./Grid_style";
import { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ChatToggle from "../chat/ToggleChat";

function Grid() {
  const [isChattoggleOpen, setChatToggle] = useState(false);

  const ChatToggleButton = () => {
    setChatToggle((prev) => !prev);
  };

  const setChatToggleOpen = () => {
    setChatToggle(true);
  };

  // 레이아웃 설정 (x, y, w, h: 각 박스의 초기 위치 및 크기)
  const [gridLayout, setGridLayout] = useState([
    {
      i: "chat",
      x: 0,
      y: 0,
      w: 49,
      h: 2,
      isResizable: false,
    },
    { i: "1", x: isChattoggleOpen ? 15 : 3, y: 1, w: 4, h: 2 },
    { i: "2", x: 4, y: 1, w: 4, h: 2 },
    { i: "3", x: 8, y: 1, w: 4, h: 2 },
    { i: "4", x: 0, y: 2, w: 4, h: 2 },
  ]);

  useEffect(() => {
    if (isChattoggleOpen) {
      // chat key 제외한 나머지 div들의 x 값을 16 이상으로 업데이트
      setGridLayout((prevLayout) =>
        prevLayout.map((item) =>
          item.i === "chat" ? item : { ...item, x: 50 }
        )
      );
    } else {
      // 원래대로 복원
      setGridLayout([
        {
          i: "chat",
          x: 0,
          y: 0,
          w: 49,
          h: 2,
          isResizable: false,
        },
        { i: "1", x: 3, y: 1, w: 4, h: 2 },
        { i: "2", x: 4, y: 1, w: 4, h: 100 },
        { i: "3", x: 8, y: 1, w: 4, h: 2 },
        { i: "4", x: 0, y: 2, w: 4, h: 2 },
      ]);
    }
  }, [isChattoggleOpen]);

  return (
    <S.Wrapper>
      <ChatToggle
        isChattoggleOpen={isChattoggleOpen}
        ChatToggleButton={ChatToggleButton}
        setChatToggleOpen={setChatToggleOpen}
      />
      <GridLayout
        layout={gridLayout}
        cols={95}
        rowHeight={30}
        width={document.documentElement.clientWidth * 0.95}
        draggableHandle=".grid-item"
      >
        <S.GridElement key="chat"></S.GridElement>
        <S.GridElement
          key="1"
          className="grid-item"
          style={{ backgroundColor: "#ccc" }}
        >
          Box 1
        </S.GridElement>
        <S.GridElement
          key="2"
          className="grid-item"
          style={{ backgroundColor: "#ddd" }}
        >
          Box 2
        </S.GridElement>
        <S.GridElement
          key="3"
          className="grid-item"
          style={{ backgroundColor: "#eee" }}
        >
          Box 3
        </S.GridElement>
        <S.GridElement
          key="4"
          className="grid-item"
          style={{ backgroundColor: "#fff" }}
        >
          Box 4
        </S.GridElement>
      </GridLayout>
    </S.Wrapper>
  );
}

export default Grid;
