import * as S from "./DailyInsightReport_style";
import { useState } from "react";

const Daily = () => {
  // eslint-disable-next-line no-unused-vars
  const [contents, setContents] = useState([
    '어제(2024년 12월 16일) 발생한 로그 분석 결과, 여러 의심스러운 정황이 발견되었습니다. 다음은 주요 발견 사항들의 요약입니다:\n\n1. **다수의 로그인 시도 및 실패**:\n   - **시간**: 03:21:26 UTC\n   - **이벤트**: `ConsoleLogin` 이벤트가 동일 IP(`1.233.83.207`)에서 두 번 기록되었으며, 모두 로그인 실패로 나타남. 이는 의심스러운 접근 시도로 평가됨.\n\n2. **의심스러운 API 호출 및 행동 패턴**:\n   - **시간**: 03:21:53 UTC\n   - 동일 IP에서 `ListApplications` 이벤트 등 여러 AWS API 호출이 반복적으로 발생. 이는 간섭적 행동을 시사하며, 로그인이 실패한 후에도 관련 API 호출이 이뤄졌다는 점이 주목됨.\n\n3. **역할 전환 및 권한 관련 API 호출**:\n   - **시간**: 06:00:20 UTC\n   - 다수의 `assumeRole` 이벤트 기록. 특정 역할에 대한 임시 자격 증명을 부여하는 행동은 권한 상승 시도로 해석될 수 있음.\n\n4. **정책 조회 및 정보 수집 행동**:\n   - **시간**: 06:49:19 UTC 및 이후\n   - 사용자 "Wonje_Cha"가 `ListUserPolicies`, `GetPolicy`, `GetPolicyVersion` 등의 이벤트를 동시다발적으로 호출. 특히 높은 권한의 IAM 정책을 조회하려는 시도가 반복적임.\n\n5. **비정상적인 이벤트 발생**:\n   - 여러 중복된 `DescribeInstances`, `ListUsers` 이벤트 발생. 특정 사용자 그룹에 대한 정책 및 그룹 정보 확인이 다수의 사용자에 의해 동일한 IP 주소(203.252.213.209)에서 발생.\n   - "Wonje_Cha" 사용자가 11:29:09 UTC에 집중하여 IAM 정책을 조회하는 패턴을 보였고, 이후 여러 다른 관련 이벤트도 지속적으로 발생.\n\n6. **고위험 행동 시나리오**:\n   - 반복적인 정책 조회(`GetPolicy`, `GetPolicyVersion`)와 사용자 그룹 및 키 목록 조회가 이루어짐. 이러한 행동은 비정상적인 권한 점검이나 조작을 암시함.\n\n7. **최종 종합 분석**:\n   - 모든 의심스러운 활동은 특정 IP 주소와 사용자("Wonje_Cha")에 집중되어 있으며, 이는 잘못된 사용 또는 시스템 침해의 가능성을 시사합니다. 따라서 서버와 계정에 대한 즉각적인 추가 보안 조치와 모니터링이 필요합니다.\n\n이러한 정황들은 보안 위협으로 해석되며, 각 이벤트에 대한 면밀한 조사와 더불어 의심스러운 IP 주소 및 사용자의 행동 추적이 요구됩니다.',
  ]);

  return (
    <S.Wrapper>
      <S.Title>Daily Insight Report</S.Title>
      <S.ContentArea>
        <S.SubContent>
          {contents.map((content) => (
            <S.Content>{`${content}`}</S.Content>
          ))}
        </S.SubContent>
      </S.ContentArea>
    </S.Wrapper>
  );
};

export default Daily;
