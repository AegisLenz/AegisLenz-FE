import { tree } from "d3";
import * as S from "./NeedCheck_style";
import { useState } from "react";

const NeedCheck = ({ isNeedCheck, NeedCheckStatus }) => {
  const [innerContents, setInnerContents] = useState([
    "Certify or restrict AWS Compute with permissions like ListBucket and GetObject to avoid recon and data exfiltration by a threat actor (Sonrai-113)\nAWSLambda: TableauReports",
    "Update AWS Roles with resource restrictions to limit ability to discover all buckets and read all data (Sonrai-137)\nRole: sonrai-Carleton-Collector-Dev",
    "Remove Role that is unused which allows access (trust) from an External/3rd Party (Sonrai-1262)\nRole: sonrai-saas-dev-demosix",
  ]);
  const [Status, setNeedCheckStatus] = useState(NeedCheckStatus);
  const [selectedContentIndex, setSelectedContentIndex] = useState(null);

  const handleClick = (index) => {
    // 클릭한 콘텐츠의 인덱스를 설정
    setSelectedContentIndex(index);
    setNeedCheckStatus((prev) => !prev);
    // 클릭 상태를 상위 컴포넌트로 전달
    isNeedCheck();
  };

  return (
    <S.Wrapper>
      <S.Title>Need Check</S.Title>
      <S.ContentArea NeedCheckStatus={NeedCheckStatus}>
        {!NeedCheckStatus && selectedContentIndex !== null ? (
          <S.Content NeedCheckStatus={true} onClick={() => handleClick(null)}>
            {innerContents[selectedContentIndex]}
          </S.Content>
        ) : (
          innerContents.map((content, index) => (
            <S.Content
              key={index}
              onClick={() => handleClick(index)}
              NeedCheckStatus={false}
            >
              {content}
            </S.Content>
          ))
        )}
      </S.ContentArea>
    </S.Wrapper>
  );
};

export default NeedCheck;
