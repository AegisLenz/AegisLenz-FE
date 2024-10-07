import * as S from "./Grid_style";
import { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ChatToggle from "../toggle/chat/ToggleChat";
import FilterToggle from "../toggle/filter/Filter";
import {
  AccountCount,
  DailyInsight,
  AccountByService,
  Score,
  NeedCheck,
  Detection,
} from "./elements";

const Grid = ({ isEditOn }) => {
  const [isChattoggleOpen, setChatToggle] = useState(false);
  const [isFilterOpen, setFilter] = useState(false);
  const [NeedCheckStatus, setNeedCheckStatus] = useState(false);
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

  const isNeedCheck = () => {
    setNeedCheckStatus((prev) => !prev);
  };

  // 초기 레이아웃 설정
  const [gridLayout, setGridLayout] = useState([
    { i: "chat", x: 0, y: 0, w: 47, h: 3, isResizable: false },
    { i: "filter", x: 0, y: 0, w: 47, h: 8, isResizable: false },
    {
      i: "AccountCount",
      x: 47,
      y: 0,
      w: 47,
      h: 10,
      content: <AccountCount />,
      isResizable: true,
    },
    {
      i: "Score",
      x: 0,
      y: 0,
      w: 33,
      h: 5,
      content: <Score />,
      isResizable: true,
    },
    {
      i: "DailyInsight",
      x: 0,
      y: 0,
      w: 33,
      h: 11,
      content: <DailyInsight />,
      isResizable: true,
    },
    {
      i: "AccountByService",
      x: 33,
      y: 0,
      w: 14,
      h: 16,
      content: <AccountByService />,
      isResizable: true,
    },
    {
      i: "NeedCheck",
      x: 0,
      y: 0,
      w: 20,
      h: 17,
      content: (
        <NeedCheck
          isNeedCheck={isNeedCheck}
          NeedCheckStatus={NeedCheckStatus}
        />
      ),
      isResizable: true,
    },
    {
      i: "Detection",
      x: 47,
      y: 0,
      w: 47,
      h: 10,
      content: <Detection />,
      isResizable: true,
    },
  ]);

  // 토글 오픈
  useEffect(() => {
    if (isChattoggleOpen) {
      setGridLayout((prevLayout) =>
        prevLayout.map((item) =>
          item.i === "chat" ? item : { ...item, x: item.x + 47 }
        )
      );
    } else if (NeedCheckStatus) {
      setGridLayout((prevLayout) =>
        prevLayout.map((item) => {
          // "NeedCheck"인 경우
          if (item.i === "NeedCheck") {
            return { ...item, x: 47, y: 0, w: 47, h: 20 };
          }
          // y <= 20이면서 x >= 46인 경우
          if (item.y <= 20 && item.x >= 47) {
            return { ...item, y: item.y + 20 };
          }
          // 그 외의 항목은 수정하지 않음
          return item;
        })
      );
    } else {
      setGridLayout([
        { i: "chat", x: 0, y: 0, w: 47, h: 3, isResizable: false },
        { i: "filter", x: 0, y: 0, w: 47, h: 8, isResizable: false },
        {
          i: "AccountCount",
          x: 47,
          y: 0,
          w: 47,
          h: 10,
          content: <AccountCount />,
          isResizable: true,
        },
        {
          i: "Score",
          x: 0,
          y: 0,
          w: 33,
          h: 5,
          content: <Score />,
          isResizable: true,
        },
        {
          i: "DailyInsight",
          x: 0,
          y: 0,
          w: 33,
          h: 11,
          content: <DailyInsight />,
          isResizable: true,
        },
        {
          i: "AccountByService",
          x: 33,
          y: 11,
          w: 14,
          h: 16,
          content: <AccountByService />,
          isResizable: true,
        },
        {
          i: "NeedCheck",
          x: 0,
          y: 16,
          w: 20,
          h: 17,
          content: (
            <NeedCheck
              isNeedCheck={isNeedCheck}
              NeedCheckStatus={NeedCheckStatus}
            />
          ),
          isResizable: true,
        },
        {
          i: "Detection",
          x: 20,
          y: 16,
          w: 27,
          h: 17,
          content: <Detection />,
          isResizable: true,
        },
      ]);
    }
  }, [isChattoggleOpen, NeedCheckStatus]);

  const [rowHeight, setrowHeight] = useState(window.innerHeight);
  const [width, setwidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setrowHeight(window.innerHeight);
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
        layout={gridLayout.map((item) => ({
          ...item,
          isResizable: isEditOn && item.isResizable,
        }))}
        cols={94}
        rowHeight={rowHeight * 0.01}
        width={width * 0.95}
        draggableHandle=".grid-item"
        style={{ backgroundColor: "transparent", padding: "2vh 0 0 0" }}
      >
        {gridLayout.map((item) => (
          <S.GridElement key={item.i}>
            {item.content}
            {item.i !== "chat" && item.i !== "filter" && (
              <S.MoveAreaInGrid
                className={isEditOn ? "grid-item" : ""}
                isEditOn={isEditOn}
              />
            )}
          </S.GridElement>
        ))}
      </GridLayout>
    </S.Wrapper>
  );
};

export default Grid;
