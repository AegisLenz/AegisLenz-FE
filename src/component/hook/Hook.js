// API 요청을 처리하는 함수 (fetch 사용)
const Prompthook = async (userInput, onDataReceived, onComplete) => {
  try {
    const response = await fetch(`/api/prompt/1/chat`, {
      method: "POST",
      headers: {
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

    function read() {
      reader.read().then(({ done, value }) => {
        if (done) {
          onComplete(accumulatedText); // 스트림 완료 시 누적된 텍스트 전달
          return; // 스트림이 완료되면 종료
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        // 수신된 데이터를 한 문자열로 누적
        lines.forEach((line) => {
          if (line.trim()) {
            try {
              const parsedLine = JSON.parse(line); // JSON 데이터로 파싱
              accumulatedText += parsedLine.data; // 각 조각을 누적
              onDataReceived(accumulatedText); // 현재까지의 누적 텍스트를 전달
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
