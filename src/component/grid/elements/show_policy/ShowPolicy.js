import React from "react";
import DiffViewer, { DiffMethod } from "react-diff-viewer-continued";
import * as S from "./ShowPolicy_style";

const policy1 = `
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "iam:List*",
        "iam:PassRole",
        "iam:GetRole",
        "iam:UpdateAssumeRolePolicy",
        "sts:AssumeRole",
        "iam:GetPolicyVersion",
        "iam:ListRolePolicies",
        "iam:ListAccessKeys",
        "iam:GetAccessKeyLastUsed",
        "iam:ListAttachedUserPolicies",
        "sts:GetCallerIdentity"
      ],
      "Resource": "*"
    }
  ]
}
`;
const policy2 = `
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AIfyw2odd7",
      "Effect": "Allow",
      "Action": [
        "iam:ListAttachedUserPolicies",
        "iam:GetPolicyVersion",
        "iam:ListRolePolicies",
        "iam:GetAccessKeyLastUsed",
        "iam:GetRole",
        "iam:ListAccessKeys"
      ],
      "Resource": "arn:aws:iam::713881791527:user/Victim"
    }
  ]
}
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "6xHfbXKAIO",
      "Effect": "Allow",
      "Action": [
        "sts:GetCallerIdentity"
      ],
      "Resource": "*"
    }
  ]
}
`;

const ShowPolicy = () => {
  return (
    <S.Wrapper>
      <S.Title>Policy</S.Title>
      <S.ContentArea>
        <DiffViewer
          oldValue={policy1}
          newValue={policy2}
          splitView={true}
          compareMethod={DiffMethod.WORDS}
          styles={{
            variables: {
              light: {
                diffViewerBackground: "#fafbfc",
                addedBackground: "#e6ffed",
                removedBackground: "#ffeef0",
                addedGutterBackground: "#cdffd8",
                removedGutterBackground: "#ffdce0",
              },
            },
            diffContainer: {
              display: "flex",
            },
            line: {
              minWidth: "50%",
            },
            lineGutter: {
              minWidth: "50%",
            },
          }}
        />
      </S.ContentArea>
    </S.Wrapper>
  );
};

export default ShowPolicy;
