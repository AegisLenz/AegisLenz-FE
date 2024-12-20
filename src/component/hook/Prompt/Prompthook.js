// API 요청을 처리하는 함수 (fetch 사용)
const Prompthook = async (
  userInput,
  session,
  handleMarkData,
  handleStreamData,
  handleStreamComplete,
  handleRecommendQuestionsChunk,
  hadnleESQuery,
  handleESResult,
  handleDBQuery,
  handleDBResult
) => {
  console.log("ph" + session);
  try {
    const url = `/server/api/v1/prompt/${session}/chat`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_input: userInput }),
    });
    if (!response.body) {
      console.error("ReadableStream이 지원되지 않는 브라우저입니다.");
      return;
    }
    const reader = response.body.getReader(); // 스트리밍 데이터를 읽기 위한 리더 생성
    const decoder = new TextDecoder("utf-8");
    let accumulatedText = ""; // 데이터를 누적할 변수
    let tmp_string = ""; // JSON 누적용 임시 변수

    function read() {
      reader.read().then(({ done, value }) => {
        if (done) {
          handleStreamComplete(accumulatedText); // 스트림 완료 시 호출
          return;
        }

        const chunk = decoder.decode(value, { stream: true });
        try {
          const lines = (tmp_string + chunk).split("\n"); // 이전 누적 데이터와 현재 chunk를 합침
          tmp_string = ""; // 임시 문자열 초기화

          lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return; // 빈 줄은 무시
            try {
              const ParsedData = JSON.parse(trimmedLine); // JSON 파싱 시도

              // // JSON 타입에 따라 처리
              switch (ParsedData.type) {
                case "Dashboard":
                  handleMarkData(ParsedData.data);
                  break;
                case "ESQuery":
                  hadnleESQuery(ParsedData.data);
                  break;
                case "DBQuery":
                  handleDBQuery(ParsedData.data);
                  break;
                case "ESResult":
                  handleESResult(ParsedData.data);
                  break;
                case "DBResult":
                  handleDBResult(ParsedData.data);
                  break;
                case "Summary":
                  // Summary 데이터를 누적
                  accumulatedText += ParsedData.data;
                  handleStreamData(accumulatedText);
                  break;
                case "RecommendQuestions":
                  // 추천 질문을 처리
                  handleRecommendQuestionsChunk(ParsedData.data);
                  break;
                case null:
                  break;
                default:
                  if (ParsedData.status !== "complete") {
                    // console.log("통신종료");
                  } else {
                    console.warn("알 수 없는 데이터 유형:", ParsedData.type);
                  }
              }
            } catch (e) {
              if (index === lines.length - 1) {
                tmp_string = trimmedLine; // 마지막 줄을 임시 저장
              } else {
                console.warn("Ignored invalid JSON line:", trimmedLine);
              }
            }
          });
        } catch (e) {
          console.error("Unexpected error:", e);
        }

        read(); // 다음 chunk 읽기
      });
    }

    read(); // 최초의 read 호출
  } catch (err) {
    console.error("API 요청 중 오류 발생:", err);
  }
};

export default Prompthook;
