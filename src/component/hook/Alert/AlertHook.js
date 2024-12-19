const useAlertSSE = () => {
  const connectSSE = (onDataReceived, onError) => {
    const connect = () => {
      try {
        console.log("SSE 연결 시작");
        const eventSource = new EventSource(`/server/api/v1/bert/events`);
        
        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log("SSE 데이터 수신:", data);
            onDataReceived(data);
          } catch (error) {
            console.error("SSE 데이터 파싱 오류:", error);
          }
        };

        eventSource.onerror = () => {
          console.error("SSE 연결 오류 발생. 재연결 시도 중...");
          eventSource.close();
          setTimeout(connect, 3000);
        };

        return () => {
          console.log("SSE 연결 종료");
          eventSource.close();
        };
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
