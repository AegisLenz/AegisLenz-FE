import * as S from "./AttackVisualGraph_style";
import Graph from "../../../graph/visualization_graph/VisualGraph";

const ColorSet = ["#216261", "#6A4FA3", "#CD62B0"]; // 색상 배열

// 데이터에 색상 추가
const data = [
  {
    section: "User",
    nodes: [{ id: "u1", label: "Google Cloud Account" }],
    links: [],
  },
  {
    section: "Ec2",
    nodes: [
      { id: "g1", label: "Google Cloud Account" },
      { id: "g2", label: "Google Cloud Account" },
    ],
    links: [{ source: "u1", target: "g1", value: 1 }],
  },
  {
    section: "Role",
    nodes: [
      { id: "r1", label: "Google Cloud Account" },
      { id: "r2", label: "AWS Cloud Account" },
    ],
    links: [
      { source: "g1", target: "r1", value: 1 },
      { source: "g1", target: "r2", value: 1 },
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
