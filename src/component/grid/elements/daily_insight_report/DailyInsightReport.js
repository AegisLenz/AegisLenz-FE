import * as S from "./DailyInsightReport_style";
import { useState } from "react";

const Daily = () => {
  // eslint-disable-next-line no-unused-vars
  const [contents, setContents] = useState([
    "The user account user123@example.com attempted to access unauthorized resources (S3 bucket, IAM roles) outside of working hours. The access was automatically blocked, and the account should be reviewed for potential compromise.",
    "The service account service-admin attempted to escalate its privileges to administrator level but was blocked. Investigate whether the account has been compromised and review its permissions.",
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
