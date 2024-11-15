import React from "react";
import DiffViewer, { DiffMethod } from "react-diff-viewer-continued";
import * as S from "./ShowPolicy_style";

const policy1 = `{
        "PolicyName": "Aegislenz-s3-queue",
        "PolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Sid": "S3AndSQSAccess",
              "Effect": "Allow",
              "Action": [
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
                "sqs:ListQueues"
              ],
              "Resource": [
                "arn:aws:s3:::aegislenz-s3",
                "arn:aws:s3:::aegislenz-s3/*",
                "arn:aws:s3:::aegislenz-s3/AWSLogs/*",
                "arn:aws:sqs:us-east-1:713881791527:AegisLenz-s3-queue",
                "arn:aws:sqs:us-east-1:713881791527:AegisLenz-cloudtrail-queue",
                "arn:aws:s3:::aegislenz-s3/AWSLogs/713881791527/CloudTrail/*"
              ]
            },
            {
              "Sid": "EC2AndCloudTrailAccess",
              "Effect": "Allow",
              "Action": [
                "ec2:DescribeTags",
                "ec2:DescribeInstances",
                "cloudtrail:LookupEvents",
                "cloudtrail:GetTrailStatus"
              ],
              "Resource": "*"
            },
            {
              "Sid": "S3BucketPolicyAccess",
              "Effect": "Allow",
              "Action": "s3:PutBucketPolicy",
              "Resource": "arn:aws:s3:::aegislenz-s3"
            }
          ]
        }
      }`;
const policy2 = `{
        "Version": "2012-10-17",
        "Statement": [
          {
            "Sid": "policy-s3:ListBuckets",
            "Action": "s3:ListBuckets",
            "Resource": [
              "*"
            ],
            "Effect": "Allow"
          },
          {
            "Sid": "policy-s3:GetObject",
            "Action": "s3:GetObject",
            "Resource": [
              "*"
            ],
            "Effect": "Allow"
          },
          {
            "Sid": "policy-ec2:StartInstances",
            "Action": "ec2:StartInstances",
            "Resource": [
              "*"
            ],
            "Effect": "Allow"
          }
        ]
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
