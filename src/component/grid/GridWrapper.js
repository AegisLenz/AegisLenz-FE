import { useEffect, useMemo, useState, useRef } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import Alert from "../alert/Alert";
import ChatToggle from "../toggle/chat/ToggleChat";
import FilterToggle from "../toggle/filter/Filter";
import { useLocation } from "react-router-dom";
import {
  AccountByService,
  AccountCount,
  AccountStatus,
  DailyInsight,
  Detection,
  EC2Status,
  NeedCheck,
  Report,
  Score,
  ShowPolicy,
  ShowLog,
  AttackVisualGraph,
  Risk,
} from "./elements";
import * as S from "./Grid_style";

const testAccount = [
  {
    UserName: "Hyunjun_Park",
    UserId: "AIDA2MNVLVQT4YD7QRMBR",
    CreateDate: "2024-10-01T05:45:15.000Z",
    UserPolicies: [],
    AttachedPolicies: [
      "Aegislenz-s3-queue",
      "AmazonEC2FullAccess",
      "AdministratorAccess",
      "IAMUserChangePassword",
      "AmazonS3FullAccess",
    ],
    Groups: [],
    AccessKeysLastUsed: [],
    LastUpdated: "2024-10-31T15:22:50.969Z",
  },
  {
    UserName: "Jiyun_Kim",
    UserId: "AIDA2MNVLVQTRDIWKGAC5",
    CreateDate: "2024-09-30T08:23:21.000Z",
    UserPolicies: [],
    AttachedPolicies: [
      "Aegislenz-s3-queue",
      "AmazonEC2FullAccess",
      "AdministratorAccess",
      "IAMUserChangePassword",
      "AmazonS3FullAccess",
    ],
    Groups: [],
    AccessKeysLastUsed: [],
    LastUpdated: "2024-10-31T15:22:52.075Z",
  },
  {
    UserName: "Taeyang_Kim",
    UserId: "AIDA2MNVLVQTWUUAMZCZE",
    CreateDate: "2024-09-30T08:19:35.000Z",
    UserPolicies: [],
    AttachedPolicies: [
      "Aegislenz-s3-queue",
      "AmazonEC2FullAccess",
      "AdministratorAccess",
      "IAMUserChangePassword",
      "AmazonS3FullAccess",
    ],
    Groups: [],
    AccessKeysLastUsed: [],
    LastUpdated: "2024-10-31T15:22:53.895Z",
  },
  {
    UserName: "Wonje_Cha",
    UserId: "AIDA2MNVLVQT5TARLHOZP",
    CreateDate: "2024-10-01T04:11:48.000Z",
    UserPolicies: [],
    AttachedPolicies: ["AmazonEC2FullAccess", "AdministratorAccess"],
    Groups: [],
    AccessKeysLastUsed: [
      {
        AccessKeyId: "AKIA2MNVLVQT53CDZV4V",
        Status: "Active",
        LastUsedDate: "2024-10-31T15:10:00.000Z",
      },
    ],
    LastUpdated: "2024-10-31T15:22:55.125Z",
  },
  {
    UserName: "Yeji_Shin",
    UserId: "AIDA2MNVLVQTSEX5JPOM3",
    CreateDate: "2024-09-30T08:21:28.000Z",
    UserPolicies: [],
    AttachedPolicies: [
      "AmazonEC2FullAccess",
      "AdministratorAccess",
      "IAMUserChangePassword",
    ],
    Groups: [],
    AccessKeysLastUsed: [],
    LastUpdated: "2024-10-31T15:22:56.459Z",
  },
  {
    UserName: "Yujeong_Choi",
    UserId: "AIDA2MNVLVQT6H4YW2SMB",
    CreateDate: "2024-10-01T05:47:18.000Z",
    UserPolicies: [],
    AttachedPolicies: [
      "AmazonEC2FullAccess",
      "AdministratorAccess",
      "IAMUserChangePassword",
    ],
    Groups: [],
    AccessKeysLastUsed: [],
    LastUpdated: "2024-10-31T15:22:57.687Z",
  },
];

