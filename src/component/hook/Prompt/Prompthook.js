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
        "Content-Type": "application/json", // Content-Type 헤더 추가
      },
      body: JSON.stringify({ user_input: userInput }),
    });
    if (!response.body) {
      console.error("ReadableStream이 지원되지 않는 브라우저입니다.");
      return;
    }
    function sanitizeJSON(data) {
      return data
        .replace(/([{,])(\s*)([a-zA-Z0-9_$]+)(\s*):/g, '$1"$3":') // 키를 큰따옴표로 감쌈
        .replace(/'/g, '"') // 작은따옴표를 큰따옴표로 변환
        .replace(/(\$[a-zA-Z]+):/g, '"$1":'); // 특수 포맷 키 처리
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
          // console.log(line);
          if (line.trim()) {
            try {
              // console.log(line);
              const sanitize = sanitizeJSON(line);
              const parsedLine = JSON.parse(sanitize); // JSON 데이터로 파싱
              switch (parsedLine.type) {
                case "Dashboard":
                  handleMarkData(parsedLine.data);
                  break;
                case "ESQuery":
                  // ESQuery 처리
                  // console.log("ESQuery:", parsedLine.data);
                  hadnleESQuery(parsedLine.data);
                  break;
                case "DBQuery":
                  // DBQuery 처리
                  // console.log("DBQuery:", parsedLine.data);
                  handleDBQuery(parsedLine.data);
                  break;
                case "ESResult":
                  // ESResult 처리
                  // console.log("ESResult:", parsedLine.data);
                  handleESResult(parsedLine.data);
                  break;
                case "DBResult":
                  // ESResult 처리
                  // console.log("DBResult:", parsedLine.data);
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
                case null:
                  break;
                default:
                  if (parsedLine.status !== "complete") {
                    // console.log("통신종료");
                  } else {
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
