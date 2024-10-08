import * as S from "./Grid_style";
import { useState, useEffect, useMemo } from "react";
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

const Grid = ({
  isEditOn,
  MarkData,
  isChatOFF,
  isFillterOFF,
  SideContent,
  setMarkDataFunc,
}) => {
  const [isChattoggleOpen, setChatToggle] = useState(false);
  const [isFilterOpen, setFilter] = useState(false);
  const [NeedCheckStatus, setNeedCheckStatus] = useState(false);
  const [markData, setMarkData] = useState(MarkData || []);

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
  const InitLayout = useMemo(
    () => [
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
        y: 11,
        w: 33,
        h: 5,
        content: <Score />,
        isResizable: true,
      },
      {
        i: "DailyInsight",
        x: 0,
        y: 16,
        w: 33,
        h: 11,
        content: <DailyInsight />,
        isResizable: true,
      },
      {
        i: "AccountByService",
        x: 33,
        y: 12,
        w: 14,
        h: 16,
        content: <AccountByService />,
        isResizable: true,
      },
      {
        i: "NeedCheck",
        x: 0,
        y: 25,
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
        y: 25,
        w: 27,
        h: 17,
        content: <Detection />,
        isResizable: true,
      },
    ],
    [NeedCheckStatus]
  );

  // 초기 레이아웃 설정
  const [gridLayout, setGridLayout] = useState(InitLayout);

  useEffect(() => {
    // MarkData가 업데이트될 때 markData를 업데이트
    if (MarkData.length > 0) {
      setMarkData(MarkData);
    }
  }, [MarkData]);

  useEffect(() => {
    if (markData && markData.length > 0) {
      let currentX = 0;
      let currentY = 0;
      let maxRowHeight = 0; // 현재 행에서 가장 큰 높이

      // 필터링하면서 x값과 y값을 계산
      const filteredLayout = InitLayout.filter((item) =>
        markData.includes(item.i)
      ).map((item) => {
        // 다음 줄로 넘기기 조건: w값의 합이 50을 초과하면 줄을 바꿈
        if (currentX + item.w > 50) {
          currentX = 0; // x를 0으로 초기화
          currentY += maxRowHeight; // y를 가장 큰 높이만큼 증가
          maxRowHeight = 0; // 새로운 행에서 가장 큰 높이를 다시 0으로 초기화
        }

        const layoutItem = {
          ...item,
          x: currentX, // x 값을 설정
          y: currentY, // y 값을 설정
        };

        currentX += item.w; // 현재 x 값을 w만큼 증가
        maxRowHeight = Math.max(maxRowHeight, item.h); // 행에서 가장 큰 높이를 저장

        return layoutItem;
      });

      setGridLayout(filteredLayout);
    } else {
      setGridLayout(InitLayout);
    }
    if (!isChatOFF && isFillterOFF && !isChattoggleOpen) {
      setGridLayout(InitLayout);
    }
  }, [
    InitLayout,
    markData,
    MarkData,
    isChattoggleOpen,
    isFillterOFF,
    isChatOFF,
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
      if (markData.length < 0) {
        setGridLayout(InitLayout);
      }
    }
  }, [isChattoggleOpen, NeedCheckStatus, InitLayout, markData]);

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
      {!isChatOFF && isFillterOFF ? (
        <>
          <ChatToggle
            isChattoggleOpen={isChattoggleOpen}
            ChatToggleButton={ChatToggleButton}
            setChatToggleOpen={setChatToggleOpen}
            sizeFull={false}
            SideContent={SideContent} //오른쪽 On/Off
            markData={setMarkDataFunc} //오른쪽에 띄울 데이터
          />
          <FilterToggle
            isFilterOpen={isFilterOpen}
            isChattoggleOpen={isChattoggleOpen}
            FilterToggleButton={FilterToggleButton}
            setFilterOpen={setFilterOpen}
            ismarkData={markData.length > 0}
          />
        </>
      ) : (
        ""
      )}

      <GridLayout
        layout={gridLayout.map((item) => ({
          ...item,
          isResizable: isEditOn && item.isResizable,
        }))}
        cols={94}
        rowHeight={rowHeight * 0.01}
        width={width * 0.95}
        draggableHandle=".grid-item"
        style={{ backgroundColor: "transparent" }}
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