const testlogdata = [
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP2EO5UFTYS",
      arn: "arn:aws:iam::064029096479:user/normal-user-20",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPQIFMYIWL",
      userName: "normal-user-20",
    },
    eventTime: "2024-09-27T01:55:53Z",
    eventSource: "cloudtrail.amazonaws.com",
    eventName: "LookupEvents",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "aws-cli/2.17.46 md/awscrt#0.21.2 ua/2.0 os/macos#24.1.0 md/arch#arm64 lang/python#3.11.10 md/pyimpl#CPython cfg/retry-mode#standard md/installer#source md/prompt#off md/command#cloudtrail.lookup-events",
    requestParameters: {
      lookupAttributes: [
        {
          attributeKey: "Username",
          attributeValue: "normal-user-20",
        },
      ],
      startTime: "Sep 26, 2024, 9:53:04 AM",
      endTime: "Sep 27, 2024, 1:53:04 AM",
    },
    responseElements: null,
    requestID: "eaa0e576-6cd2-4aa3-9b9c-c1f6d254ce5b",
    eventID: "8be5987f-49e8-4307-a6d2-d2029ccdc390",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "cloudtrail.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP2EO5UFTYS",
      arn: "arn:aws:iam::064029096479:user/normal-user-20",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPQIFMYIWL",
      userName: "normal-user-20",
    },
    eventTime: "2024-09-27T01:55:52Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "CreateTags",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "aws-cli/2.17.46 md/awscrt#0.21.2 ua/2.0 os/macos#24.1.0 md/arch#arm64 lang/python#3.11.10 md/pyimpl#CPython cfg/retry-mode#standard md/installer#source md/prompt#off md/command#ec2.create-tags",
    requestParameters: {
      resourcesSet: {
        items: [
          {
            resourceId: "i-0a32b2fd7f436e21c",
          },
        ],
      },
      tagSet: {
        items: [
          {
            key: "Name",
            value: "TestInstance",
          },
        ],
      },
    },
    responseElements: {
      requestId: "b1bc1491-da58-4aad-b6a0-7ba70dea01b2",
      _return: true,
    },
    requestID: "b1bc1491-da58-4aad-b6a0-7ba70dea01b2",
    eventID: "b7004c97-36a2-44b2-9a4a-6113c7f1e95c",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP2EO5UFTYS",
      arn: "arn:aws:iam::064029096479:user/normal-user-20",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPQIFMYIWL",
      userName: "normal-user-20",
    },
    eventTime: "2024-09-27T01:55:50Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "aws-cli/2.17.46 md/awscrt#0.21.2 ua/2.0 os/macos#24.1.0 md/arch#arm64 lang/python#3.11.10 md/pyimpl#CPython cfg/retry-mode#standard md/installer#source md/prompt#off md/command#ec2.describe-instances",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-0a32b2fd7f436e21c",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "f752df25-f4f6-42ab-8ffd-ece3f2422bc9",
    eventID: "6521fc8d-f872-4bc8-917c-4f6058248f17",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP2EO5UFTYS",
      arn: "arn:aws:iam::064029096479:user/normal-user-20",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPQIFMYIWL",
      userName: "normal-user-20",
    },
    eventTime: "2024-09-27T01:55:48Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "aws-cli/2.17.46 md/awscrt#0.21.2 ua/2.0 os/macos#24.1.0 md/arch#arm64 lang/python#3.11.10 md/pyimpl#CPython cfg/retry-mode#standard md/installer#source md/prompt#off md/command#ec2.describe-instances",
    requestParameters: {
      instancesSet: {},
      filterSet: {},
    },
    responseElements: null,
    requestID: "cc4cb789-82a9-46d7-9768-927bc7e06399",
    eventID: "2e9b6074-917a-4d5b-9ce8-3170117ca2e5",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP2EO5UFTYS",
      arn: "arn:aws:iam::064029096479:user/normal-user-20",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPQIFMYIWL",
      userName: "normal-user-20",
    },
    eventTime: "2024-09-27T01:55:47Z",
    eventSource: "cloudtrail.amazonaws.com",
    eventName: "DescribeTrails",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "aws-cli/2.17.46 md/awscrt#0.21.2 ua/2.0 os/macos#24.1.0 md/arch#arm64 lang/python#3.11.10 md/pyimpl#CPython cfg/retry-mode#standard md/installer#source md/prompt#off md/command#cloudtrail.describe-trails",
    requestParameters: null,
    responseElements: null,
    requestID: "c68e2933-f33d-411e-988c-212ed1bb233c",
    eventID: "73046df7-0b81-4862-b367-d3c5f938e319",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "cloudtrail.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.08",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP2EO5UFTYS",
      arn: "arn:aws:iam::064029096479:user/normal-user-20",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPQIFMYIWL",
      userName: "normal-user-20",
    },
    eventTime: "2024-09-27T01:55:46Z",
    eventSource: "sts.amazonaws.com",
    eventName: "GetCallerIdentity",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "aws-cli/2.17.46 md/awscrt#0.21.2 ua/2.0 os/macos#24.1.0 md/arch#arm64 lang/python#3.11.10 md/pyimpl#CPython cfg/retry-mode#standard md/installer#source md/prompt#off md/command#sts.get-caller-identity",
    requestParameters: null,
    responseElements: null,
    requestID: "0099ca15-3073-4f2c-a2b6-90af8d91a87e",
    eventID: "2b6772ac-43a7-4b63-928b-5a08695686ee",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "sts.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:47:04Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "763c11be-681b-4bf9-986c-c63c58d6353b",
    eventID: "01582862-3b6f-4b5a-b204-9bcdd4e0b118",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:47:02Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "edfbd2bc-8c93-4865-a9c1-b3b6498f77a3",
    eventID: "9f7f7f71-f3b8-4b6e-aee3-562875655962",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:47:00Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "066e2810-2e64-4b27-824e-b975bd0fe893",
    eventID: "2cd47bd9-91b2-48ad-bb4b-b2928fd5fa68",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:59Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "08036446-7d7a-4af0-b067-643eb2aa6c17",
    eventID: "e277b5b6-4a2b-4145-b5a0-a536e9a651df",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:58Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "StartInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
    },
    responseElements: {
      requestId: "276e5f67-6877-40cc-b968-e0f33679881c",
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
            currentState: {
              code: 0,
              name: "pending",
            },
            previousState: {
              code: 80,
              name: "stopped",
            },
          },
        ],
      },
    },
    requestID: "276e5f67-6877-40cc-b968-e0f33679881c",
    eventID: "31ac2737-312d-4b78-b9b3-fbcdd3e8ac6f",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0008 - Execution",
    mitreAttackTechnique: "T1484 - Domain Policy Modification",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:57Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "d982fd8e-e143-42f8-be71-f00394eb092f",
    eventID: "82f0b47b-a639-4d16-abab-5e57a67270b4",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:57Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "ModifyInstanceAttribute",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instanceId: "i-01c646c4b28fcf780",
      userData: "<sensitiveDataRemoved>",
    },
    responseElements: {
      requestId: "ce56cbb8-4255-4a89-87fc-7ff49459487f",
      _return: true,
    },
    requestID: "ce56cbb8-4255-4a89-87fc-7ff49459487f",
    eventID: "a8612f56-716e-48d7-b3f2-c55c52f4b1a3",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0008 - Execution",
    mitreAttackTechnique: "T1059 - Command and Scripting Interpreter",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:55Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "f30a3698-e0cb-41c7-9f3d-f37381c0c313",
    eventID: "12aa998c-fc5a-4d6b-afd2-f82f6d0d009d",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:53Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "8561516d-7887-44a3-b64e-be707307d286",
    eventID: "252c3328-c6df-404e-8cfc-99bf76594d7f",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:51Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "4480886b-4e03-40d1-b8d2-c656347fde3a",
    eventID: "ce715b9e-7c0a-4a53-a1b5-d4e6cd226646",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:49Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "535a57d2-1908-4c3b-ac87-62ef8b0c6b55",
    eventID: "0143431c-4e78-4c2a-a13a-a02769e0d17f",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:46Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "27d4a7fe-ab7b-4f92-9c2b-ecab6093eab3",
    eventID: "88ba531f-6b3b-4c4c-8b62-8a71dc934272",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:45Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "7dc5eb99-395e-4b08-9ace-3b1abfc5b68a",
    eventID: "56987e0e-7906-4fc8-a6d6-88f8b2331ce1",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:43Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "37ac820a-9c8e-412f-ae17-a600c18a7df3",
    eventID: "b71daab2-2334-4eb1-8af8-520b24f0d5ed",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:41Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "45b115f7-9c9f-4871-8e54-df493ffa83e0",
    eventID: "0530cd03-394a-4572-86d3-87a75ae286e6",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:40Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "e865f341-785b-4fa8-bab2-fa2e696a3a75",
    eventID: "1947436f-e150-409f-8a15-66a5b88de3d6",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:38Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "a95098ad-dea8-46e5-a283-896b4f58b032",
    eventID: "deb9f227-bf6e-4402-8454-b9f661a2f88b",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:36Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "c7677084-0c00-4bc4-bc01-b4ad5ee99695",
    eventID: "dfa1e98a-a4f7-4f42-89cd-cecc4578f85c",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:34Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "ab382a8f-bef9-4b64-a588-9f306bfdab8d",
    eventID: "9e10036d-c9b6-4f71-a4e6-b1be6f681eba",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:33Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "abc1394c-0257-46b7-b8d4-6060ec0c2797",
    eventID: "f79963a1-b91c-4033-b286-ec3b39a88e7a",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:31Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "9d7e7378-2e9a-4450-9a79-e482f822b46b",
    eventID: "9510ce28-00d2-4dfe-9bf7-53dc3e26c92d",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:29Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "b46cbb20-c1bd-4620-9cdd-8eba76bb609a",
    eventID: "ee75424c-b641-4c32-8cab-6f9bab953679",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:27Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "38b27c21-4a33-41e3-a908-4568b05ce193",
    eventID: "198c8b42-7dfe-489e-bba2-6cd211ff7d73",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:25Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "d281d60e-9e87-4c42-99eb-d090c1618c3a",
    eventID: "201783b6-22ea-4f3a-98ed-00d9aa912d15",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:23Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "9da4753c-c15a-499c-bb0a-a58788783eac",
    eventID: "c2e74f7c-ff79-4198-9b56-cb6315b5b230",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:21Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "152e5fc2-f779-48a2-93c2-b5b67efb11b0",
    eventID: "608493c3-8315-4a29-af5b-9b52fe826e0a",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:19Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "3dbb70a8-6f1b-4266-b6c3-e9c9f434171b",
    eventID: "d672617a-7516-4d11-9b45-17f1773a97ed",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:18Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "998f5e00-c979-4f95-ba02-b9a4557e85be",
    eventID: "34d1a86e-e166-4ac2-93e0-a1fd2865833f",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:16Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "239be245-1ce1-4df9-b16a-3bd76e6e6dbc",
    eventID: "4b5e428f-9147-4368-b73e-48b46a06ddb0",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:15Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "35a5918a-9b1d-4cd2-8d1e-fb9132ed2a8c",
    eventID: "8af1bdf5-2b6b-4bfb-aadc-d685394f36a0",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:13Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "77df9087-6480-48d3-9c65-e0b628c9305b",
    eventID: "38e5ac27-bcb1-491a-bfb2-486cab8f3dcc",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:11Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "7037911b-2455-46ce-bae7-8d25bfc5b86e",
    eventID: "6fa9ceb8-8966-4481-8815-f80e370717eb",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:10Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "1ea7901f-3dcd-4d66-b1f2-bb4501064928",
    eventID: "de47416e-8bbf-42b8-a723-ccfbf0cec732",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:08Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "89df1daa-6f67-468b-81da-5cd89f6495d8",
    eventID: "fc0cb4bb-56bd-481d-9d07-90b8bfb4ede3",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:05Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "f12f476b-e79d-419c-86a8-de4e0448748b",
    eventID: "b71b11a9-9acd-4ad8-9398-0ea8e16ee382",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:03Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "5a4ebf50-7230-48d1-ac8c-b557bcdea7f5",
    eventID: "217fedad-77bd-47c5-befb-a64febddbe20",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:02Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "0d215a41-bfd2-429c-a976-da1bf5e742a1",
    eventID: "63732055-5dd6-4cf0-b789-bf781461d004",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:46:00Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "0bc8bfc4-5b85-4748-8274-c49a1d90ef79",
    eventID: "91be934c-38cf-4327-ab40-68eeb762a172",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:45:58Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "696b8a05-e524-4979-ada2-d0c467ba20d5",
    eventID: "808a160c-7ec8-48b8-9eaf-6139204fa836",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:45:56Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "061d27b8-971c-45c6-a750-9878ff3361d5",
    eventID: "a9f4fcdb-9003-4c72-906a-670f7cc26d71",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:45:55Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "2be2bcdf-6dbd-4b21-932a-e40b0c730a8f",
    eventID: "89bf8c90-296a-4507-9c51-c0da2d7ef1a2",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:45:53Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "d1792af6-01bf-402a-a8cb-a6cb8a4cdcf0",
    eventID: "264dd26f-9fc6-4d67-b76f-3c2d0d936aba",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:45:52Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "StopInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      force: true,
    },
    responseElements: {
      requestId: "5474eb1f-f653-4375-8930-552b7d74ddc1",
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
            currentState: {
              code: 64,
              name: "stopping",
            },
            previousState: {
              code: 16,
              name: "running",
            },
          },
        ],
      },
    },
    requestID: "5474eb1f-f653-4375-8930-552b7d74ddc1",
    eventID: "3b1c45b3-47a1-4242-bc90-d829f951e4ef",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0008 - Execution",
    mitreAttackTechnique: "T1489 - Service Stop",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:45:52Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "a3435ab7-b3a5-4773-8dfd-a8853592f6da",
    eventID: "9ae160ef-1bc7-480a-96d3-230f5e0d92e5",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:45:50Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeRouteTables",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      routeTableIdSet: {
        items: [
          {
            routeTableId: "rtb-0654d7eb79297d663",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "8a935dd7-4f1f-4e3c-a119-7c4af805e639",
    eventID: "eae46a2a-e219-4aa5-8573-2faf5415b4b7",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:45:49Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeRouteTables",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      routeTableIdSet: {
        items: [
          {
            routeTableId: "rtb-0654d7eb79297d663",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "2e810f10-c00a-40b5-ad04-d617b5edec1e",
    eventID: "6ab67504-9c1e-4262-9f54-2fc40b0eeadc",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:45:49Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeRouteTables",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      routeTableIdSet: {
        items: [
          {
            routeTableId: "rtb-0654d7eb79297d663",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "eaa5bd92-884f-479a-aa8b-a7305922cf50",
    eventID: "7cb11732-ef76-444f-9800-3f25b1995223",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:45:48Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "CreateRoute",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      routeTableId: "rtb-0654d7eb79297d663",
      destinationCidrBlock: "0.0.0.0/0",
      natGatewayId: "nat-0ab2f2ff04c5b7978",
    },
    responseElements: {
      requestId: "906035ce-dbd5-43dd-8f9c-7d2a931ec58a",
      _return: true,
    },
    requestID: "906035ce-dbd5-43dd-8f9c-7d2a931ec58a",
    eventID: "9f8389ba-e212-428d-9610-f2d1020a8305",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:45:47Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeNatGateways",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      DescribeNatGatewaysRequest: {
        NatGatewayId: {
          tag: 1,
          content: "nat-0ab2f2ff04c5b7978",
        },
      },
    },
    responseElements: null,
    requestID: "2611ad34-44f9-4e49-bd16-d543d7cc9328",
    eventID: "3b2c4466-99b9-473e-a7c2-d2b2caa48fd2",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:45:46Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeNatGateways",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      DescribeNatGatewaysRequest: {
        NatGatewayId: {
          tag: 1,
          content: "nat-0ab2f2ff04c5b7978",
        },
      },
    },
    responseElements: null,
    requestID: "7b072651-dc88-46b7-a10c-6d35b92c6213",
    eventID: "a4ac6c3d-488c-47b7-b64e-f9f837fc340b",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:45:35Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeNatGateways",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      DescribeNatGatewaysRequest: {
        NatGatewayId: {
          tag: 1,
          content: "nat-0ab2f2ff04c5b7978",
        },
      },
    },
    responseElements: null,
    requestID: "aa7b0b29-10ca-4904-b0dd-8b8e8e42fa01",
    eventID: "c0e33218-bed6-48ba-beb3-f4aaff7cbe0e",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:45:24Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeNatGateways",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      DescribeNatGatewaysRequest: {
        NatGatewayId: {
          tag: 1,
          content: "nat-0ab2f2ff04c5b7978",
        },
      },
    },
    responseElements: null,
    requestID: "8c5b5049-2831-4ed7-bf5a-67230d574e02",
    eventID: "959454ab-62c3-410e-847b-9ee7876401f9",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:45:13Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeNatGateways",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      DescribeNatGatewaysRequest: {
        NatGatewayId: {
          tag: 1,
          content: "nat-0ab2f2ff04c5b7978",
        },
      },
    },
    responseElements: null,
    requestID: "8c0a2415-607d-4f04-b842-30560b8e8042",
    eventID: "58ac49c0-98c4-41a5-b016-66a5267741a9",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:45:03Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeNatGateways",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      DescribeNatGatewaysRequest: {
        NatGatewayId: {
          tag: 1,
          content: "nat-0ab2f2ff04c5b7978",
        },
      },
    },
    responseElements: null,
    requestID: "bb248090-f9ee-4645-ae26-f0c0edb1c843",
    eventID: "aba4e867-6526-4776-9f7e-ac0d8eaf2673",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:52Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeNatGateways",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      DescribeNatGatewaysRequest: {
        NatGatewayId: {
          tag: 1,
          content: "nat-0ab2f2ff04c5b7978",
        },
      },
    },
    responseElements: null,
    requestID: "2c5a260f-913f-403f-91ac-89a61e2c4d97",
    eventID: "c58ae6e1-51d9-4c2b-8237-b9452dd07ed2",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:44Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstanceCreditSpecifications",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      DescribeInstanceCreditSpecificationsRequest: {
        InstanceId: {
          tag: 1,
          content: "i-01c646c4b28fcf780",
        },
      },
    },
    responseElements: null,
    requestID: "c7880c53-14bf-4a51-8549-8aa90d0480d3",
    eventID: "92484903-c226-4c5e-8909-7cbee8230e8d",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:43Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstanceAttribute",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      instanceId: "i-01c646c4b28fcf780",
      attribute: "userData",
    },
    responseElements: null,
    requestID: "d0711cc6-ea06-4cfd-ad7a-5dc39b5f3d3d",
    eventID: "9126110d-32c8-4e62-a7ec-d21cf6298084",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:42Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstanceAttribute",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      instanceId: "i-01c646c4b28fcf780",
      attribute: "disableApiTermination",
    },
    responseElements: null,
    requestID: "6e68c1c0-c21e-4a9a-b04f-adc9013acff6",
    eventID: "07e9daf6-3513-4a8e-966c-abab6322a242",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:41Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeVolumes",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      volumeSet: {
        items: [
          {
            volumeId: "vol-0abde5369a72b8a92",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "f586c4da-646a-488f-a10b-6dba565f8da4",
    eventID: "116a22da-e4f1-4636-a15c-25558419cac4",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:41Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeNatGateways",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      DescribeNatGatewaysRequest: {
        NatGatewayId: {
          tag: 1,
          content: "nat-0ab2f2ff04c5b7978",
        },
      },
    },
    responseElements: null,
    requestID: "30efad54-c6e9-4a96-966c-f7918f67052e",
    eventID: "f4371c8f-7468-4ea0-b1bd-6b396b20abbd",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:40Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstanceAttribute",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      instanceId: "i-01c646c4b28fcf780",
      attribute: "instanceInitiatedShutdownBehavior",
    },
    responseElements: null,
    requestID: "43f25c4d-b579-4eb1-adef-bde6f230cd89",
    eventID: "6b036ebd-e1ee-4811-96c2-697e91bc9a82",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:39Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeVpcs",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      vpcSet: {
        items: [
          {
            vpcId: "vpc-093c0f9829493236d",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "189d7867-893e-4264-884a-000f9e982815",
    eventID: "a15aa82b-2561-4808-b838-1c779a561ad1",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:38Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeTags",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      filterSet: {
        items: [
          {
            name: "resource-id",
            valueSet: {
              items: [
                {
                  value: "i-01c646c4b28fcf780",
                },
              ],
            },
          },
          {
            name: "key",
            valueSet: {
              items: [
                {
                  value: "aws:ec2launchtemplate:id",
                },
              ],
            },
          },
        ],
      },
    },
    responseElements: null,
    requestID: "49af4b2e-a3d1-44cf-9a31-6ce7c5121b55",
    eventID: "0567c523-f78b-41fb-a831-ca20128c6ee9",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:38Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "3741aa36-c592-4503-80e6-796cd818cf8b",
    eventID: "66b7a5bc-76f3-4f48-be95-62ed88c4b0d7",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:37Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "d5d12f51-427d-4611-9c6b-1683f2c432fc",
    eventID: "bb142ee7-25c9-42d2-9c49-5a06ae871a79",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:34Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeNatGateways",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      DescribeNatGatewaysRequest: {
        NatGatewayId: {
          tag: 1,
          content: "nat-0ab2f2ff04c5b7978",
        },
      },
    },
    responseElements: null,
    requestID: "f68b4619-8947-4e36-b577-ef8c535d7a14",
    eventID: "72d9c02f-1422-42b1-bbb5-0cb1afc6e365",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:30Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeNatGateways",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      DescribeNatGatewaysRequest: {
        NatGatewayId: {
          tag: 1,
          content: "nat-0ab2f2ff04c5b7978",
        },
      },
    },
    responseElements: null,
    requestID: "0076990a-34bb-4f8a-a379-c643fa429be6",
    eventID: "2761c26b-b32a-446d-8662-cdd4fcbc1d79",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:27Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeNatGateways",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      DescribeNatGatewaysRequest: {
        NatGatewayId: {
          tag: 1,
          content: "nat-0ab2f2ff04c5b7978",
        },
      },
    },
    responseElements: null,
    requestID: "e7cd0c98-53e9-46c5-b8a1-95c362c8dc36",
    eventID: "4b05fd61-62fa-40c7-b3c6-8655053890c0",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:26Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeNatGateways",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      DescribeNatGatewaysRequest: {
        NatGatewayId: {
          tag: 1,
          content: "nat-0ab2f2ff04c5b7978",
        },
      },
    },
    responseElements: null,
    requestID: "e4e71c7e-774f-456d-8cc2-d96eb2f4dacd",
    eventID: "9a7aa7c9-e0bf-438e-8d40-6587ab6983a9",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:26Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "RunInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      instancesSet: {
        items: [
          {
            imageId: "ami-05374808313ac70e6",
            minCount: 1,
            maxCount: 1,
          },
        ],
      },
      userData: "<sensitiveDataRemoved>",
      instanceType: "t3.micro",
      blockDeviceMapping: {},
      monitoring: {
        enabled: false,
      },
      disableApiTermination: false,
      disableApiStop: false,
      clientToken: "57134900-2BAA-46D8-B226-26D3E7447CBD",
      networkInterfaceSet: {
        items: [
          {
            networkInterfaceId: "eni-062687bcd14d3011e",
            deviceIndex: 0,
            deleteOnTermination: false,
          },
        ],
      },
      iamInstanceProfile: {
        name: "stratus-red-team-usr-data-instance",
      },
      ebsOptimized: false,
      tagSpecificationSet: {
        items: [
          {
            resourceType: "instance",
            tags: [
              {
                key: "StratusRedTeam",
                value: "true",
              },
            ],
          },
        ],
      },
      creditSpecification: {
        cpuCredits: "unlimited",
      },
      hibernationOptions: {
        configured: false,
      },
    },
    responseElements: {
      requestId: "f34aa28f-03f3-4733-9a5a-89849410e75c",
      reservationId: "r-085524e2e1031c80d",
      ownerId: "064029096479",
      groupSet: {},
      instancesSet: {
        items: [
          {
            instanceId: "i-01c646c4b28fcf780",
            imageId: "ami-05374808313ac70e6",
            currentInstanceBootMode: "legacy-bios",
            instanceState: {
              code: 0,
              name: "pending",
            },
            privateDnsName: "ip-10-0-1-10.ec2.internal",
            amiLaunchIndex: 0,
            productCodes: {},
            instanceType: "t3.micro",
            launchTime: 1726904666000,
            placement: {
              availabilityZone: "us-east-1a",
              tenancy: "default",
            },
            monitoring: {
              state: "disabled",
            },
            subnetId: "subnet-030aed7be905a269e",
            vpcId: "vpc-093c0f9829493236d",
            privateIpAddress: "10.0.1.10",
            stateReason: {
              code: "pending",
              message: "pending",
            },
            architecture: "x86_64",
            rootDeviceType: "ebs",
            rootDeviceName: "/dev/xvda",
            blockDeviceMapping: {},
            virtualizationType: "hvm",
            hypervisor: "xen",
            tagSet: {
              items: [
                {
                  key: "StratusRedTeam",
                  value: "true",
                },
              ],
            },
            clientToken: "57134900-2BAA-46D8-B226-26D3E7447CBD",
            groupSet: {
              items: [
                {
                  groupId: "sg-01209e6234c934f85",
                },
              ],
            },
            sourceDestCheck: true,
            networkInterfaceSet: {
              items: [
                {
                  networkInterfaceId: "eni-062687bcd14d3011e",
                  subnetId: "subnet-030aed7be905a269e",
                  vpcId: "vpc-093c0f9829493236d",
                  ownerId: "064029096479",
                  status: "in-use",
                  macAddress: "12:02:28:52:e0:05",
                  privateIpAddress: "10.0.1.10",
                  sourceDestCheck: true,
                  interfaceType: "interface",
                  groupSet: {
                    items: [
                      {
                        groupId: "sg-01209e6234c934f85",
                      },
                    ],
                  },
                  attachment: {
                    attachmentId: "eni-attach-04512b9989956fb59",
                    deviceIndex: 0,
                    networkCardIndex: 0,
                    status: "attaching",
                    attachTime: 1726904666000,
                    deleteOnTermination: false,
                  },
                  privateIpAddressesSet: {
                    item: [
                      {
                        privateIpAddress: "10.0.1.10",
                        primary: true,
                      },
                    ],
                  },
                  ipv6AddressesSet: {},
                  tagSet: {},
                },
              ],
            },
            iamInstanceProfile: {
              arn: "arn:aws:iam::064029096479:instance-profile/stratus-red-team-usr-data-instance",
              id: "AIPAQ52DOPIP5PPU2DYY4",
            },
            ebsOptimized: false,
            enaSupport: true,
            cpuOptions: {
              coreCount: 1,
              threadsPerCore: 2,
            },
            capacityReservationSpecification: {
              capacityReservationPreference: "open",
            },
            hibernationOptions: {
              configured: false,
            },
            enclaveOptions: {
              enabled: false,
            },
            metadataOptions: {
              state: "pending",
              httpTokens: "optional",
              httpPutResponseHopLimit: 1,
              httpEndpoint: "enabled",
              httpProtocolIpv4: "enabled",
              httpProtocolIpv6: "disabled",
              instanceMetadataTags: "disabled",
            },
            maintenanceOptions: {
              autoRecovery: "default",
            },
            privateDnsNameOptions: {
              hostnameType: "ip-name",
              enableResourceNameDnsARecord: false,
              enableResourceNameDnsAAAARecord: false,
            },
          },
        ],
      },
    },
    requestID: "f34aa28f-03f3-4733-9a5a-89849410e75c",
    eventID: "bad3b4d9-3384-4273-a257-1198478ec5e4",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0008 - Execution",
    mitreAttackTechnique: "T1059 - Command and Scripting Interpreter",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:25Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeRouteTables",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      routeTableIdSet: {
        items: [
          {
            routeTableId: "rtb-0bb343ed4041f22ec",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "1f5c7e6a-f819-4ecd-8606-29676f383332",
    eventID: "61229834-a5ef-4047-afc3-6e96af2922b3",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:24Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeNatGateways",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      DescribeNatGatewaysRequest: {
        NatGatewayId: {
          tag: 1,
          content: "nat-0ab2f2ff04c5b7978",
        },
      },
    },
    responseElements: null,
    requestID: "33ce8506-610d-4987-90d8-b4e4d3829f46",
    eventID: "b400dd51-0922-45a5-b01f-5f3998ff9dbd",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:24Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeRouteTables",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      routeTableIdSet: {
        items: [
          {
            routeTableId: "rtb-0bb343ed4041f22ec",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "200e0580-0d80-4f28-a8be-74d9fe8c78cb",
    eventID: "c6a4c32e-1297-43c3-9b51-402effab2757",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:24Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeNetworkInterfaces",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      networkInterfaceIdSet: {
        items: [
          {
            networkInterfaceId: "eni-062687bcd14d3011e",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "8e8c4d83-2fc9-45c9-ae07-e5dd43420d88",
    eventID: "e0355eed-7356-4a0f-b4fe-6cde998bdeb1",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:23Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeNatGateways",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      DescribeNatGatewaysRequest: {
        NatGatewayId: {
          tag: 1,
          content: "nat-0ab2f2ff04c5b7978",
        },
      },
    },
    responseElements: null,
    requestID: "e1420bed-dc7b-43db-9390-fb95431c3ab8",
    eventID: "28eb7ab9-269e-4c07-8db3-1942cbe02e58",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:23Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeRouteTables",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      routeTableIdSet: {},
      filterSet: {
        items: [
          {
            name: "association.route-table-association-id",
            valueSet: {
              items: [
                {
                  value: "rtbassoc-028835364257167a0",
                },
              ],
            },
          },
        ],
      },
    },
    responseElements: null,
    requestID: "890b0058-f68e-4f11-9357-d0f1f6e64f67",
    eventID: "296fb3dd-3c2f-416d-9179-cac85eef5636",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:23Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "CreateNatGateway",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      CreateNatGatewayRequest: {
        ConnectivityType: "public",
        AllocationId: "eipalloc-0308751978074cc38",
        SubnetId: "subnet-04c85e0f0569bad68",
        ClientToken: "04CDBD20-2B2D-421E-A648-9B2690A5CA68",
        TagSpecification: {
          ResourceType: "natgateway",
          tag: 1,
          Tag: [
            {
              Value: "true",
              tag: 1,
              Key: "StratusRedTeam",
            },
            {
              Value: "stratus-red-team-usr-data-vpc-us-east-1a",
              tag: 2,
              Key: "Name",
            },
          ],
        },
      },
    },
    responseElements: {
      CreateNatGatewayResponse: {
        xmlns: "http://ec2.amazonaws.com/doc/2016-11-15/",
        natGateway: {
          connectivityType: "public",
          subnetId: "subnet-04c85e0f0569bad68",
          tagSet: {
            item: [
              {
                value: "true",
                key: "StratusRedTeam",
              },
              {
                value: "stratus-red-team-usr-data-vpc-us-east-1a",
                key: "Name",
              },
            ],
          },
          natGatewayAddressSet: {
            item: {
              isPrimary: true,
              allocationId: "eipalloc-0308751978074cc38",
              status: "associating",
            },
          },
          createTime: "2024-09-21T07:44:22.000Z",
          vpcId: "vpc-093c0f9829493236d",
          natGatewayId: "nat-0ab2f2ff04c5b7978",
          state: "pending",
        },
        requestId: "526dd891-86cd-46b3-9043-ef1bbcbbe402",
        clientToken: "04CDBD20-2B2D-421E-A648-9B2690A5CA68",
      },
    },
    requestID: "526dd891-86cd-46b3-9043-ef1bbcbbe402",
    eventID: "2e14fe17-0124-4470-8b5f-c3e358931209",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0008 - Execution",
    mitreAttackTechnique: "T1059 - Command and Scripting Interpreter",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:23Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeNetworkInterfaces",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      networkInterfaceIdSet: {
        items: [
          {
            networkInterfaceId: "eni-062687bcd14d3011e",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "227fd7dc-7310-469a-8bc9-e58079bd29ff",
    eventID: "6b8f0b0e-f062-4c95-8b1d-44ae6b1936bc",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:23Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeRouteTables",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      routeTableIdSet: {},
      filterSet: {
        items: [
          {
            name: "association.route-table-association-id",
            valueSet: {
              items: [
                {
                  value: "rtbassoc-0b2d10244a16450a9",
                },
              ],
            },
          },
        ],
      },
    },
    responseElements: null,
    requestID: "a4caecfc-ebf8-47ac-b84a-40f761e7a786",
    eventID: "7653e674-c907-428c-8a8a-e0e7d6549151",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:23Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeRouteTables",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      routeTableIdSet: {
        items: [
          {
            routeTableId: "rtb-0bb343ed4041f22ec",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "ce0f7d17-2a1b-4191-971f-00acdaef2539",
    eventID: "91c9445f-90de-4bbb-917c-68ea5024acc7",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:23Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeRouteTables",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      routeTableIdSet: {},
      filterSet: {
        items: [
          {
            name: "association.route-table-association-id",
            valueSet: {
              items: [
                {
                  value: "rtbassoc-028835364257167a0",
                },
              ],
            },
          },
        ],
      },
    },
    responseElements: null,
    requestID: "5dc12630-fe57-4544-901b-b20d1241f878",
    eventID: "9ae7c6d6-713f-46c5-8915-5f426f4a3460",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:22Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "AssociateRouteTable",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      routeTableId: "rtb-0654d7eb79297d663",
      subnetId: "subnet-030aed7be905a269e",
    },
    responseElements: {
      requestId: "7455e09d-8bdc-4dff-ba47-3c979c3f90bc",
      associationId: "rtbassoc-0b2d10244a16450a9",
      associationState: {
        state: "associated",
      },
    },
    requestID: "7455e09d-8bdc-4dff-ba47-3c979c3f90bc",
    eventID: "2f3fcb7b-e0fa-49f3-aeb0-4fd5cc5c28ab",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:22Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "CreateNetworkInterface",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      subnetId: "subnet-030aed7be905a269e",
      groupSet: {},
      privateIpAddressesSet: {
        items: [
          {
            privateIpAddress: "10.0.1.10",
            primary: true,
          },
        ],
      },
      tagSpecificationSet: {
        items: [
          {
            resourceType: "network-interface",
            tags: [
              {
                key: "StratusRedTeam",
                value: "true",
              },
            ],
          },
        ],
      },
      clientToken: "0C3B80C6-0CA1-4447-8D6C-4728455502D0",
    },
    responseElements: {
      requestId: "76dd02cb-0f34-46e3-98da-a3c317afe1da",
      networkInterface: {
        networkInterfaceId: "eni-062687bcd14d3011e",
        subnetId: "subnet-030aed7be905a269e",
        vpcId: "vpc-093c0f9829493236d",
        availabilityZone: "us-east-1a",
        ownerId: "064029096479",
        requesterId: "AIDAQ52DOPIP75TAGIJYZ",
        requesterManaged: false,
        status: "pending",
        macAddress: "12:02:28:52:e0:05",
        privateIpAddress: "10.0.1.10",
        sourceDestCheck: true,
        interfaceType: "interface",
        groupSet: {
          items: [
            {
              groupId: "sg-01209e6234c934f85",
              groupName: "default",
            },
          ],
        },
        privateIpAddressesSet: {
          item: [
            {
              privateIpAddress: "10.0.1.10",
              primary: true,
            },
          ],
        },
        ipv6AddressesSet: {},
        tagSet: {
          items: [
            {
              key: "StratusRedTeam",
              value: "true",
            },
          ],
        },
      },
    },
    requestID: "76dd02cb-0f34-46e3-98da-a3c317afe1da",
    eventID: "74dd56f6-e3bd-4bcb-ae6d-5090e5d27a8b",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:22Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeRouteTables",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      routeTableIdSet: {},
      filterSet: {
        items: [
          {
            name: "association.route-table-association-id",
            valueSet: {
              items: [
                {
                  value: "rtbassoc-0b2d10244a16450a9",
                },
              ],
            },
          },
        ],
      },
    },
    responseElements: null,
    requestID: "586d8157-3f2c-4b7d-94fe-2ae81abb6520",
    eventID: "908f8dc4-a504-4798-a771-1ff790bfba10",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:22Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "CreateRoute",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      routeTableId: "rtb-0bb343ed4041f22ec",
      destinationCidrBlock: "0.0.0.0/0",
      gatewayId: "igw-069d17bf028cb09c5",
    },
    responseElements: {
      requestId: "c84f0974-75d9-4751-a2eb-6e541348a9da",
      _return: true,
    },
    requestID: "c84f0974-75d9-4751-a2eb-6e541348a9da",
    eventID: "911b1fa3-bb81-4782-a4d0-2a11b4a72cc5",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:22Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "AssociateRouteTable",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      routeTableId: "rtb-0bb343ed4041f22ec",
      subnetId: "subnet-04c85e0f0569bad68",
    },
    responseElements: {
      requestId: "d8206b98-865d-4b17-a236-bb0e68827ad2",
      associationId: "rtbassoc-028835364257167a0",
      associationState: {
        state: "associated",
      },
    },
    requestID: "d8206b98-865d-4b17-a236-bb0e68827ad2",
    eventID: "fc01881f-e50c-4a30-bb56-fcb448a87b09",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:21Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInternetGateways",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      internetGatewayIdSet: {
        items: [
          {
            internetGatewayId: "igw-069d17bf028cb09c5",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "de7c2fed-04fc-4bcd-be14-03dc308e93d0",
    eventID: "0dcb7f23-6378-4fea-bad5-b0d47370cb26",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:21Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeRouteTables",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      routeTableIdSet: {
        items: [
          {
            routeTableId: "rtb-0654d7eb79297d663",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "476937eb-e177-4c46-ad73-d858b7e79ac2",
    eventID: "2064a0d6-9bdf-4e69-8e11-85bbfc1252b3",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:21Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeRouteTables",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      routeTableIdSet: {
        items: [
          {
            routeTableId: "rtb-0bb343ed4041f22ec",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "7bdc338b-2d60-410b-94de-bce9b61c1de6",
    eventID: "7836ae03-478e-4c89-a900-e04df2c28f29",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:21Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeSubnets",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      subnetSet: {
        items: [
          {
            subnetId: "subnet-030aed7be905a269e",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "b6647217-9fb3-401c-a5e9-770b4f749ac9",
    eventID: "9405c97c-a2d6-4b13-a8c4-6b5085254f2e",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:21Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInternetGateways",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      internetGatewayIdSet: {
        items: [
          {
            internetGatewayId: "igw-069d17bf028cb09c5",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "bb32b6dd-94da-4230-9650-dde55224433d",
    eventID: "9dda016c-5a83-4896-86a4-b055fbe84c70",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:21Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeSubnets",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      subnetSet: {
        items: [
          {
            subnetId: "subnet-04c85e0f0569bad68",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "d76b394b-2d11-40f2-a0a9-e1df5dc875ad",
    eventID: "de25c233-a990-4a74-96f7-187877a4defe",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:20Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "AttachInternetGateway",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      internetGatewayId: "igw-069d17bf028cb09c5",
      vpcId: "vpc-093c0f9829493236d",
    },
    responseElements: {
      requestId: "e662fa03-9d27-4e5a-b1ac-8c837d150e3b",
      _return: true,
    },
    requestID: "e662fa03-9d27-4e5a-b1ac-8c837d150e3b",
    eventID: "06b5f6df-68d5-44e9-aeca-7e512f9f181b",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:20Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeRouteTables",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      routeTableIdSet: {
        items: [
          {
            routeTableId: "rtb-0654d7eb79297d663",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "589271d3-d396-4755-9417-ae610db75143",
    eventID: "4d844341-72ba-4245-9bdf-6e4b608b585d",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:20Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeSubnets",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      subnetSet: {
        items: [
          {
            subnetId: "subnet-04c85e0f0569bad68",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "01accb6f-216a-4275-a49d-2f79566f8ca7",
    eventID: "deeea3bc-8b0f-4796-8627-3937b1040360",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:20Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeSubnets",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      subnetSet: {
        items: [
          {
            subnetId: "subnet-030aed7be905a269e",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "ab9ec114-c8f5-4d0f-be66-d4cbb136e174",
    eventID: "f675ee30-f2af-4b13-82c9-f6fd2c83d793",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:20Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeRouteTables",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      routeTableIdSet: {
        items: [
          {
            routeTableId: "rtb-0bb343ed4041f22ec",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "6dd7a0d6-491a-4aaf-bf04-3e219e114173",
    eventID: "ff558313-896b-485b-80e4-47d8eec790e4",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:19Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "CreateInternetGateway",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      tagSpecificationSet: {
        items: [
          {
            resourceType: "internet-gateway",
            tags: [
              {
                key: "StratusRedTeam",
                value: "true",
              },
              {
                key: "Name",
                value: "stratus-red-team-usr-data-vpc",
              },
            ],
          },
        ],
      },
    },
    responseElements: {
      requestId: "665e93fc-6e77-4a62-8a8b-440a3687752f",
      internetGateway: {
        internetGatewayId: "igw-069d17bf028cb09c5",
        ownerId: "064029096479",
        attachmentSet: {},
        tagSet: {
          items: [
            {
              key: "StratusRedTeam",
              value: "true",
            },
            {
              key: "Name",
              value: "stratus-red-team-usr-data-vpc",
            },
          ],
        },
        association: {},
      },
    },
    requestID: "665e93fc-6e77-4a62-8a8b-440a3687752f",
    eventID: "41142343-58ea-4b65-8f7b-bc33ddc4ce55",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0008 - Execution",
    mitreAttackTechnique: "T1059 - Command and Scripting Interpreter",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:19Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "CreateRouteTable",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      vpcId: "vpc-093c0f9829493236d",
      tagSpecificationSet: {
        items: [
          {
            resourceType: "route-table",
            tags: [
              {
                key: "StratusRedTeam",
                value: "true",
              },
              {
                key: "Name",
                value: "stratus-red-team-usr-data-vpc-private-us-east-1a",
              },
            ],
          },
        ],
      },
    },
    responseElements: {
      requestId: "5217de07-5818-48a9-b589-a46eac949275",
      routeTable: {
        routeTableId: "rtb-0654d7eb79297d663",
        vpcId: "vpc-093c0f9829493236d",
        ownerId: "064029096479",
        routeSet: {
          items: [
            {
              destinationCidrBlock: "10.0.0.0/16",
              gatewayId: "local",
              state: "active",
              origin: "CreateRouteTable",
            },
          ],
        },
        associationSet: {},
        propagatingVgwSet: {},
        tagSet: {
          items: [
            {
              key: "StratusRedTeam",
              value: "true",
            },
            {
              key: "Name",
              value: "stratus-red-team-usr-data-vpc-private-us-east-1a",
            },
          ],
        },
      },
    },
    requestID: "5217de07-5818-48a9-b589-a46eac949275",
    eventID: "5c8e9915-c912-4915-955c-396e46da1f71",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:19Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "CreateSubnet",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      vpcId: "vpc-093c0f9829493236d",
      cidrBlock: "10.0.128.0/24",
      availabilityZone: "us-east-1a",
      tagSpecificationSet: {
        items: [
          {
            resourceType: "subnet",
            tags: [
              {
                key: "StratusRedTeam",
                value: "true",
              },
              {
                key: "Name",
                value: "stratus-red-team-usr-data-vpc-public-us-east-1a",
              },
            ],
          },
        ],
      },
    },
    responseElements: {
      requestId: "893f532b-f133-4678-8ce1-5b520d81bcd3",
      subnet: {
        subnetId: "subnet-04c85e0f0569bad68",
        subnetArn:
          "arn:aws:ec2:us-east-1:064029096479:subnet/subnet-04c85e0f0569bad68",
        state: "available",
        vpcId: "vpc-093c0f9829493236d",
        cidrBlock: "10.0.128.0/24",
        ipv6CidrBlockAssociationSet: {},
        availableIpAddressCount: 251,
        availabilityZone: "us-east-1a",
        availabilityZoneId: "use1-az2",
        ownerId: "064029096479",
        defaultForAz: false,
        mapPublicIpOnLaunch: false,
        assignIpv6AddressOnCreation: false,
        tagSet: {
          items: [
            {
              key: "StratusRedTeam",
              value: "true",
            },
            {
              key: "Name",
              value: "stratus-red-team-usr-data-vpc-public-us-east-1a",
            },
          ],
        },
        privateDnsNameOptionsOnLaunch: {
          hostnameType: "ip-name",
          enableResourceNameDnsARecord: false,
          enableResourceNameDnsAAAARecord: false,
        },
        ipv6Native: false,
        enableDns64: false,
      },
    },
    requestID: "893f532b-f133-4678-8ce1-5b520d81bcd3",
    eventID: "9f2e5270-5462-44db-a36c-60053293c0e5",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:19Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "CreateRouteTable",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      vpcId: "vpc-093c0f9829493236d",
      tagSpecificationSet: {
        items: [
          {
            resourceType: "route-table",
            tags: [
              {
                key: "StratusRedTeam",
                value: "true",
              },
              {
                key: "Name",
                value: "stratus-red-team-usr-data-vpc-public",
              },
            ],
          },
        ],
      },
    },
    responseElements: {
      requestId: "08486367-430f-4b53-ac20-a2c0c1275b60",
      routeTable: {
        routeTableId: "rtb-0bb343ed4041f22ec",
        vpcId: "vpc-093c0f9829493236d",
        ownerId: "064029096479",
        routeSet: {
          items: [
            {
              destinationCidrBlock: "10.0.0.0/16",
              gatewayId: "local",
              state: "active",
              origin: "CreateRouteTable",
            },
          ],
        },
        associationSet: {},
        propagatingVgwSet: {},
        tagSet: {
          items: [
            {
              key: "StratusRedTeam",
              value: "true",
            },
            {
              key: "Name",
              value: "stratus-red-team-usr-data-vpc-public",
            },
          ],
        },
      },
    },
    requestID: "08486367-430f-4b53-ac20-a2c0c1275b60",
    eventID: "adf99795-e2f1-49e5-bdf6-196ed0d6806d",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:19Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "CreateSubnet",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      vpcId: "vpc-093c0f9829493236d",
      cidrBlock: "10.0.1.0/24",
      availabilityZone: "us-east-1a",
      tagSpecificationSet: {
        items: [
          {
            resourceType: "subnet",
            tags: [
              {
                key: "Name",
                value: "stratus-red-team-usr-data-vpc-private-us-east-1a",
              },
              {
                key: "StratusRedTeam",
                value: "true",
              },
            ],
          },
        ],
      },
    },
    responseElements: {
      requestId: "54aa25c0-750d-4444-8f09-8f30f6c8b55b",
      subnet: {
        subnetId: "subnet-030aed7be905a269e",
        subnetArn:
          "arn:aws:ec2:us-east-1:064029096479:subnet/subnet-030aed7be905a269e",
        state: "available",
        vpcId: "vpc-093c0f9829493236d",
        cidrBlock: "10.0.1.0/24",
        ipv6CidrBlockAssociationSet: {},
        availableIpAddressCount: 251,
        availabilityZone: "us-east-1a",
        availabilityZoneId: "use1-az2",
        ownerId: "064029096479",
        defaultForAz: false,
        mapPublicIpOnLaunch: false,
        assignIpv6AddressOnCreation: false,
        tagSet: {
          items: [
            {
              key: "Name",
              value: "stratus-red-team-usr-data-vpc-private-us-east-1a",
            },
            {
              key: "StratusRedTeam",
              value: "true",
            },
          ],
        },
        privateDnsNameOptionsOnLaunch: {
          hostnameType: "ip-name",
          enableResourceNameDnsARecord: false,
          enableResourceNameDnsAAAARecord: false,
        },
        ipv6Native: false,
        enableDns64: false,
      },
    },
    requestID: "54aa25c0-750d-4444-8f09-8f30f6c8b55b",
    eventID: "e6fb4451-748d-41bd-ada4-54beca6a6353",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:18Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeSecurityGroups",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      securityGroupSet: {},
      securityGroupIdSet: {},
      filterSet: {
        items: [
          {
            name: "group-name",
            valueSet: {
              items: [
                {
                  value: "default",
                },
              ],
            },
          },
          {
            name: "vpc-id",
            valueSet: {
              items: [
                {
                  value: "vpc-093c0f9829493236d",
                },
              ],
            },
          },
        ],
      },
    },
    responseElements: null,
    requestID: "502019b1-435a-49d2-9321-7b6ccd93e9d6",
    eventID: "235bbc09-12be-45a7-b3ae-4417ed683392",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:17Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeRouteTables",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      routeTableIdSet: {},
      filterSet: {
        items: [
          {
            name: "association.main",
            valueSet: {
              items: [
                {
                  value: "true",
                },
              ],
            },
          },
          {
            name: "vpc-id",
            valueSet: {
              items: [
                {
                  value: "vpc-093c0f9829493236d",
                },
              ],
            },
          },
        ],
      },
    },
    responseElements: null,
    requestID: "259991f3-1d66-43ad-9bfe-a13191945ca9",
    eventID: "9d897e58-bed4-4d21-8c6c-9178a4b7d315",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:16Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeNetworkAcls",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      networkAclIdSet: {},
      filterSet: {
        items: [
          {
            name: "default",
            valueSet: {
              items: [
                {
                  value: "true",
                },
              ],
            },
          },
          {
            name: "vpc-id",
            valueSet: {
              items: [
                {
                  value: "vpc-093c0f9829493236d",
                },
              ],
            },
          },
        ],
      },
    },
    responseElements: null,
    requestID: "0450bc2d-6601-4932-96ae-17b908744ddf",
    eventID: "4866095e-3c71-4203-a2bd-08633e4cbb2b",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:16Z",
    eventSource: "iam.amazonaws.com",
    eventName: "TagInstanceProfile",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      instanceProfileName: "stratus-red-team-usr-data-instance",
      tags: [
        {
          key: "StratusRedTeam",
          value: "true",
        },
      ],
    },
    responseElements: null,
    requestID: "d0b7da72-9465-484a-84b9-8c1461387be1",
    eventID: "ab267f84-b378-46dd-a68d-b3aef474c14f",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "iam.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:15Z",
    eventSource: "iam.amazonaws.com",
    eventName: "AddRoleToInstanceProfile",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      instanceProfileName: "stratus-red-team-usr-data-instance",
      roleName: "stratus-red-team-usr-data-role",
    },
    responseElements: null,
    requestID: "42d95d41-3455-489d-9ad6-9f273eba0e7e",
    eventID: "3cc20594-5988-4d88-b5f9-a6bdc965b38c",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "iam.amazonaws.com",
    },
    mitreAttackTactic: "TA0008 - Execution",
    mitreAttackTechnique: "T1059 - Command and Scripting Interpreter",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:15Z",
    eventSource: "iam.amazonaws.com",
    eventName: "GetInstanceProfile",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3 Waiter",
    requestParameters: {
      instanceProfileName: "stratus-red-team-usr-data-instance",
    },
    responseElements: null,
    requestID: "c9feceed-0b7a-4fd6-a48a-1b5b75f93c31",
    eventID: "3d0daf42-06a3-45f9-ac2c-7fa78f30d159",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "iam.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:15Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeVpcAttribute",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      vpcId: "vpc-093c0f9829493236d",
    },
    responseElements: null,
    requestID: "db95311e-3476-49b3-ba00-d7810c467e4f",
    eventID: "a7f4cb12-9abe-4c3a-9937-beaa2401008e",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:15Z",
    eventSource: "iam.amazonaws.com",
    eventName: "ListAttachedRolePolicies",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      roleName: "stratus-red-team-usr-data-role",
    },
    responseElements: null,
    requestID: "c4df4b97-ce3b-4ec5-8acb-3a33115565d2",
    eventID: "e3aa9551-b49c-45ca-ac6d-2725b46625ca",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "iam.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:15Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeVpcAttribute",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      vpcId: "vpc-093c0f9829493236d",
    },
    responseElements: null,
    requestID: "f78775bd-bcb4-4fb1-a277-7da5e3048396",
    eventID: "e8892c78-879a-484d-85a8-0b8b51a84a7f",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:14Z",
    eventSource: "iam.amazonaws.com",
    eventName: "AttachRolePolicy",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      roleName: "stratus-red-team-usr-data-role",
      policyArn: "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore",
    },
    responseElements: null,
    requestID: "41255394-2bb7-48de-ae83-5db17e2a2bc7",
    eventID: "027b9474-0b6a-4fff-b886-75bc99cacbc9",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "iam.amazonaws.com",
    },
    mitreAttackTactic: "TA0008 - Execution",
    mitreAttackTechnique: "T1059 - Command and Scripting Interpreter",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:14Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeVpcClassicLinkDnsSupport",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      DescribeVpcClassicLinkDnsSupportRequest: {
        VpcIds: {
          tag: 1,
          content: "vpc-093c0f9829493236d",
        },
      },
    },
    responseElements: null,
    requestID: "ffcce290-4a74-4333-b8a8-620536cfd69f",
    eventID: "3239dbd5-ccca-419b-a9a7-403414a018c4",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:14Z",
    eventSource: "iam.amazonaws.com",
    eventName: "CreateInstanceProfile",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      instanceProfileName: "stratus-red-team-usr-data-instance",
      path: "/",
      tags: [
        {
          key: "StratusRedTeam",
          value: "true",
        },
      ],
    },
    responseElements: {
      instanceProfile: {
        path: "/",
        instanceProfileName: "stratus-red-team-usr-data-instance",
        instanceProfileId: "AIPAQ52DOPIP5PPU2DYY4",
        arn: "arn:aws:iam::064029096479:instance-profile/stratus-red-team-usr-data-instance",
        createDate: "Sep 21, 2024 7:44:14 AM",
        roles: [],
        tags: [
          {
            key: "StratusRedTeam",
            value: "true",
          },
        ],
      },
    },
    requestID: "c1828e09-2139-4e2c-b403-6dc78b465d19",
    eventID: "82583d61-55a1-4a3e-83ab-f70cc7c8528c",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "iam.amazonaws.com",
    },
    mitreAttackTactic: "TA0008 - Execution",
    mitreAttackTechnique: "T1059 - Command and Scripting Interpreter",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:13Z",
    eventSource: "iam.amazonaws.com",
    eventName: "ListAttachedRolePolicies",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      roleName: "stratus-red-team-usr-data-role",
    },
    responseElements: null,
    requestID: "b3457e08-957a-49bf-b76b-12dc64a1a76e",
    eventID: "9d2eb369-2804-4518-93d8-a07f8a52c6b0",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "iam.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:13Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeVpcClassicLink",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      vpcSet: {
        item: [
          {
            vpcId: "vpc-093c0f9829493236d",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "eebb73d2-d07f-45df-bc57-cbc251a8ff6c",
    eventID: "d63ed067-1179-4e10-9253-f9e27ccf642a",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:12Z",
    eventSource: "iam.amazonaws.com",
    eventName: "ListRolePolicies",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      roleName: "stratus-red-team-usr-data-role",
    },
    responseElements: null,
    requestID: "b6012cc5-adf2-4c2d-8c7b-f95fc9367633",
    eventID: "1f63e7b3-4521-457f-8afc-3f1aea8fbb5b",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "iam.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:12Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeVpcs",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      vpcSet: {
        items: [
          {
            vpcId: "vpc-093c0f9829493236d",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "18b7956a-49b3-4422-aa60-c5520494b758",
    eventID: "7715bc23-df1a-4b27-a577-6297e2719563",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:11Z",
    eventSource: "iam.amazonaws.com",
    eventName: "GetRole",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      roleName: "stratus-red-team-usr-data-role",
    },
    responseElements: null,
    requestID: "c0b7e4e1-42ae-4c98-82eb-569d2eca87e7",
    eventID: "1eeea281-50be-4e5d-ae20-935814b0dd53",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "iam.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:11Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeAddresses",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      publicIpsSet: {},
      filterSet: {},
      allocationIdsSet: {
        items: [
          {
            allocationId: "eipalloc-0308751978074cc38",
          },
        ],
      },
    },
    responseElements: null,
    requestID: "9a2a4a1d-cfb2-425f-a610-1ecf9f98f5d1",
    eventID: "5968231d-225c-44e5-8055-0d5ef74b4185",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:11Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeVpcs",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      vpcSet: {
        items: [
          {
            vpcId: "vpc-093c0f9829493236d",
          },
        ],
      },
      filterSet: {},
    },
    responseElements: null,
    requestID: "ac4cf95e-1eef-4e94-a309-3081d0041067",
    eventID: "f336ca09-c9ec-4b02-bbbe-84ec4567cdca",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:10Z",
    eventSource: "iam.amazonaws.com",
    eventName: "CreateRole",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      path: "/",
      roleName: "stratus-red-team-usr-data-role",
      assumeRolePolicyDocument:
        '{\n    "Version": "2012-10-17",\n    "Statement": [\n        {\n            "Action": "sts:AssumeRole",\n            "Principal": {\n               "Service": "ec2.amazonaws.com"\n            },\n            "Effect": "Allow",\n            "Sid": ""\n        }\n    ]\n}\n',
      maxSessionDuration: 3600,
      tags: [
        {
          key: "StratusRedTeam",
          value: "true",
        },
      ],
    },
    responseElements: {
      role: {
        path: "/",
        roleName: "stratus-red-team-usr-data-role",
        roleId: "AROAQ52DOPIP5SLOGY6HB",
        arn: "arn:aws:iam::064029096479:role/stratus-red-team-usr-data-role",
        createDate: "Sep 21, 2024 7:44:10 AM",
        assumeRolePolicyDocument:
          "%7B%0A%20%20%20%20%22Version%22%3A%20%222012-10-17%22%2C%0A%20%20%20%20%22Statement%22%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22Action%22%3A%20%22sts%3AAssumeRole%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22Principal%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22Service%22%3A%20%22ec2.amazonaws.com%22%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22Effect%22%3A%20%22Allow%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22Sid%22%3A%20%22%22%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%5D%0A%7D%0A",
        tags: [
          {
            key: "StratusRedTeam",
            value: "true",
          },
        ],
      },
    },
    requestID: "e0372f89-49d9-4086-93be-7b55e7804939",
    eventID: "8405877d-d454-468a-82fc-80e57d8ac3bf",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "iam.amazonaws.com",
    },
    mitreAttackTactic: "TA0008 - Execution",
    mitreAttackTechnique: "T1059 - Command and Scripting Interpreter",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:10Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "CreateVpc",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      cidrBlock: "10.0.0.0/16",
      instanceTenancy: "default",
      amazonProvidedIpv6CidrBlock: false,
      tagSpecificationSet: {
        items: [
          {
            resourceType: "vpc",
            tags: [
              {
                key: "Name",
                value: "stratus-red-team-usr-data-vpc",
              },
              {
                key: "StratusRedTeam",
                value: "true",
              },
            ],
          },
        ],
      },
    },
    responseElements: {
      requestId: "442f1fe2-057d-46bb-83ab-365778712699",
      vpc: {
        vpcId: "vpc-093c0f9829493236d",
        state: "pending",
        ownerId: "064029096479",
        cidrBlock: "10.0.0.0/16",
        cidrBlockAssociationSet: {
          items: [
            {
              cidrBlock: "10.0.0.0/16",
              associationId: "vpc-cidr-assoc-0f8356d8a716f7c51",
              cidrBlockState: {
                state: "associated",
              },
            },
          ],
        },
        ipv6CidrBlockAssociationSet: {},
        dhcpOptionsId: "dopt-0d271935dc6fc3b73",
        instanceTenancy: "default",
        tagSet: {
          items: [
            {
              key: "Name",
              value: "stratus-red-team-usr-data-vpc",
            },
            {
              key: "StratusRedTeam",
              value: "true",
            },
          ],
        },
        isDefault: false,
      },
    },
    requestID: "442f1fe2-057d-46bb-83ab-365778712699",
    eventID: "96578cc7-9d70-4596-9d60-6abb7074b211",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:10Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "AllocateAddress",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      domain: "vpc",
      tagSpecificationSet: {
        items: [
          {
            resourceType: "elastic-ip",
            tags: [
              {
                key: "StratusRedTeam",
                value: "true",
              },
              {
                key: "Name",
                value: "stratus-red-team-usr-data-vpc-us-east-1a",
              },
            ],
          },
        ],
      },
    },
    responseElements: {
      requestId: "1b73bf6d-7fb5-47f6-9500-43dab3aed195",
      publicIp: "3.91.109.59",
      domain: "vpc",
      allocationId: "eipalloc-0308751978074cc38",
      publicIpv4Pool: "amazon",
      networkBorderGroup: "us-east-1",
    },
    requestID: "1b73bf6d-7fb5-47f6-9500-43dab3aed195",
    eventID: "e82dfedc-fa3f-4ef9-a454-e0f616e79d48",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0008 - Execution",
    mitreAttackTechnique: "T1059 - Command and Scripting Interpreter",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:09Z",
    eventSource: "iam.amazonaws.com",
    eventName: "GetUser",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: null,
    responseElements: null,
    requestID: "431331b0-6150-4152-89c2-eace643c3e56",
    eventID: "30606e6d-dc13-441d-b5d0-22b28194613a",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "iam.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:08Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeImages",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      executableBySet: {},
      imagesSet: {},
      ownersSet: {
        items: [
          {
            owner: "amazon",
          },
        ],
      },
      filterSet: {
        items: [
          {
            name: "name",
            valueSet: {
              items: [
                {
                  value: "amzn2-ami-hvm-*-x86_64-ebs",
                },
              ],
            },
          },
        ],
      },
    },
    responseElements: null,
    requestID: "e8095681-85f0-4ec8-8249-da003409f589",
    eventID: "0bc84af4-5dd0-4232-b87b-859480cc50d1",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:08Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeAvailabilityZones",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: {
      availabilityZoneSet: {},
      availabilityZoneIdSet: {},
      filterSet: {
        items: [
          {
            name: "state",
            valueSet: {
              items: [
                {
                  value: "available",
                },
              ],
            },
          },
        ],
      },
    },
    responseElements: null,
    requestID: "aed53cdf-dceb-416f-9ecd-ddb6d5d7463b",
    eventID: "bd47fb7e-c40b-4158-8677-4c93e1c97040",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:44:07Z",
    eventSource: "iam.amazonaws.com",
    eventName: "GetUser",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "APN/1.0 HashiCorp/1.0 Terraform/1.1.2 (+https://www.terraform.io) terraform-provider-aws/3.76.1 (+https://registry.terraform.io/providers/hashicorp/aws) aws-sdk-go/1.44.157 (go1.19.3; darwin; arm64) stratus-red-team_13f9c14b-dd75-4710-994e-b8529ef75bbf HashiCorp-terraform-exec/0.17.3",
    requestParameters: null,
    responseElements: null,
    requestID: "7ecca516-a4f9-4843-a2aa-0daa45936ce4",
    eventID: "9b063237-3090-4cad-9393-3e7e77b9cf66",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "iam.amazonaws.com",
    },
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:43:53Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeAccountAttributes",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent: "stratus-red-team_5379acae-ee58-467a-bec6-aad826e9791e",
    requestParameters: {
      accountAttributeNameSet: {},
      filterSet: {},
    },
    responseElements: null,
    requestID: "83501565-fd94-43bf-9207-3f0968fa832a",
    eventID: "f8747c43-4019-477b-b2f3-bb7b5f4ca379",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:43:52Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "StopInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "aws-cli/2.17.46 md/awscrt#0.21.2 ua/2.0 os/macos#24.1.0 md/arch#arm64 lang/python#3.11.10 md/pyimpl#CPython cfg/retry-mode#standard md/installer#source md/prompt#off md/command#ec2.stop-instances",
    errorCode: "Client.IncorrectInstanceState",
    errorMessage:
      "This instance 'i-0bb0ccfd03ce061a4' is not in a state from which it can be stopped.",
    requestParameters: {
      instancesSet: {
        items: [
          {
            instanceId: "i-0bb0ccfd03ce061a4",
          },
        ],
      },
      force: true,
    },
    responseElements: null,
    requestID: "e5ba4a20-ce4a-4a59-966d-d42eea291cee",
    eventID: "c0bde723-8057-43cb-b8fd-709d86136fef",
    readOnly: false,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0008 - Execution",
    mitreAttackTechnique: "T1489 - Service Stop",
  },
  {
    eventVersion: "1.10",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:43:50Z",
    eventSource: "ec2.amazonaws.com",
    eventName: "DescribeInstances",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "aws-cli/2.17.46 md/awscrt#0.21.2 ua/2.0 os/macos#24.1.0 md/arch#arm64 lang/python#3.11.10 md/pyimpl#CPython cfg/retry-mode#standard md/installer#source md/prompt#off md/command#ec2.describe-instances",
    requestParameters: {
      instancesSet: {},
      filterSet: {
        items: [
          {
            name: "tag:StratusRedTeam",
            valueSet: {
              items: [
                {
                  value: "true",
                },
              ],
            },
          },
        ],
      },
    },
    responseElements: null,
    requestID: "449a41bc-6e0f-499e-9076-d40c74bf7ab6",
    eventID: "95cc4602-f24c-414a-9248-0655102385e2",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "ec2.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
  {
    eventVersion: "1.08",
    userIdentity: {
      type: "IAMUser",
      principalId: "AIDAQ52DOPIP75TAGIJYZ",
      arn: "arn:aws:iam::064029096479:user/attack_user",
      accountId: "064029096479",
      accessKeyId: "AKIAQ52DOPIPWO5FFICP",
      userName: "attack_user",
    },
    eventTime: "2024-09-21T07:43:49Z",
    eventSource: "sts.amazonaws.com",
    eventName: "GetCallerIdentity",
    awsRegion: "us-east-1",
    sourceIPAddress: "211.212.221.147",
    userAgent:
      "aws-cli/2.17.46 md/awscrt#0.21.2 ua/2.0 os/macos#24.1.0 md/arch#arm64 lang/python#3.11.10 md/pyimpl#CPython cfg/retry-mode#standard md/installer#source md/prompt#off md/command#sts.get-caller-identity",
    requestParameters: null,
    responseElements: null,
    requestID: "3452a5f9-8662-421e-abcd-c4ecc6375966",
    eventID: "74f774d2-8dc4-4de6-be99-27ca9c2b9704",
    readOnly: true,
    eventType: "AwsApiCall",
    managementEvent: true,
    recipientAccountId: "064029096479",
    eventCategory: "Management",
    tlsDetails: {
      tlsVersion: "TLSv1.3",
      cipherSuite: "TLS_AES_128_GCM_SHA256",
      clientProvidedHostHeader: "sts.us-east-1.amazonaws.com",
    },
    mitreAttackTactic: "TA0007 - Discovery",
    mitreAttackTechnique: "T1087 - Account Discovery",
  },
];

