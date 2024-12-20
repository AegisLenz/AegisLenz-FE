import * as S from "./DailyInsightReport_style";
import Loading2 from "../../../toggle/loading2/loading2";
import GetDailyInsight from "../../../hook/dashboard/GetdailyinsInsightReport";
import ReactMarkdown from "react-markdown";
import { useEffect, useState, useRef } from "react";
const exam = `# 2024-12-02T10:37:33.000Z에 발생한 공격의 전후로그 분석\n\n1. **의심스러운 세부사항**:  \n   - **시간**: 2024-12-02T10:37:30.000Z  \n   - **이벤트명**: ListUsers  \n   - Victim 사용자가 여러 그룹과 정책 정보를 탐색.\n\n2. **연속적인 API 호출**:  \n   - **시간**: 2024-12-02T10:37:31.000Z  \n   - **이벤트명**: GetPolicy  \n   - 관리자 권한 정책 요청 후, 연속적인 호출 발생.  \n\n3. **다양한 사용자 정책 요청**:  \n   - **시간**: 2024-12-02T10:37:35.000Z  \n   - **이벤트명**: GetPolicyVersion  \n   - 비정상적으로 잦은 정책 정보 요청.  \n\n4. **정책 및 권한 요청의 빈번함**:  \n   - **시간**: 2024-12-02T10:37:39.000Z  \n   - **이벤트명**: GetPolicy  \n   - 데이터 접근 시도 패턴 발생.  \n\n5. **비정상적인 사용자 탐색 동작**:  \n   - **시간**: 2024-12-02T10:37:42.000Z  \n   - **이벤트명**: ListAttachedUserPolicies  \n   - 여러 사용자 및 정책 정보 열람 시도 빈번.  \n\n위 로그들은 특정 시간대에 비정상적인 정보 요청 패턴을 나타냄.`;
const Daily = () => {
  const contentRef = useRef();
  const [contents, setContents] = useState([]);
  const [NowLoading, setNowLoading] = useState(true);

  useEffect(() => {
    const FetchFunc = async () => {
      setNowLoading(true);
      try {
        // const Fetchdata = await GetDailyInsight();
        setContents(exam);
      } catch (e) {
        console.log(e);
      } finally {
        setNowLoading(false);
      }
    };
    FetchFunc();
  }, []);

  // 스타일 변수
  const contentAreaStyle = {
    color: "white",
    margin: "2%",
    wordWrap: "break-word", // 텍스트 줄바꿈 처리
    wordBreak: "break-word", // 긴 단어 강제 줄바꿈 처리
    overflowWrap: "break-word", // 텍스트 자동 줄바꿈
  };

  return (
    <S.Wrapper>
      <S.Title>Daily Suspicion Analysis</S.Title>
      <S.ContentArea>
        {NowLoading ? (
          <Loading2 />
        ) : (
          <S.SubContent>
            {/* {contents.map((content, index) => ( */}
            <div ref={contentRef} style={contentAreaStyle}>
              <ReactMarkdown>{contents}</ReactMarkdown>
            </div>
            {/* ))} */}
          </S.SubContent>
        )}
      </S.ContentArea>
    </S.Wrapper>
  );
};

export default Daily;
