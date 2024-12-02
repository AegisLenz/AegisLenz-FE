import * as S from "./AttackVisualGraph_style";
import Graph from "../../../graph/visualization_graph/VisualGraph";

const data = [
  {
    section: "User",
    nodes: [{ id: "u1", label: "Google Cloud Account", color: "#79c8af" }],
    links: [],
  },
  {
    section: "Group",
    nodes: [{ id: "g1", label: "Google Cloud Account", color: "#a89db9" }],
    links: [{ source: "u1", target: "g1", value: 1 }],
  },
  {
    section: "Role",
    nodes: [
      { id: "r1", label: "Google Cloud Account", color: "#d7a9c4" },
      { id: "r2", label: "AWS Cloud Account", color: "#d7a9c4" },
    ],
    links: [
      { source: "g1", target: "r1", value: 1 },
      { source: "g1", target: "r2", value: 1 },
    ],
  },
];

const AttackVisualGraph = () => {
  return (
    <S.Wrapper>
      <Graph data={data}></Graph>
    </S.Wrapper>
  );
};

export default AttackVisualGraph;
