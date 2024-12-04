const useAlertSSE = (onDataReceived) => {
  const connectSSE = async () => {
    try {
      console.log("SSE 연결 시작"); // SSE 시작 시 로그 출력

      const response = await fetch(`/server/api/v1/bert/events`, {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.body) {
        console.error("ReadableStream이 지원되지 않는 브라우저입니다.");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      function read() {
        reader.read().then(({ done, value }) => {
          if (done) {
            console.log("SSE 스트림이 종료되었습니다.");
            return;
          }

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          lines.forEach((line) => {
            if (line.trim()) {
              try {
                const parsedLine = JSON.parse(line);
                console.log("수신된 SSE 데이터:", parsedLine); // 데이터 수신 시 로그 출력
                if (onDataReceived) {
                  onDataReceived(parsedLine); // 데이터 수신 시 콜백 호출
                }
              } catch (error) {
                console.error("SSE 데이터 파싱 중 오류 발생", error);
              }
            }
          });

          read();
        });
      }

      read();
    } catch (error) {
      console.error("SSE 연결 중 오류 발생:", error);
    }
  };
  return { connectSSE };
};

export default useAlertSSE;
