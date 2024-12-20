import * as S from "./Report_style";
import ReactMarkdown from "react-markdown";
import { useState, useRef, useEffect } from "react";
import html2pdf from "html2pdf.js";

const Report = (data1) => {
  const data = {
    data: "# 공격 탐지 보고서\n\n## 공격 탐지 시간\n2024-12-21T02:22:26.769591\n\n## 공격 유형\n**Tactic**: Discovery, \n클라우드 환경에서 공격자가 내부 리소스 및 사용자 정보를 탐색하는 공격 전술이다.\n\n**Technique**: Account Discovery, \n공격자가 사용자 계정을 탐지하고 이와 관련된 권한 및 정책을 분석하는 공격 수행이다.\n\n## 공격 대상\n- 사용자: `Victim`\n- IAM 역할: `testrole`\n- IAM 역할: `AWSServiceRoleForTrustedAdvisor`\n- IAM 역할: `AWSServiceRoleForSupport`\n\n## 공격으로 탐지된 근거\n\n1. **2024-12-21T05:37:16Z** - 사용자 `lookupIam`이 `testrole`에 연결된 정책을 나열하는 `ListAttachedRolePolicies` 이벤트가 발생했습니다. 이 행동은 권한 구조를 이해하려고 하는 시도로, 공격자의 계정 발견 기법을 반영합니다.\n\n2. **2024-12-21T05:37:18Z** - 사용자 `Victim`가 IAM 정책을 나열하는 `ListPolicies` 이벤트를 발생시켰습니다. 특정 IAM 정책을 통해 권한과 리소스를 파악하려는 시도로 보입니다.\n\n3. **2024-12-21T05:37:18Z** - 사용자 `Victim`가 IAM 사용자 목록을 조회하는 `ListUsers` 이벤트를 발생시켰습니다. 이는 시스템의 사용자 구성 및 역할을 파악하려는 목적이 있습니다.\n\n4. **2024-12-21T05:37:17Z** - 사용자 `Victim`가 IAM 역할을 나열하는 `ListRoles` 이벤트를 발생시켰습니다. 이 과정에서 공격자는 IAM 역할과 그 권한을 조사하고 있습니다.\n\n5. **2024-12-21T05:37:22Z** - 사용자 `Victim`가 `AWSServiceRoleForSupport` 역할을 조회하는 `GetRole` 이벤트를 발생시켰습니다. 이 정보는 특정 서비스에 대한 접근 권한을 취득하려는 시도로 확인됩니다.\n\n6. **2024-12-21T05:37:22Z** - 사용자 `Victim`가 `UpdateAssumeRolePolicy` 이벤트를 통해 IAM 역할에 대한 정책을 변경하려 했으나, 보호된 역할에 대한 수정 시도는 실패했습니다. 이는 공격자가 IAM 정책을 조작하려는 시도로 해석될 수 있습니다.\n\n7. **2024-12-21T05:37:24Z** - 사용자 `Victim`가 다시 `GetRole` 이벤트를 발생시켜 `testrole`의 세부 정보를 확인하고자 했습니다. 이는 역할에 대한 접근을 탐색하고 있다는 증거입니다.\n\n8. **2024-12-21T05:37:25Z** - `UpdateAssumeRolePolicy` 이벤트가 발생하여 `testrole`에 대한 정책이 업데이트되었습니다. 이로 인해 역할 및 권한 강화가 가능해졌습니다.\n\n이러한 로그 이벤트의 연속적인 발생은 뚜렷한 공격 이동 경로를 나타내며, 사용자가 권한 및 리소스를 탐색하고 조작하려는 시도로 해석됩니다.",
  };
  const contentRef = useRef();
  const [MarkdownReport, setMarkData] = useState(``);

  useEffect(() => {
    setMarkData(data.data);
  }, [data]);

  const downloadPDF = () => {
    const now = new Date();
    const formattedTime = now.toISOString().replace(/:/g, "-").split(".")[0];
    const filename = "AegisLenz_Report_" + formattedTime;
    const element = contentRef.current;

    // PDF 변환 옵션 설정
    const options = {
      margin: 1,
      filename: filename + ".pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // PDF 생성 및 다운로드
    html2pdf().set(options).from(element).save();
  };

  // 스타일 변수
  const contentAreaStyle = {
    backgroundColor: "white",
    padding: "3%",
  };

  return (
    <S.Wrapper>
      <S.TopPart>
        <S.Title>Report</S.Title>
        <S.DownloadButton onClick={downloadPDF} />
      </S.TopPart>

      <S.ContentArea>
        <div ref={contentRef} style={contentAreaStyle}>
          <ReactMarkdown>{MarkdownReport}</ReactMarkdown>
        </div>
      </S.ContentArea>
    </S.Wrapper>
  );
};

export default Report;