const Grid = ({
  isEditOn,
  MarkData,
  isChatOFF,
  isFillterOFF,
  SideContent,
  setMarkDataFunc,
}) => {
  const [isChattoggleOpen, setChatToggle] = useState(false);
  const [markData, setMarkData] = useState(MarkData || []);
  const [promptSession, setPromptSession] = useState("");
  const [ReportData, setReportData] = useState("");

  const [ESResultData, setESREsultData] = useState(testlogdata || []);
  const [DBResultData, setDBREsultData] = useState(testAccount || []);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.isChatOpen !== undefined) {
      setMarkData([]);
      setChatToggle(location.state.isChatOpen);
    }
  }, [location.state]);

  const getESResultData = (value) => {
    setESREsultData(value);
  };
  const getDBResultData = (value) => {
    setDBREsultData(value);
  };
  const getReportData = (value) => {
    setReportData(value);
  };
  const getPromptSession = (value) => {
    setPromptSession(value);
  };
  const ChatToggleButton = () => {
    if (isChattoggleOpen) {
      setMarkData([]);
    } else {
      setMarkData(MarkData);
    }
    setChatToggle((prev) => !prev);
  };

  const setChatToggleOpen = () => {
    setChatToggle(true);
  };
  const InAlert = () => {
    setMarkData([
      "scroll",
      "chat",
      "Report",
      "ShowPolicy",
      "ShowLog",
      "AttackVisualGraph",
    ]);
  };

  const InitLayout = useMemo(
    () => [
      {
        i: "scroll",
        x: 0,
        y: 0,
        w: 50,
        h: 0,
      },
      {
        i: "chat",
        x: 0,
        y: 0,
        w: 50,
        h: 7,
        content: (
          <ChatToggle
            isChattoggleOpen={isChattoggleOpen}
            ChatToggleButton={ChatToggleButton}
            setChatToggleOpen={setChatToggleOpen}
            sizeFull={false}
            SideContent={SideContent} //오른쪽 On/Off
            markData={setMarkDataFunc} //오른쪽에 띄울 데이터
            promptIndex={false}
            promptSession={promptSession !== "" ? promptSession : ""}
            getPromptSession={() => {}}
            getReportData={getReportData}
            setESREsultData={getESResultData}
            setDBREsultData={getDBResultData}
            type={"grid"}
          />
        ),
        isResizable: false,
      },
      // {
      //   i: "filter",
      //   x: 0,
      //   y: 0,
      //   w: 50,
      //   h: 15,
      //   content: <FilterToggle />,
      //   isResizable: false,
      // },
      {
        i: "AccountCount",
        x: 50,
        y: 0,
        w: 50,
        h: 15,
        content: <AccountCount />,
      },
      {
        i: "Score",
        x: 0,
        y: 23,
        w: 33,
        h: 15,
        content: <Score />,
      },
      {
        i: "Risk",
        x: 0,
        y: 35,
        w: 33,
        h: 30,
        content: <Risk />,
      },
      {
        i: "DailyInsight",
        x: 0,
        y: 35,
        w: 33,
        h: 22,
        content: <DailyInsight />,
      },
      {
        i: "AccountByService",
        x: 33,
        y: 23,
        w: 17,
        h: 37,
        content: <AccountByService />,
      },
      {
        i: "NeedCheck",
        x: 0,
        y: 65,
        w: 20,
        h: 37,
        content: <NeedCheck />,
      },
      {
        i: "Detection",
        x: 20,
        y: 65,
        w: 30,
        h: 37,
        content: <Detection />,
      },
      {
        i: "AccountStatus",
        x: 50,
        y: 0,
        w: 50,
        h: 40,
        content: <AccountStatus data={DBResultData} GenDetailData={() => {}} />,
      },
      {
        i: "EC2Status",
        x: 50,
        y: 0,
        w: 50,
        h: 36,
        content: <EC2Status GenDetailData={() => {}} />,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [DBResultData, isChattoggleOpen]
  );

  // 초기 레이아웃 설정
  const [gridLayout, setGridLayout] = useState(
    InitLayout.map((item) => ({
      ...item,
      h: item.h * 0.9, // 비율에 따라 높이 조정
    }))
  );
  const [width, setGridWidth] = useState(window.innerWidth);

  const wrapperRef = useRef(null); // Wrapper를 참조할 ref
  const [initHeight] = useState(window.innerHeight);
  const [ratio, setratio] = useState(0.9);

  useEffect(() => {
    const calculateRowHeight = () => {
      if (wrapperRef.current) {
        const wrapperHeight = wrapperRef.current.offsetHeight; // Wrapper의 높이를 가져옴
        const rows = 100; // 원하는 행 개수 (임의 설정)
        const chagedHeight = wrapperHeight / rows;
        const ratio = (chagedHeight / initHeight / 9) * 950;
        setratio(ratio);
      }
      setGridWidth(window.innerWidth);
    };
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const calculatedHeight = scrollTop * 0.09; // 스크롤에 따른 높이 계산
      if (isChattoggleOpen) {
        setGridLayout((prev) =>
          prev.map((item) =>
            item.i === "scroll" ? { ...item, h: calculatedHeight } : item
          )
        );
      }
    };

    calculateRowHeight(); // 초기 계산

    window.addEventListener("resize", calculateRowHeight); // 리사이즈 이벤트 추가
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", calculateRowHeight); // 이벤트 제거
      window.removeEventListener("scroll", handleScroll);
    };
  }, [initHeight, isChattoggleOpen]);

  // markData 없데이트 시에
  useEffect(() => {
    // MarkData가 업데이트될 때 markData를 업데이트
    if (MarkData.length > 0) {
      setMarkData(MarkData);
    }
  }, [MarkData]);

  // markData가 존재할 때
  useEffect(() => {
    if (markData && markData.length > 0) {
      let currentX = 0;
      let currentY = 0;
      let maxRowHeight = 0; // 현재 행에서 가장 큰 높이
      // 필터링하면서 x값과 y값을 계산
      const filteredLayout = InitLayout.filter((item) =>
        markData.includes(item.i)
      ).map((item) => {
        // 다음 줄로 넘기기 조건: w값의 합이 50을 초과하면 줄을 바꿈
        if (currentX + item.w > 50) {
          currentX = 0; // x를 0으로 초기화
          currentY += maxRowHeight; // y를 가장 큰 높이만큼 증가
          maxRowHeight = 0; // 새로운 행에서 가장 큰 높이를 다시 0으로 초기화
        }
        const layoutItem = {
          ...item,
          x: currentX, // x 값을 설정
          y: currentY, // y 값을 설정
        };
        currentX += item.w; // 현재 x 값을 w만큼 증가
        maxRowHeight = Math.max(maxRowHeight, item.h); // 행에서 가장 큰 높이를 저장
        return layoutItem;
      });
      setGridLayout(filteredLayout);
      if (markData.includes("ShowLog")) {
        setGridLayout((prev) => [
          ...prev,
          {
            i: "ShowLog",
            x: 50,
            y: 55,
            w: 50,
            h: 40,
            content: <ShowLog Data={ESResultData} />,
          },
        ]);
      }
      if (markData.includes("Report")) {
        setGridLayout((prev) => [
          ...prev,
          {
            i: "Report",
            x: 50,
            y: 0,
            w: 50,
            h: 20,
            content: <Report data={ReportData} />,
          },
        ]);
      }
      if (markData.includes("ShowPolicy")) {
        setGridLayout((prev) => [
          ...prev,
          {
            i: "ShowPolicy",
            x: 50,
            y: 50,
            w: 50,
            h: 25,
            content: <ShowPolicy />,
          },
        ]);
      }
      if (markData.includes("AttackVisualGraph")) {
        setGridLayout((prev) => [
          ...prev,
          {
            i: "AttackVisualGraph",
            x: 50,
            y: 30,
            w: 50,
            h: 40,
            content: <AttackVisualGraph />,
          },
        ]);
      }
    } else {
      setGridLayout(InitLayout);
    }
    if (!isChatOFF && isFillterOFF && !isChattoggleOpen) {
      setGridLayout(InitLayout);
    }
  }, [
    InitLayout,
    markData,
    MarkData,
    isChattoggleOpen,
    isFillterOFF,
    isChatOFF,
    ReportData,
    ESResultData,
  ]);

  // 토글 오픈
  useEffect(() => {
    if (isChattoggleOpen) {
      setGridLayout((prevLayout) =>
        prevLayout.map((item) => {
          const initItem = InitLayout.find((init) => init.i === item.i);
          if (initItem) {
            return {
              ...item,
              h:
                item.i === "chat"
                  ? wrapperRef.current.offsetHeight * 0.09
                  : initItem.h * ratio,
              x:
                item.x >= 47 || item.i === "scroll" || item.i === "chat"
                  ? item.x
                  : item.x + 50,
            };
          }
          return item;
        })
      );
    } else {
      if (markData.length < 0) {
        setGridLayout(
          InitLayout.map((item) => ({
            ...item,
            h: item.h * ratio, // h 값을 비율에 따라 수정
          }))
        );
      } else {
        setGridLayout(
          InitLayout.map((item) => ({
            ...item,
            h: item.h * ratio, // h 값을 비율에 따라 수정
          }))
        );
      }
    }
  }, [isChattoggleOpen, InitLayout, markData, ratio]);

  return (
    <S.Wrapper ref={wrapperRef}>
      <Alert
        setChatToggleOpen={setChatToggleOpen}
        getPromptSession={getPromptSession}
        InAlert={InAlert}
      />
      <GridLayout
        layout={gridLayout.map((item) => ({
          ...item,
          isResizable: isEditOn && item.isResizable,
        }))}
        cols={100}
        rowHeight={initHeight / 1000}
        width={width * 0.94}
        draggableHandle=".grid-item"
        style={{ backgroundColor: "transparent" }}
      >
        {gridLayout.map((item) => (
          <S.GridElement key={item.i}>
            {item.i === "chat" ? item.content : item.content}
          </S.GridElement>
        ))}
      </GridLayout>
    </S.Wrapper>
  );
};

export default Grid;
