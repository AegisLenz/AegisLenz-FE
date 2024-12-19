const useAlertSSE = () => {
  const connectSSE = (onDataReceived, onError) => {
    const connect = async () => {
      try {
        console.log("SSE 연결 시작");
        const response = await fetch(`/server/api/v1/bert/events`, {
          method: "GET",
          headers: {
            accept: "text/event-stream",
          },
        });

        if (!response.body) {
          console.error("ReadableStream이 지원되지 않는 브라우저입니다.");
          setTimeout(connect, 3000);
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        const processChunk = async ({ done, value }) => {
          if (done) {
            console.log("SSE 스트림 종료됨. 재연결 시도 중...");
            setTimeout(connect, 3000);
            return;
          }

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          lines.forEach((line) => {
            if (line.trim() && line.startsWith("data:")) {
              try {
                const data = JSON.parse(line.replace("data:", "").trim());
                console.log("SSE 데이터 수신:", data);
                onDataReceived(data);
              } catch (error) {
                console.error("SSE 데이터 파싱 오류:", error);
              }
            }
          });

          reader
            .read()
            .then(processChunk)
            .catch((error) => {
              console.error("SSE 읽기 중 오류:", error);
              onError();
              setTimeout(connect, 3000);
            });
        };
        
        reader
          .read()
          .then(processChunk)
          .catch((error) => {
            console.error("SSE 스트림 읽기 오류:", error);
            onError();
            setTimeout(connect, 3000);
          });
      } catch (error) {
        console.error("SSE 연결 중 오류:", error);
        onError();
        setTimeout(connect, 3000);
      }
    };

    connect();
  };

  return { connectSSE };
};

export default useAlertSSE;