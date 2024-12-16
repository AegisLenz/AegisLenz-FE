const CreateBookmark = async (userInput) => {
  try {
    const response = await fetch(`/server/api/v1/users/bookmark`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // JSON 요청임을 명시
      },
      body: JSON.stringify({ question: userInput }), // 객체를 JSON 문자열로 변환
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    // console.log(e);
    throw e;
  }
};

export default CreateBookmark;
