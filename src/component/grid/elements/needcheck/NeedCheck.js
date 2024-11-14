import * as S from "./NeedCheck_style";
import { useState } from "react";

const NeedCheck = () => {
  // eslint-disable-next-line no-unused-vars
  const [innerContents, setInnerContents] = useState([
    "Certify or restrict AWS Compute with permissions like ListBucket and GetObject to avoid recon and data exfiltration by a threat actor (Sonrai-113)\nAWSLambda: TableauReports",
    "Update AWS Roles with resource restrictions to limit ability to discover all buckets and read all data (Sonrai-137)\nRole: sonrai-Carleton-Collector-Dev",
    "Remove Role that is unused which allows access (trust) from an External/3rd Party (Sonrai-1262)\nRole: sonrai-saas-dev-demosix",
  ]);

  return (
    <S.Wrapper>
      <S.Title>Need Check</S.Title>
      <S.ContentArea>
        {innerContents.map((content, index) => (
          <S.Content key={index}>{content}</S.Content>
        ))}
      </S.ContentArea>
    </S.Wrapper>
  );
};

export default NeedCheck;
