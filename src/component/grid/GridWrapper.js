import * as S from "./Grid_style";
import { useState, useEffect, useMemo } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ChatToggle from "../toggle/chat/ToggleChat";
import FilterToggle from "../toggle/filter/Filter";
import Alert from "../alert/Alert";
import {
  AccountCount,
  DailyInsight,
  AccountByService,
  Score,
  NeedCheck,
  Detection,
  AccountStatus,
  EC2Status,
  Report,
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
  const [markData, setMarkData] = useState(MarkData || []);
  const [rowHeight, setrowHeight] = useState(window.screen.height);
  const [width, setwidth] = useState(window.innerWidth);
  const [zoomLevel, setZoomLevel] = useState(getZoomLevel());

  const ChatToggleButton = () => {
    if (isChattoggleOpen) {
      setMarkData([]);
      setFillterOFF(false);
    } else {
      setMarkData(MarkData);
    }
    setChatToggle((prev) => !prev);
  };

  const setChatToggleOpen = () => {
    setChatToggle(true);
  };
  const InAlert = () => {
    setMarkData(["Report", "ShowPolicy"]);
    setFillterOFF(true);
  };
  const FilterToggleButton = () => {
    setFilter((prev) => !prev);
  };

  const setFilterOpen = () => {
    setFilter(true);
  };

  function getZoomLevel() {
    return window.innerWidth / window.screen.width;
  }

  //줌레벨 변화감지
  useEffect(() => {
    const handleResize = () => {
      const newZoomLevel = getZoomLevel();
      if (newZoomLevel !== zoomLevel) {
        setZoomLevel(newZoomLevel);
      }
      setrowHeight(window.screen.height);
      setwidth(window.innerWidth);
      setGridLayout((prevLayout) =>
        prevLayout.map((item) =>
          item.i === "chat" ? item.h * zoomLevel : item
        )
      );
      setGridLayout((prevLayout) =>
        prevLayout.map((item) =>
          item.i === "filter" ? item.h * zoomLevel : item
        )
      );
    };

    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [zoomLevel]);

  const InitLayout = useMemo(
    () => [
      {
        i: "chat",
        x: 0,
        y: 0,
        w: 47,
        h: 11 * zoomLevel,
        isResizable: false,
      },
      { i: "filter", x: 0, y: 0, w: 47, h: 0, isResizable: false },
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
        h: 6,
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
        h: 17,
        content: <AccountByService />,
        isResizable: true,
      },
      {
        i: "NeedCheck",
        x: 0,
        y: 25,
        w: 20,
        h: 17,
        content: <NeedCheck />,
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
      {
        i: "AccountStatus",
        x: 47,
        y: 10,
        w: 47,
        h: 18,
        content: <AccountStatus GenDetailData={() => {}} />,
        isResizable: true,
      },
      {
        i: "EC2Status",
        x: 47,
        y: 28,
        w: 47,
        h: 18,
        content: <EC2Status GenDetailData={() => {}} />,
        isResizable: true,
      },
      {
        i: "Report",
        x: 47,
        y: 0,
        w: 47,
        h: 15,
        content: <Report />,
        isResizable: true,
      },
    ],
    [zoomLevel]
  );

  // 초기 레이아웃 설정
  const [gridLayout, setGridLayout] = useState(InitLayout);

  // markData 없데이트 시에
  useEffect(() => {
    // MarkData가 업데이트될 때 markData를 업데이트
    if (MarkData.length > 0) {
      setMarkData(MarkData);
    }
  }, [MarkData]);

  // markData가 존재할 때
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
          item.i === "chat"
            ? item
            : item.x >= 47
            ? { ...item, w: item.w }
            : { ...item, x: item.x + 47, w: item.w }
        )
      );
      setGridLayout((prevLayout) =>
        prevLayout.map((item) =>
          item.i === "filter" ? { ...item, h: 8 * zoomLevel } : item
        )
      );
    } else {
      if (markData.length < 0) {
        setGridLayout(InitLayout);
      }
    }
  }, [isChattoggleOpen, InitLayout, markData, zoomLevel]);

  return (
    <S.Wrapper>
      <Alert setChatToggleOpen={setChatToggleOpen} />
      {!isChatOFF ? (
        <ChatToggle
          isChattoggleOpen={isChattoggleOpen}
          ChatToggleButton={ChatToggleButton}
          setChatToggleOpen={setChatToggleOpen}
          sizeFull={false}
          SideContent={SideContent} //오른쪽 On/Off
          markData={setMarkDataFunc} //오른쪽에 띄울 데이터
        />
      ) : (
        ""
      )}
      {isFillterOFF ? (
        ""
      ) : (
        <FilterToggle
          isFilterOpen={isFilterOpen}
          isChattoggleOpen={isChattoggleOpen}
          FilterToggleButton={FilterToggleButton}
          setFilterOpen={setFilterOpen}
          ismarkData={markData.length > 0}
        />
      )}
      <GridLayout
        layout={gridLayout.map((item) => ({
          ...item,
          isResizable: isEditOn && item.isResizable,
        }))}
        cols={94}
        rowHeight={rowHeight * 0.01}
        width={width * 0.945}
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
