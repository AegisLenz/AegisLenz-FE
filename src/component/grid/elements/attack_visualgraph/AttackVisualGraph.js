import * as S from "./AttackVisualGraph_style";
import Graph from "../../../graph/visualization_graph/VisualGraph";
import { useEffect, useState } from "react";
import GetPromptContents from "../../../hook/Prompt/GetPromptContents";

const ColorSet = ["#216261", "#6A4FA3", "#CD62B0"]; // 색상 배열
const data = [
  {
    section: "User",
    nodes: [{ id: "AIDA47CRYYD4VWJGA4YTZ", label: "Victim" }],
    links: [],
  },
  {
    section: "Role",
    nodes: [
      { id: "1", label: "testrole" },
      { id: "2", label: "AWSServiceRoleForTrustedAdvisor" },
      { id: "3", label: "AWSServiceRoleForSupport" },
    ],
    links: [
      { source: "AIDA47CRYYD4VWJGA4YTZ", target: "1", value: 1 },
      { source: "AIDA47CRYYD4VWJGA4YTZ", target: "2", value: 1 },
      { source: "AIDA47CRYYD4VWJGA4YTZ", target: "3", value: 1 },
    ],
  },
].map((section, index) => ({
  ...section,
  nodes: section.nodes.map((node) => ({
    ...node,
    color: ColorSet[index % ColorSet.length], // 색상 할당
  })),
}));
const AttackVisualGraph = ({ AttackGraphData, AlertSession }) => {
  // console.log(JSON.parse(data));
  const [Fetchdata, setFetchdata] = useState("");

  // useEffect(() => {
  //   const processDataForGraph = (data) => {
  //     const sectionData = data.Section;
  //     return {
  //       nodes: sectionData.nodes.map((node) => ({
  //         id: node.id,
  //         label: node.label,
  //       })),
  //       links: sectionData.links.map((link) => ({
  //         source: link.source,
  //         target: link.target,
  //         value: link.value || 1, // 기본값 설정
  //       })),
  //     };
  //   };
  //   const fetchPrevChat = async () => {
  //     console.log("끼에에엑" + AlertSession);
  //     const data = await GetPromptContents(AlertSession);
  //     const ParsedData = JSON.parse(data.attack_graph);
  //     console.log(processDataForGraph(ParsedData));

  //     setFetchdata(processDataForGraph(ParsedData));
  //   };

  //   fetchPrevChat();
  // }, [AlertSession]);

  return (
    <S.Wrapper>
      <S.TopPart>
        <S.Title>Attack Flow graph</S.Title>
      </S.TopPart>
      <S.GraphWrapper>
        <Graph data={data}></Graph>
      </S.GraphWrapper>
    </S.Wrapper>
  );
};

export default AttackVisualGraph;
