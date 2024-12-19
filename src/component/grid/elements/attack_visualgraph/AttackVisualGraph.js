import * as S from "./AttackVisualGraph_style";
import Graph from "../../../graph/visualization_graph/VisualGraph";
import { useEffect, useState } from "react";

const ColorSet = ["#216261", "#6A4FA3", "#CD62B0"]; // 색상 배열

// 데이터에 색상 추가
const data = String(
  `[{"section": "User","nodes": [{ "id": "AIDA47CRYYD4WJZ3OBVPB", "label": "smtpk" },{ "id": "AIDA47CRYYD4ZK4QW73V5", "label": "lookupIam" }],"links": []},{"section": "EC2","nodes": [{ "id": "AIDA47CRYYD4WJZ3OBVPB", "label": "smtpk" },{ "id": "AIDA47CRYYD4ZK4QW73V5", "label": "lookupIam" }],"links": []},{"section": "Role","nodes": [{ "id": "role_1", "label": "testrole" },{ "id": "role_2", "label": "AWSServiceRoleForTrustedAdvisor" },{ "id": "role_3", "label": "AWSServiceRoleForSupport" }],"links": [{ "source": "AIDA47CRYYD4WJZ3OBVPB", "target": "role_1", "value": 1 },{ "source": "AIDA47CRYYD4WJZ3OBVPB", "target": "role_2", "value": 1 },{ "source": "AIDA47CRYYD4WJZ3OBVPB", "target": "role_3", "value": 1 },{ "source": "AIDA47CRYYD4ZK4QW73V5", "target": "role_1", "value": 1 }]}]`
);

const AttackVisualGraph = ({ AttackGraphData }) => {
  console.log("끼에에엑");
  console.log(JSON.parse(data));
  const MadeData = JSON.parse(data).map((section, index) => ({
    ...section,
    nodes: section.nodes.map((node) => ({
      ...node,
      color: ColorSet[index % ColorSet.length], // 색상 할당
    })),
  }));
  const [Fetchdata, setFetchdata] = useState(AttackGraphData);

  // useEffect(() => {
  //   const data = JSON.parse(AttackGraphData).map((section, index) => ({
  //     ...section,
  //     nodes: section.nodes.map((node) => ({
  //       ...node,
  //       color: ColorSet[index % ColorSet.length], // 색상 할당
  //     })),
  //   }));

  //   const sortedSections = [...data].sort(
  //     (a, b) => b.nodes.length - a.nodes.length
  //   );

  //   setFetchdata(sortedSections);
  // }, [AttackGraphData]);

  return (
    <S.Wrapper>
      <S.TopPart>
        <S.Title>Attack Flow graph</S.Title>
      </S.TopPart>
      <S.GraphWrapper>
        <Graph data={MadeData}></Graph>
      </S.GraphWrapper>
    </S.Wrapper>
  );
};

export default AttackVisualGraph;
