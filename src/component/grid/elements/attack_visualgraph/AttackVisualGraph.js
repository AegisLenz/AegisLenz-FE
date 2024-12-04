import * as S from "./AttackVisualGraph_style";
import Graph from "../../../graph/visualization_graph/VisualGraph";

const ColorSet = ["#216261", "#6A4FA3", "#CD62B0"]; // 색상 배열

// 데이터에 색상 추가
const data = [
  {
    section: "User",
    nodes: [
      { id: "AIDA47CRYYD4WJZ3OBVPB", label: "smtpk" },
      { id: "AIDA47CRYYD4ZK4QW73V5", label: "lookupIam" },
    ],
    links: [],
  },
  {
    section: "Role",
    nodes: [
      { id: "role_1", label: "testrole" },
      { id: "role_2", label: "AWSServiceRoleForTrustedAdvisor" },
      { id: "role_3", label: "AWSServiceRoleForSupport" },
    ],
    links: [
      { source: "AIDA47CRYYD4WJZ3OBVPB", target: "role_1", value: 1 },
      { source: "AIDA47CRYYD4WJZ3OBVPB", target: "role_2", value: 1 },
      { source: "AIDA47CRYYD4WJZ3OBVPB", target: "role_3", value: 1 },
      { source: "AIDA47CRYYD4ZK4QW73V5", target: "role_1", value: 1 },
    ],
  },
].map((section, index) => ({
  ...section,
  nodes: section.nodes.map((node) => ({
    ...node,
    color: ColorSet[index % ColorSet.length], // 색상 할당
  })),
}));

const sortedSections = [...data].sort(
  (a, b) => b.nodes.length - a.nodes.length
);

const AttackVisualGraph = () => {
  return (
    <S.Wrapper>
      <S.TopPart>
        <S.Title>tedst</S.Title>
      </S.TopPart>
      <S.GraphWrapper>
        <Graph data={sortedSections}></Graph>
      </S.GraphWrapper>
      <S.GropWrapper>
        {sortedSections.slice(0, 3).map((section, index) => (
          <S.Grop key={index} color={section.nodes[0].color}>
            <p>{section.section}</p>
          </S.Grop>
        ))}
      </S.GropWrapper>
    </S.Wrapper>
  );
};

export default AttackVisualGraph;
