// API 요청을 처리하는 함수 (fetch 사용)
const AlertHook = async () => {
  try {
    const response = await fetch(`/server/api/`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json", // Content-Type 헤더 추가
      },
    });

    if (!response.body) {
      console.error("ReadableStream이 지원되지 않는 브라우저입니다.");
      return;
    }

    const reader = response.body.getReader(); // 스트리밍 데이터를 읽기 위한 리더 생성
    const decoder = new TextDecoder("utf-8");

    function read() {
      reader.read().then(({ done, value }) => {
        if (done) {
          return; // 스트림이 완료되면 종료
        }

        // eslint-disable-next-line no-unused-vars
        const chunk = decoder.decode(value, { stream: true });
        // eslint-disable-next-line no-unused-vars
        const lines = chunk.split("\n");

        read(); // 스트림을 계속 읽음
      });
    }

    read(); // 최초의 read 호출
  } catch (err) {
    console.error("API 요청 중 오류 발생:", err);
    throw err;
  }
};

export default AlertHook;
