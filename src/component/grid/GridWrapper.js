import { useEffect, useMemo, useState, useRef } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";

import ChatToggle from "../toggle/chat/ToggleChat";
import { useLocation } from "react-router-dom";
import {
  AccountByService,
  AccountCount,
  AccountStatus,
  DailyInsight,
  Detection,
  NeedCheck,
  Report,
  Score,
  ShowPolicy,
  ShowLog,
  AttackVisualGraph,
  Risks,
} from "./elements";
import * as S from "./Grid_style";

const Grid = ({ isEditOn, Gridtype, AlertSession }) => {
  const [isChattoggleOpen, setChatToggle] = useState(false);
  const [markData, setMarkData] = useState([]);
  const [promptSession, setPromptSession] = useState("");
  const [GridTypeState, setGridTypeState] = useState(Gridtype);

  const [ReportData, setReportData] = useState("");
  const [ESResultData, setESREsultData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [DBResultData, setDBREsultData] = useState([]);
  const [AttackGraphData, setAttackGraphData] = useState();

  const location = useLocation();

  useEffect(() => {
    if (
      location.state &&
      location.state.isChatOpen !== undefined &&
      Gridtype !== "prompt"
    ) {
      setMarkData([]);
      setChatToggle(location.state.isChatOpen);
    }
  }, [Gridtype, location.state]);

  useEffect(() => {
    if (AlertSession !== "") {
      InAlert();
    }
    setPromptSession(AlertSession);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AlertSession]);
  const getESResultData = (value) => {
    setESREsultData(value);
  };
  const getReportData = (value) => {
    setReportData(value);
  };
  const getGraphData = (value) => {
    setAttackGraphData(value);
    console.log(value);
  };
  const setChatToggleFromTggogle = (value) => {
    setMarkData(value);
    console.log(value);
  };
  const getPromptSession = (value) => {
    setPromptSession(value);
    setChatToggle(true);
    InAlert();
  };

  const ChatToggleButton = () => {
    if (isChattoggleOpen && Gridtype !== "prompt") {
      setMarkData([]);
    } else {
      if (markData && markData.length > 0) {
        setMarkData(markData);
      }
    }
    setChatToggle((prev) => !prev);
  };

  const setChatToggleOpen = () => {
    setChatToggle(true);
    if (markData && markData.length > 0) {
      setMarkData(markData);
    }
  };
  const InAlert = () => {
    setChatToggle(true);
    const AlertMarkdata = [
      "scroll",
      "chat",
      "Report",
      "ShowPolicy",
      "AttackVisualGraph",
    ];
    if (Gridtype === "grid") {
      setGridLayout(
        InitLayout.filter((item) => AlertMarkdata.includes(item.i))
      );
    }
  };

  // 레이아웃 초기 설정
  const InitLayout = useMemo(
    () => [
      {
        i: "scroll",
        x: 0,
        y: 0,
        w: 50,
        h: 0,
        isResizable: false,
      },
      {
        i: "chat",
        x: 0,
        y: 0,
        w: 50,
        h: 7,
        isResizable: false,
      },
      // {
      //   i: "filter",
      //   x: 0,
      //   y: 0,
      //   w: 50,
      //   h: 15,
      //   content: <FilterToggle />,
      //   isResizable: false,
      // },
      {
        i: "AccountCount",
        x: 50,
        y: 0,
        w: 50,
        h: 15,
      },
      {
        i: "Score",
        x: 0,
        y: 23,
        w: 30,
        h: 15,
      },
      {
        i: "Risks",
        x: 30,
        y: 10,
        w: 20,
        h: 50,
      },
      {
        i: "DailyInsight",
        x: 0,
        y: 35,
        w: 30,
        h: 35,
      },
      {
        i: "AccountByService",
        x: 50,
        y: 0,
        w: 17,
        h: 42,
      },
      {
        i: "NeedCheck",
        x: 0,
        y: 50,
        w: 30,
        h: 30,
      },
      {
        i: "Detection",
        x: 30,
        y: 40,
        w: 37,
        h: 30,
      },
      {
        i: "AccountStatus",
        x: 67,
        y: 10,
        w: 33,
        h: 72,
      },
      // {
      //   i: "EC2Status",
      //   x: 50,
      //   y: 20,
      //   w: 50,
      //   h: 33,
      //   content: <EC2Status GenDetailData={() => {}} />,
      // },
      {
        i: "Report",
        x: 50,
        y: 0,
        w: 50,
        h: 60,
      },
      {
        i: "ShowPolicy",
        x: 50,
        y: 0,
        w: 50,
        h: 30,
      },
      {
        i: "AttackVisualGraph",
        x: 50,
        y: 0,
        w: 50,
        h: 40,
      },
      {
        i: "ShowLog",
        x: 50,
        y: 0,
        w: 50,
        h: 50,
      },
    ],
    []
  );

  // 초기 레이아웃 설정
  const [gridLayout, setGridLayout] = useState(
    InitLayout.map((item) => ({
      ...item,
      h: item.h * 0.9, // 비율에 따라 높이 조정
    }))
  );
  const [width, setGridWidth] = useState(window.innerWidth);

  const wrapperRef = useRef(null); // Wrapper를 참조할 ref
  const [initHeight] = useState(window.innerHeight);
  const [ratio, setratio] = useState(0.9);

  // 스크롤 이벤트
  useEffect(() => {
    const calculateRowHeight = () => {
      if (wrapperRef.current) {
        const wrapperHeight = wrapperRef.current.offsetHeight; // Wrapper의 높이를 가져옴
        const rows = 100; // 원하는 행 개수 (임의 설정)
        const chagedHeight = wrapperHeight / rows;
        const ratio = (chagedHeight / initHeight / 9.2) * 1000;
        setratio(ratio);
        setGridLayout((prev) =>
          prev.map((item) => ({
            ...item,
            h: item.h * ratio, // h 값을 비율에 따라 수정
          }))
        );
      }
      setGridWidth(window.innerWidth);
    };
    const handleScroll = () => {
      if (isChattoggleOpen) {
        const scrollTop = window.scrollY;
        const calculatedHeight = scrollTop * 0.09; // 스크롤에 따른 높이 계산
        setGridLayout((prev) =>
          prev.map((item) =>
            item.i === "scroll" ? { ...item, h: calculatedHeight } : item
          )
        );
      }
    };

    calculateRowHeight(); // 초기 계산

    window.addEventListener("resize", calculateRowHeight); // 리사이즈 이벤트 추가
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", calculateRowHeight); // 이벤트 제거
      window.removeEventListener("scroll", handleScroll);
    };
  }, [initHeight, isChattoggleOpen]);

  // markData로 필터링
  useEffect(() => {
    if (markData && markData.length > 0) {
      // `markData`를 기반으로 필터링하고, 없는 항목은 추가
      setGridLayout((prev) => {
        // 현재 `gridLayout`에 없는 `markData` 항목을 InitLayout에서 찾아 추가
        const missingItems = markData
          .filter((id) => !prev.some((item) => item.i === id))
          .map((id) => {
            const initItem = InitLayout.find((item) => item.i === id);
            return initItem
              ? { ...initItem, h: initItem.h * ratio } // 비율에 따라 높이 조정
              : null;
          })
          .filter(Boolean); // null 제거

        // 기존 `prev`에서 `markData`에 없는 항목 제거 후 `missingItems` 추가
        const updatedLayout = prev
          .filter((item) => markData.includes(item.i))
          .concat(missingItems);

        return updatedLayout;
      });

      // `Gridtype`에 따라 위치 조정
      if (GridTypeState === "prompt") {
        setGridLayout((prevLayout) =>
          prevLayout.map((item) => ({
            ...item,
            x: 0, // `prompt` 타입에서는 모든 아이템을 오른쪽으로 이동
            w: 50,
          }))
        );
      } else {
        setGridLayout((prevLayout) =>
          prevLayout.map((item) => ({
            ...item,
            x: item.i === "chat" || item.i === "scroll" ? 0 : 50, // `chat`과 `scroll`은 왼쪽
            w: 50,
          }))
        );
      }
    } else {
      // 초기 레이아웃으로 복원
      if (Gridtype !== "prompt") {
        setGridLayout(
          InitLayout.filter((item) =>
            [
              "chat",
              "scroll",
              "AccountByService",
              "AccountCount",
              "AccountStatus",
              "DailyInsight",
              "Detection",
              "EC2Status",
              "NeedCheck",
              "Score",
              "Risks",
            ].includes(item.i)
          ).map((item) => ({
            ...item,
            h: item.h * ratio, // 비율에 따라 높이 조정
          }))
        );
      } else {
        setGridLayout(
          InitLayout.filter((item) =>
            [
              "AccountByService",
              "AccountCount",
              "AccountStatus",
              "DailyInsight",
              "Detection",
              "EC2Status",
              "NeedCheck",
              "Score",
              "Risks",
            ].includes(item.i)
          ).map((item) => ({
            ...item,
            h: item.h * ratio, // 비율에 따라 높이 조정
            x: 0,
            w: 50,
          }))
        );
      }
    }
  }, [markData, InitLayout, ratio, Gridtype, GridTypeState]);

  // 토글 오픈
  useEffect(() => {
    if (isChattoggleOpen && Gridtype !== "prompt") {
      setGridLayout((prevLayout) =>
        prevLayout.map((item) => {
          const initItem = InitLayout.find((init) => init.i === item.i);
          if (initItem) {
            return {
              ...item,
              h:
                item.i === "chat"
                  ? wrapperRef.current.offsetHeight * 0.09
                  : initItem.h * ratio,
              x:
                item.x >= 47 || item.i === "scroll" || item.i === "chat"
                  ? item.x
                  : item.i === "Risks"
                  ? 80
                  : 50,
              w: 50,
            };
          }
          return item;
        })
      );
    }
  }, [Gridtype, InitLayout, isChattoggleOpen, ratio]);

  return (
    <S.Wrapper ref={wrapperRef}>
      <GridLayout
        layout={gridLayout.map((item) => ({
          ...item,
          isResizable: isEditOn && item.isResizable,
        }))}
        cols={100}
        rowHeight={initHeight / 1000}
        width={width * 0.94}
        draggableHandle=".grid-item"
        style={{ backgroundColor: "transparent" }}
      >
        {gridLayout.map((item) => {
          switch (item.i) {
            case "scroll":
              return (
                <S.GridElementNoBoxShadow
                  key={item.i}
                ></S.GridElementNoBoxShadow>
              );
            case "AccountByService":
              return (
                <S.GridElement key={item.i}>
                  <AccountByService />
                </S.GridElement>
              );
            case "AccountCount":
              return (
                <S.GridElementNoBoxShadow key={item.i}>
                  <AccountCount />
                </S.GridElementNoBoxShadow>
              );
            case "AccountStatus":
              return (
                <S.GridElement key={item.i}>
                  <AccountStatus GenDetailData={() => {}} />
                </S.GridElement>
              );
            case "DailyInsight":
              return (
                <S.GridElement key={item.i}>
                  <DailyInsight />
                </S.GridElement>
              );
            case "Detection":
              return (
                <S.GridElement key={item.i}>
                  <Detection />
                </S.GridElement>
              );
            // case "EC2Status":
            //   return (
            //     <S.GridElement key={item.i}>
            //       <EC2Status />
            //     </S.GridElement>
            //   );
            case "NeedCheck":
              return (
                <S.GridElement key={item.i}>
                  <NeedCheck setPromptSession={getPromptSession} />
                </S.GridElement>
              );
            case "Report":
              return (
                <S.GridElement key={item.i}>
                  <Report data={ReportData} />
                </S.GridElement>
              );
            case "Score":
              return (
                <S.GridElement key={item.i}>
                  <Score />
                </S.GridElement>
              );
            case "ShowPolicy":
              return (
                <S.GridElement key={item.i}>
                  <ShowPolicy />
                </S.GridElement>
              );
            case "ShowLog":
              return (
                <S.GridElement key={item.i}>
                  <ShowLog
                    ESResultData={ESResultData}
                    DBResultData={DBResultData}
                  />
                </S.GridElement>
              );
            case "AttackVisualGraph":
              return (
                <S.GridElement key={item.i}>
                  <AttackVisualGraph
                    AlertSession={AlertSession}
                    AttackGraphData={AttackGraphData}
                  />
                </S.GridElement>
              );
            case "Risks":
              return (
                <S.GridElement key={item.i}>
                  <Risks />
                </S.GridElement>
              );
            case "chat":
              return (
                <S.GridElementNoBoxShadow key={item.i}>
                  <ChatToggle
                    markData={setChatToggleFromTggogle}
                    isChattoggleOpen={isChattoggleOpen}
                    ChatToggleButton={ChatToggleButton}
                    setChatToggleOpen={setChatToggleOpen}
                    setESResultData={getESResultData}
                    setDBResultData={getESResultData}
                    promptSession={promptSession}
                    getReportData={getReportData}
                    getGraphData={getGraphData}
                    type={Gridtype}
                  />
                </S.GridElementNoBoxShadow>
              );
            default:
              return <div>Unknown Component</div>;
          }
        })}
      </GridLayout>
    </S.Wrapper>
  );
};

export default Grid;
