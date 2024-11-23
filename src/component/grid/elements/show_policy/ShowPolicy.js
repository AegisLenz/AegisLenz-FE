import React from "react";
import DiffViewer, { DiffMethod } from "react-diff-viewer-continued";
import * as S from "./ShowPolicy_style";

const policy1 = `
{
  "attack_user": [
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "policy-ec2:StopInstances",
          "Action": "ec2:StopInstances",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-ec2:DescribeInstances",
          "Action": "ec2:DescribeInstances",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-ec2:DescribeRouteTables",
          "Action": "ec2:DescribeRouteTables",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-ec2:DescribeNetworkInterfaces",
          "Action": "ec2:DescribeNetworkInterfaces",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-ec2:DescribeNatGateways",
          "Action": "ec2:DescribeNatGateways",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-ec2:CreateRouteTable",
          "Action": "ec2:CreateRouteTable",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-ec2:CreateSubnet",
          "Action": "ec2:CreateSubnet",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-ec2:DescribeSecurityGroups",
          "Action": "ec2:DescribeSecurityGroups",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-iam:ListAttachedRolePolicies",
          "Action": "iam:ListAttachedRolePolicies",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-ec2:DescribeVpcAttribute",
          "Action": "ec2:DescribeVpcAttribute",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-ec2:RunInstances",
          "Action": "ec2:RunInstances",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-ec2:DescribeInstanceAttribute",
          "Action": "ec2:DescribeInstanceAttribute",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-ec2:ModifyInstanceAttribute",
          "Action": "ec2:ModifyInstanceAttribute",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-iam:AttachRolePolicy",
          "Action": "iam:AttachRolePolicy",
          "Resource": ["*"],
          "Effect": "Allow"
        }
      ]
    }
  ]
}
`;
const policy2 = `
{
  "attack_user": [
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Sid": "policy-ec2:ModifyInstanceAttribute",
          "Action": "ec2:ModifyInstanceAttribute",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-ec2:StopInstances",
          "Action": "ec2:StopInstances",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-ec2:DescribeInstances",
          "Action": "ec2:DescribeInstances",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-ec2:DescribeRouteTables",
          "Action": "ec2:DescribeRouteTables",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-ec2:DescribeNetworkInterfaces",
          "Action": "ec2:DescribeNetworkInterfaces",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-ec2:DescribeNatGateways",
          "Action": "ec2:DescribeNatGateways",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-ec2:CreateRouteTable",
          "Action": "ec2:CreateRouteTable",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-ec2:CreateSubnet",
          "Action": "ec2:CreateSubnet",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-ec2:DescribeSecurityGroups",
          "Action": "ec2:DescribeSecurityGroups",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-iam:ListAttachedRolePolicies",
          "Action": "iam:ListAttachedRolePolicies",
          "Resource": ["arn:aws:iam::064029096479:user/attack_user"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-ec2:DescribeVpcAttribute",
          "Action": "ec2:DescribeVpcAttribute",
          "Resource": ["*"],
          "Effect": "Allow"
        },
        {
          "Sid": "policy-iam:AttachRolePolicy",
          "Action": "iam:AttachRolePolicy",
          "Resource": ["arn:aws:iam::064029096479:user/attack_user"],
          "Effect": "Allow"
        }
      ]
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
