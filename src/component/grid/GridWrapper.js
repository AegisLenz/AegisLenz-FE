import { useEffect, useMemo, useState, useRef } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import Alert from "../alert/Alert";
import ChatToggle from "../toggle/chat/ToggleChat";
// eslint-disable-next-line no-unused-vars
import FilterToggle from "../toggle/filter/Filter";
import { useLocation } from "react-router-dom";
import {
  AccountByService,
  AccountCount,
  AccountStatus,
  DailyInsight,
  Detection,
  EC2Status,
  NeedCheck,
  Report,
  Score,
  ShowPolicy,
  ShowLog,
  AttackVisualGraph,
  Risks,
} from "./elements";
import * as S from "./Grid_style";

const Grid = ({ isEditOn, MarkData, Gridtype }) => {
  const [isChattoggleOpen, setChatToggle] = useState(false);
  const [markData, setMarkData] = useState(MarkData || []);
  // eslint-disable-next-line no-unused-vars
  const [promptSession, setPromptSession] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [ReportData, setReportData] = useState("");

  const [ESResultData, setESREsultData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [DBResultData, setDBREsultData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.isChatOpen !== undefined) {
      setMarkData([]);
      setChatToggle(location.state.isChatOpen);
    }
  }, [location.state]);

  const getESResultData = (value) => {
    setESREsultData(value);
  };
  const getDBResultData = (value) => {
    setDBREsultData(value);
  };
  // eslint-disable-next-line no-unused-vars
  const getReportData = (value) => {
    setReportData(value);
  };
  const getPromptSession = (value) => {
    setPromptSession(value);
  };

  const ChatToggleButton = () => {
    if (isChattoggleOpen) {
      setMarkData([]);
    } else {
      if (MarkData && MarkData.length > 0) {
        setMarkData(MarkData);
      }
    }
    setChatToggle((prev) => !prev);
  };

  const setChatToggleOpen = () => {
    setChatToggle(true);
    if (MarkData && MarkData.length > 0) {
      setMarkData(MarkData);
    }
  };

  const InAlert = () => {
    setMarkData([
      "scroll",
      "chat",
      "Report",
      "ShowPolicy",
      "ShowLog",
      "AttackVisualGraph",
    ]);
  };

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
        h: 45,
      },
      {
        i: "DailyInsight",
        x: 0,
        y: 35,
        w: 30,
        h: 30,
      },
      {
        i: "AccountByService",
        x: 50,
        y: 0,
        w: 17,
        h: 37,
      },
      {
        i: "NeedCheck",
        x: 30,
        y: 50,
        w: 37,
        h: 33,
      },
      {
        i: "Detection",
        x: 0,
        y: 40,
        w: 30,
        h: 33,
      },
      {
        i: "AccountStatus",
        x: 67,
        y: 10,
        w: 33,
        h: 70,
      },
      // {
      //   i: "EC2Status",
      //   x: 50,
      //   y: 20,
      //   w: 50,
      //   h: 33,
      //   content: <EC2Status GenDetailData={() => {}} />,
      // },
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

  useEffect(() => {
    const calculateRowHeight = () => {
      if (wrapperRef.current) {
        const wrapperHeight = wrapperRef.current.offsetHeight; // Wrapper의 높이를 가져옴
        const rows = 100; // 원하는 행 개수 (임의 설정)
        const chagedHeight = wrapperHeight / rows;
        const ratio = (chagedHeight / initHeight / 9) * 950;
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

  // markData 없데이트 시에
  useEffect(() => {
    // MarkData가 업데이트될 때 markData를 업데이트
    if (MarkData && MarkData.length > 0) {
      setMarkData(MarkData);
    }
  }, [MarkData]);

  // markData로 필터링
  useEffect(() => {
    if (markData && markData.length > 0) {
      const additionalLayouts = [];

      const layoutMap = [
        { i: "ShowLog", x: 50, y: 55, w: 50, h: 40 },
        { i: "Report", x: 50, y: 0, w: 50, h: 20 },
        { i: "ShowPolicy", x: 50, y: 50, w: 50, h: 25 },
        { i: "AttackVisualGraph", x: 50, y: 30, w: 50, h: 40 },
      ];

      markData.forEach((item) => {
        if (layoutMap[item]) {
          additionalLayouts.push(layoutMap[item]);
        }
      });

      if (additionalLayouts.length > 0) {
        setGridLayout((prev) => [...prev, ...additionalLayouts]);
      }

      if (markData.length > 0) {
        setGridLayout((prev) =>
          prev.filter((item) => markData.includes(item.i))
        );
      }
      if (Gridtype === "prompt") {
        setGridLayout((prevLayout) =>
          prevLayout.map((item) => {
            const initItem = InitLayout.find((init) => init.i === item.i);
            if (initItem) {
              return {
                ...item,
                x: 0,
                w: 50,
              };
            }
            return item;
          })
        );
      }
    } else {
      // 초기 레이아웃으로 복원
      setGridLayout(InitLayout.map((item) => ({ ...item, h: item.h * ratio })));
    }
  }, [markData, InitLayout, ratio, Gridtype]);

  // 토글 오픈
  useEffect(() => {
    if (isChattoggleOpen) {
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
  }, [InitLayout, isChattoggleOpen, ratio]);

  return (
    <S.Wrapper ref={wrapperRef}>
      <Alert
        setChatToggleOpen={setChatToggleOpen}
        getPromptSession={getPromptSession}
        InAlert={InAlert}
      />
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
            case "EC2Status":
              return (
                <S.GridElement key={item.i}>
                  <EC2Status />
                </S.GridElement>
              );
            case "NeedCheck":
              return (
                <S.GridElement key={item.i}>
                  <NeedCheck />
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
                  <ShowLog Data={ESResultData} />
                </S.GridElement>
              );
            case "AttackVisualGraph":
              return (
                <S.GridElement key={item.i}>
                  <AttackVisualGraph />
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
                    markData={setMarkData}
                    isChattoggleOpen={isChattoggleOpen}
                    ChatToggleButton={ChatToggleButton}
                    setChatToggleOpen={setChatToggleOpen}
                    setESResultData={getESResultData}
                    setDBResultData={getDBResultData}
                    type={"grid"}
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
