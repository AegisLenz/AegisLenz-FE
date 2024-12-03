import React from "react";
import DiffViewer from "react-diff-viewer-continued";
import * as S from "./MarkDiff_style";
import { useState } from "react";

const MarkDiff = () => {
  // eslint-disable-next-line no-unused-vars
  const [Policy, setPolicy] = useState([
    `{
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
  }`,
    `{
    PolicyName: "Aegislenz-s3-queue111",
    PolicyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Sid: "S3AndSQSAccess",
          Effect: "Allow",
          Action: [
            "s3:GetObject",
            "s3:ListBucket",
            "sqs:ChangeMessageVisibility",
            "sqs:GetQueueAttributes",
            "sqs:ListQueues",
          ],
          Resource: [
            "arn:aws:s3:::aegislenz-s3",
          ],
        },
      ],
    },
  }`,
    `{
    PolicyName: "AmazonEC2FullAccess",
    PolicyDocument: {
      Version: "2012-10-17",
      Statement: [{ Action: "ec2:*", Effect: "Allow", Resource: "*" }],
    },
  }`,
    `{
    PolicyName: "AmazonEC2FullAccess",
    PolicyDocument: {
      Version: "2012-10-17",
      Statement: [{ Action: "ec2:*", Effect: "Allow", Resource: "*" }],
    },
  }`,
    `{
    PolicyName: "AmazonEC2FullAccess",
    PolicyDocument: {
      Version: "2012-10-17",
      Statement: [{ Action: "ec2:*", Effect: "Allow", Resource: "*" }],
    },
  }`,
    `{
    PolicyName: "AmazonEC2FullAccess",
    PolicyDocument: {
      Version: "2012-10-17",
      Statement: [{ Action: "ec2:*", Effect: "Allow", Resource: "*" }],
    },
  }`,
  ]);
  // eslint-disable-next-line no-unused-vars
  const [policyIndex, setpolicyIndex] = useState([
    "Aegislenz-s3-queue",
    "AmazonEC2FullAccess1",
    "AmazonEC2FullAccess",
    "AmazonEC2FullAccess",
    "AmazonEC2FullAccess",
  ]);

  const [newValue, setnewValue] = useState(Policy[0]);
  const [oldValue, setoldValue] = useState(Policy[1]);

  return (
    <S.Wrapper>
      <S.Title>Policy</S.Title>
      <S.IndexWrapper>
        <S.IndexArea>
          {policyIndex.map((value, index) => (
            <S.Policy_index
              index={index}
              onClick={() => {
                setoldValue(Policy[index]);
              }}
            >
              {value}
            </S.Policy_index>
          ))}
        </S.IndexArea>
        <S.IndexArea>
          {policyIndex.map((value, index) => (
            <S.Policy_index
              index={index}
              onClick={() => {
                setnewValue(Policy[index]);
              }}
            >
              {value}
            </S.Policy_index>
          ))}
        </S.IndexArea>
      </S.IndexWrapper>
      <S.ContentArea>
        <DiffViewer
          oldValue={oldValue}
          newValue={newValue}
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

export default MarkDiff;
