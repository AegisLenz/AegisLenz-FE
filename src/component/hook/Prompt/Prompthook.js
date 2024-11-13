// API 요청을 처리하는 함수 (fetch 사용)
const Prompthook = async (
  userInput,
  session,
  handleStreamData,
  handleStreamComplete,
  handleRecommendQuestionsChunk,
  hadnleESQuery,
  handleESResult,
  handleDBQuery,
  handleDBResult
) => {
  try {
    console.log(session);
    const response = await fetch(`/server/api/v1/prompt/${session}/chat`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json", // Content-Type 헤더 추가
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

    function read() {
      reader.read().then(({ done, value }) => {
        if (done) {
          handleStreamComplete(accumulatedText); // 스트림 완료 시 누적된 텍스트 전달
          return; // 스트림이 완료되면 종료
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        // 수신된 데이터를 한 문자열로 누적
        lines.forEach((line) => {
          if (line.trim()) {
            try {
              const parsedLine = JSON.parse(line); // JSON 데이터로 파싱

              switch (parsedLine.type) {
                case "ESQuery":
                  // ESQuery 처리

                  console.log("ESQuery:", parsedLine.data);
                  hadnleESQuery(parsedLine.data);
                  break;
                case "DBQuery":
                  // DBQuery 처리

                  console.log("DBQuery:", parsedLine.data);
                  handleDBQuery(parsedLine.data);
                  break;
                case "ESResult":
                  // ESResult 처리
                  console.log("ESResult:", parsedLine.data);
                  handleESResult(parsedLine.data);
                  break;
                case "DBResult":
                  // ESResult 처리
                  console.log("DBResult:", parsedLine.data);
                  handleDBResult(parsedLine.data);
                  break;
                case "Summary":
                  // Summary 데이터를 누적
                  accumulatedText += parsedLine.data;
                  handleStreamData(accumulatedText);
                  break;

                case "RecommendQuestions":
                  // 추천 질문을 처리
                  handleRecommendQuestionsChunk(parsedLine.data);
                  break;
                default:
                  if (parsedLine.status !== "complete") {
                    console.warn("알 수 없는 데이터 유형:", parsedLine.type);
                  }
              }
            } catch (error) {
              console.error("데이터 파싱 중 오류 발생", error);
            }
          }
        });

        read(); // 스트림을 계속 읽음
      });
    }

    read(); // 최초의 read 호출
  } catch (err) {
    console.error("API 요청 중 오류 발생:", err);
    throw err;
  }
};

export default Prompthook;
