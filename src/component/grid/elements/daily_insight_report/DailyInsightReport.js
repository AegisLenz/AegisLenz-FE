import * as S from "./DailyInsightReport_style";
import { useState } from "react";

const Daily = () => {
  // eslint-disable-next-line no-unused-vars
  const [contents, setContents] = useState([
    "By addressing Inactive Accounts (No login for 60 days) and Orphaned Accounts, the risk of unauthorized access can be significantly reduced. Prompt action will enhance overall security.",
    "Resolving issues related to Overprovisioned Admin Roles and Expired Temporary Access can lower the risk of privileged access misuse by more than half.",
  ]);

  return (
    <S.Wrapper>
      <S.Title>Daily Insight Report</S.Title>
      <S.ContentArea>
        <S.SubContent>
          {contents.map((content) => (
            <S.Content>{content}</S.Content>
          ))}
        </S.SubContent>
      </S.ContentArea>
    </S.Wrapper>
  );
};

export default Daily;
