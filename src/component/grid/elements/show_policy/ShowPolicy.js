import React from "react";
import DiffViewer from "react-diff-viewer-continued";
import * as S from "./ShowPolicy_style";

const policy1 = `{
  PolicyName: "Aegislenz-s3-queue",
  PolicyDocument: {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "S3AndSQSAccess",
        Effect: "Allow",
        Action: [
          "s3:GetObject",
          "s3:ListBucket",
          "s3:PutObject",
          "s3:PutObjectAcl",
          "s3:GetBucketLocation",
          "logs:DescribeLogGroups",
          "logs:GetLogEvents",
          "logs:FilterLogEvents",
          "sqs:ReceiveMessage",
          "sqs:DeleteMessage",
          "sqs:ChangeMessageVisibility",
          "sqs:GetQueueAttributes",
          "sqs:ListQueues",
        ],
        Resource: [
          "arn:aws:s3:::aegislenz-s3",
          "arn:aws:s3:::aegislenz-s3/*",
          "arn:aws:s3:::aegislenz-s3/AWSLogs/*",
          "arn:aws:sqs:us-east-1:713881791527:AegisLenz-s3-queue",
          "arn:aws:sqs:us-east-1:713881791527:AegisLenz-cloudtrail-queue",
        ],
      },
    ],
  },
}`;
const policy2 = `{
    PolicyName: "AmazonEC2FullAccess",
    PolicyDocument: {
      Version: "2012-10-17",
      Statement: [{ Action: "ec2:*", Effect: "Allow", Resource: "*" }],
    },
  }`;

const ShowPolicy = () => {
  return (
    <S.Wrapper>
      <S.Title>Policy</S.Title>
      <S.ContentArea>
        <DiffViewer
          oldValue={policy1}
          newValue={policy2}
          splitView={true}
          hideLineNumbers={false}
          showDiffOnly={true}
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
              width: "100%",
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
